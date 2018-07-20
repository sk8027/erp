var ProgramBatchService = (function () {
    function ProgramBatchService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["programId"];
        this.lovMap = null;
        this.dataGrid = $("#programBatchTable");
        this.formDlg = $("#programBatchDlg");
        this.gridToolbar = $("#programBatchToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/batch_controller/list';
        this.deleteURL = CONTEXT_PATH + '/app/batch_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/batch_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/batch_controller/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/academics/batch/batch.edit.jsp';
        this.title = "Program Batch";
        this.populateForm = function (data, lovMap) {
            var self = this;
            debugger;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);

            $(this.dataForm.programName).val((data.programName === undefined || data.programName === null )? null : data.programName);
            if(data.sessionId === undefined || data.sessionId === null) {
                $(this.dataForm.sessionId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.sessionId), lovMap.sessionId);
                $(this.dataForm.sessionId).jqxDropDownList('selectIndex', $(this.dataForm.sessionId).jqxDropDownList('getItemByValue', data.sessionId).index);
            }
            $(this.dataForm.sessionName).val((data.sessionName === undefined || data.sessionName === null )? null : data.sessionName);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.batchNo).val((data.batchNo === undefined || data.batchNo === null )? null : data.batchNo);
            if(data.status === undefined || data.status === null){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
                this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }
            $(this.dataForm.statusName).val((data.statusName === undefined || data.statusName === null )? null : data.statusName);
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
            { name: 'id', type: 'int',gui:'hidden',label :'Id' },
            { name: 'programId', type: 'int' ,label :'Program',gui:'hidden'},
            { name: 'programName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sessionId', type: 'int' ,label :'Session',gui:'list',labelAttribute:'sessionName'},
            { name: 'sessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'batchNo', type: 'string' ,label :'ProgramBatch #'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ProgramBatchService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    ProgramBatchService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    ProgramBatchService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    ProgramBatchService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?program="+$("#programIdFilter").val()).done(function (data) {
            self.formDlg.find("span#dlgTitle").html("Batch Management For '" + $("#programIdFilter").jqxDropDownList('getSelectedItem').label+"'");
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/batch_controller/find_by_id/' + id, 'get', null, $(".form-body"))
                 .done(function (data) {
                    self.populateForm(data.data,data.lovMap);
                });
            }else {
debugger;
                self.framework.GenerateDropDownList($(self.dataForm.sessionId),self.lovMap.sessionId);
                self.framework.GenerateDropDownList($(self.dataForm.status),self.lovMap.status);
                self.clear();

            }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ProgramBatchService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ProgramBatchService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    ProgramBatchService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $('#programIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0) {
                        $("#programIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_programs/" + $("#departmentIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {


                            $.each(data.data, function (item, department) {
                                $("#programIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#programIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#batchFilter").on('click',function(){
                    if( $("#programIdFilter").val() > 0 ) {
                        $.each(self.filterFields,function(index,item){
                            var filter =   new $.jqx.filter();
                            filter.addfilter(0, filter.createfilter('numericfilter', $("#"+item+"Filter").val(), "EQUAL"));
                            self.dataGrid.jqxGrid('addfilter', item, filter);
                        });

                        self.dataGrid.jqxGrid('applyfilters');
                    }
                });
            }
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-350);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '400px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    ProgramBatchService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return ProgramBatchService;
}());
