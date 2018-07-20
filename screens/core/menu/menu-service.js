var MenuService = (function () {
    function MenuService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#menuTable");
        this.menuTree = $("#menuTree");
        this.formDlg = $("#menuDlg");
        this.gridToolbar = $("#menuToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH +'/app/menu_controller/list';
        this.deleteURL = CONTEXT_PATH + '/app/menu_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/menu_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/menu_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/core/menu/menu.edit.jsp';
        this.treeURL = CONTEXT_PATH + '/app/menu_controller/get_menu_tree';
        this.title = "Menu";
        this.populateForm = function (data, lovMap) {
            var self = this;
            $(this.dataForm.id).val(data.id === undefined ?null : data.id);
            $(this.dataForm.menuCode).val(data.menuCode === undefined ?null : data.menuCode);
            $(this.dataForm.label).val(data.label === undefined ?null : data.label);
            if(data.typeId === undefined) {
                $(this.dataForm.typeId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.typeId), lovMap.typeId);
                $(this.dataForm.typeId).jqxDropDownList('selectIndex', $(this.dataForm.typeId).jqxDropDownList('getItemByValue', data.typeId).index);
            }
            $(this.dataForm.typeName).val(data.typeName === undefined ?null : data.typeName);
            $(this.dataForm.icon).val(data.icon === undefined ?null : data.icon);
            $(this.dataForm.url).val(data.url === undefined ?null : data.url);
            if(data.status === undefined){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
                this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }

            $(this.dataForm.parentId).val(data.parentId === undefined ? null : data.parentId);
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
            { name: 'menuCode', type: 'string' ,label :'Code'},
            { name: 'label', type: 'string' ,label :'Label'},
            { name: 'typeId', type: 'int' ,label :'Type',gui:'list',labelAttribute:'TypeName'},
            { name: 'typeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'icon', type: 'string' ,label :'Icon'},
            { name: 'url', type: 'string' ,label :''},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'}


        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    MenuService.prototype.save = function () {
        var isValid = this.framework.validateForm(this.formDlg);
        if(isValid){

            var selectedItem = this.menuTree.jqxTree('getSelectedItem');
            var itemType = $("[formControlName='typeId']").jqxDropDownList('getSelectedItem').originalItem.code;
            if(selectedItem === null && itemType === 'I' && !($(this.dataForm.id).val() > 0)){
                CommonService.notificationError("Menu Placement Error","Please Select a Parent Menu where to place new menu or choose Type as 'Menu'");
            }else {
                if (!($(this.dataForm.id).val() > 0) && itemType != 'M') {
                    $("[formControlName='parentId']").val(selectedItem.id);
                    var formData = {};
                    var self = this;
                    $.each(this.fields, function (i, field) {
                        formData[field.name] = self.formDlg.find("[formControlName='" + field.name + "']").val();
                    });
                    this.menuTree.jqxTree('addTo', formData, this.menuTree.jqxTree('getSelectedItem').element);
                }
                this.framework.SaveForm(this, true);
            }
        }

    };
    /********************** New Record******************************************/
    MenuService.prototype.newRecord = function () {
        this.populateForm({});
    }

    /********************** Clear Form Fields For Update******************************************/
    MenuService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    MenuService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        CommonService.sendAjaxRequest(this.formURL, 'get', null, $(".form-body")).then(function (data) {
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/menu_controller/find_by_id/'+id, 'get', null, $(".form-body")).then(function (data) {
                    self.populateForm(data.data,data.lovMap);
                });
            }else {
                self.framework.GenerateDropDownList($(self.dataForm.typeId),self.lovMap.typeId);
                self.framework.GenerateDropDownList($(self.dataForm.icon),self.lovMap.icon);
                self.framework.GenerateDropDownList($(self.dataForm.status),self.lovMap.status);
                self.clear();

            }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    MenuService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    MenuService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    MenuService.prototype.loadTable = function () {
        var self = this;
        CommonService.sendAjaxRequest(this.lovURL, 'get', null, $(".form-body")).then(function (data) {
            self.lovMap = data.data;
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '700px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });

    };
    MenuService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return MenuService;
}());
