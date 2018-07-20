var BloomTaxonomyService = (function () {
    function BloomTaxonomyService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#bloomTaxonomyTable");
        this.formDlg = $("#bloomTaxonomyDlg");
        this.gridToolbar = $("#bloomTaxonomyToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/bloom_taxonomy_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/bloom_taxonomy_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/bloom_taxonomy_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/bloom_taxonomy_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/obe/taxonomy/taxonomy.edit.jsp';
        this.title = "Bloom Taxonomy";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            debugger;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.levelName).val((data.levelName === undefined || data.levelName === null )? null : data.levelName);
            $(this.dataForm.levelDescription).val((data.levelDescription === undefined || data.levelDescription === null )? null : data.levelDescription);
            $(this.dataForm.levelNo).val((data.levelNo === undefined || data.levelNo === null )? null : data.levelNo);
            if(lovMap == undefined){
                $(this.dataForm.learningDomainId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.learningDomainId), lovMap.learningDomainId);
            }
            if(data.learningDomainId === undefined || data.learningDomainId === null) {
                $(this.dataForm.learningDomainId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.learningDomainId).jqxDropDownList('selectIndex', $(this.dataForm.learningDomainId).jqxDropDownList('getItemByValue', data.learningDomainId).index);
            }
            $(this.dataForm.learningDomainName).val((data.learningDomainName === undefined || data.learningDomainName === null )? null : data.learningDomainName);
            this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
            if(data.status === undefined || data.status === null){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
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
            { name: 'levelName', type: 'string' ,label :'Level Name'},
            { name: 'levelDescription', type: 'string' ,label :'Description'},
            { name: 'levelNo', type: 'string' ,label :'Level #'},
            { name: 'learningDomainId', type: 'int' ,label :'Learning Domain',gui:'list',labelAttribute:'learningDomainName'},
            { name: 'learningDomainName', type: 'string' ,label :'', gui:'skip'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},

        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    BloomTaxonomyService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    BloomTaxonomyService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    BloomTaxonomyService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    BloomTaxonomyService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/bloom_taxonomy_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                debugger;
                self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    BloomTaxonomyService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    BloomTaxonomyService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    BloomTaxonomyService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
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
    BloomTaxonomyService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return BloomTaxonomyService;
}());