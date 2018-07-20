var LookupValueService = (function () {
    function LookupValueService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["lookupId"];
        this.lovMap = null;
        this.dataGrid = $("#lookupValueTable");
        this.formDlg = $("#lookupValueDlg");
        this.gridToolbar = $("#lookupValueToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/lookup_controller/list';
        this.deleteURL = CONTEXT_PATH + '/app/lookup_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/lookup_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/lookup_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH +'/screens/core/lookup/lookup.edit.jsp';
        this.title = "Lookup Value";
        this.populateForm = function (data, lovMap) {
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);


            $(this.dataForm.value).val((data.value === undefined || data.value === null )? null : data.value);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            this.formDlg.on("change",function(){
                self.formDlg.attr("data-changed","true");
            });
            if(data.id > 0 ){
                this.formDlg.find("#DeleteBtn").removeAttr("disabled");
            }else {
                this.formDlg.find("#DeleteBtn").attr("disabled","disabled");
            }
            $(".page-message-area").html("");
        }
        /********************** Table Fields ******************************************/
        this.fields = [
            { name: 'id', type: 'string' ,label :'Id',gui:'hidden'},
             { name: 'lookupId', type: 'int' ,label :'Lookup',gui:'hidden'},
            { name: 'lookupName', type: 'string' ,label :'', gui:'skip'},
            { name: 'value', type: 'string' ,label :'Value'},
            { name: 'description', type: 'string' ,label :'Description'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    LookupValueService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    LookupValueService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    LookupValueService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    LookupValueService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?lookup="+$("#lookupIdFilter").val()).done(function (data) {

            self.formDlg.find("span#dlgTitle").html("Lookup For '" + $("#lookupIdFilter").jqxDropDownList('getSelectedItem').label+"'");
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                $.get('/app/lookup_controller/find_by_id/' + id).done(function (data) {
                    self.populateForm(data.data,data.lovMap);
                });
            }else {

                self.clear();

            }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    LookupValueService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    LookupValueService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    LookupValueService.prototype.loadTable = function () {
        var self = this;

        $.get(this.lovURL+"/"+$("#groupId").val()).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#lookupValueFilter").on('click',function(){
                    if( $("#lookupIdFilter").val() > 0 ) {
                        $.each(self.filterFields,function(index,item){
                            var filter =   new $.jqx.filter();
                            filter.addfilter(0, filter.createfilter('numericfilter', $("#"+item+"Filter").val(), "EQUAL"));
                            self.dataGrid.jqxGrid('addfilter', item, filter);
                        });

                        self.dataGrid.jqxGrid('applyfilters');
                        self.gridToolbar.find("#AddBtn").removeAttr("disabled");
                        self.gridToolbar.find("#RefreshBtn").removeAttr("disabled");
                    }
                });
            }
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '400px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    LookupValueService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata','cell');

    };
    return LookupValueService;
}());