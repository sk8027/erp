var ApplicationRoleService = (function () {
    function ApplicationRoleService() {
/********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#roleTable");
        this.formDlg = $("#roleDlg");
        this.gridToolbar = $("#roleToolbar");
        this.framework = new Framework();
        this.dataForm = {}; 
        this.listURL = CONTEXT_PATH +'/app/RoleController/list';
        this.deleteURL = CONTEXT_PATH + '/app/RoleController/delete';
        this.saveURL = CONTEXT_PATH +'/app/RoleController/save';
        this.lovURL = CONTEXT_PATH +'/app/RoleController/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/core/application-role/application-role.edit.jsp';
        this.title = "System Role";
        this.populateForm = function (data, lovMap) {
            var self = this;
            $(this.dataForm.id).val(data.id === undefined ?null : data.id);
            $(this.dataForm.roleCode).val(data.roleCode === undefined ? null : data.roleCode);
            $(this.dataForm.description).val(data.description ===  undefined ? null : data.description);
            
            if(data.roleTypeId === undefined) {
                $(this.dataForm.roleTypeId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.roleTypeId), lovMap.roleTypeId);
                $(this.dataForm.roleTypeId).jqxDropDownList('selectIndex', $(this.dataForm.roleTypeId).jqxDropDownList('getItemByValue', data.roleTypeId).index);
            }
            if(data.status === undefined){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
                this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }
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
            { name: 'id', type: 'string',gui:'hidden',label :'Id' },
            { name: 'roleCode', type: 'string' ,label :'Role Code'},
            { name: 'roleTypeId', type: 'string' ,label :'Role Type',gui:'list',labelAttribute:'roleTypeName'},
            { name: 'roleTypeName', type: 'string' ,label :'Role Type', gui:'skip'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            
        ];

/********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

/********************** Save Form Record ******************************************/
    ApplicationRoleService.prototype.save = function () {
        debugger;
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    ApplicationRoleService.prototype.clear = function () {

    }
/********************** Clear Form Fields For Update******************************************/
    ApplicationRoleService.prototype.clear = function () {
        var model = {};

            model.id = $(this.dataForm.id).val();

        this.populateForm(model);

    };

/********************** Finding Record by Primary key ******************************************/
    ApplicationRoleService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        CommonService.sendAjaxRequest(this.formURL, 'get', null, $(".form-body")).then(function (data) {

            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
             if (id !== undefined && id !== null) {
                 CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/RoleController/find_by_id/'+id, 'get', null, $(".form-body")).then(function (data) {
                    self.populateForm(data.data,data.lovMap);

                });

            }else {
                 self.framework.GenerateDropDownList($(self.dataForm.roleTypeId),self.lovMap.roleTypeId);
                 self.framework.GenerateDropDownList($(self.dataForm.status),self.lovMap.status);
                 self.clear();
                 self.formDlg.on("change",function(){
                     self.formDlg.attr("data-changed","true");
                 });
                 self.formDlg.find("#DeleteBtn").attr("disabled","disabled");
             }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ApplicationRoleService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ApplicationRoleService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    ApplicationRoleService.prototype.loadTable = function () {
        var self = this;
        CommonService.sendAjaxRequest(this.lovURL, 'get', null, $(".form-body")).then(function (data) {
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
    ApplicationRoleService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return ApplicationRoleService;
}());
