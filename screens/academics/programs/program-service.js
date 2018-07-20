var ProgramService = (function () {
    function ProgramService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["departmentId"];
        this.lovMap = null;
        this.dataGrid = $("#programTable");
        this.formDlg = $("#programDlg");
        this.gridToolbar = $("#programToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/ProgramController/list';
        this.deleteURL = CONTEXT_PATH +  '/app/ProgramController/delete';
        this.saveURL = CONTEXT_PATH + '/app/ProgramController/save';
        this.lovURL = CONTEXT_PATH + '/app/ProgramController/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/academics/programs/program.edit.jsp';
        this.title = "Program";
        this.populateForm = function (data, lovMap) {
            var self = this;
            $(this.dataForm.id).val(data.id === undefined ?null : data.id);
            $(this.dataForm.programName).val(data.programName === undefined ?null : data.programName);
            $(this.dataForm.shortName).val(data.shortName === undefined ?null : data.shortName);
            if(data.programTypeId === undefined) {
                $(this.dataForm.programTypeId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programTypeId), lovMap.programTypeId);
                $(this.dataForm.programTypeId).jqxDropDownList('selectIndex', $(this.dataForm.programTypeId).jqxDropDownList('getItemByValue', data.programTypeId).index);
            }
            $(this.dataForm.programTypeName).val(data.programTypeName === undefined ?null : data.programTypeName);
            if(data.programLevelSetupId === undefined) {
                $(this.dataForm.programLevelSetupId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programLevelSetupId), lovMap.programLevelSetupId);
                $(this.dataForm.programLevelSetupId).jqxDropDownList('selectIndex', $(this.dataForm.programLevelSetupId).jqxDropDownList('getItemByValue', data.programLevelSetupId).index);
            }
            $(this.dataForm.programLevelSetupName).val(data.programLevelSetupName === undefined ?null : data.programLevelSetupName);
            $(this.dataForm.semesters).val(data.semesters === undefined ?null : data.semesters);
            if(data.startSessionId === undefined) {
                $(this.dataForm.startSessionId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.startSessionId), lovMap.startSessionId);
                $(this.dataForm.startSessionId).jqxDropDownList('selectIndex', $(this.dataForm.startSessionId).jqxDropDownList('getItemByValue', data.startSessionId).index);
            }
            $(this.dataForm.startSessionName).val(data.startSessionName === undefined ?null : data.startSessionName);
            $(this.dataForm.creditHours).val(data.creditHours === undefined ?null : data.creditHours);

            $(this.dataForm.departmentName).val(data.departmentName === undefined ?null : data.departmentName);
            if(data.programShiftId === undefined) {
                $(this.dataForm.programShiftId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programShiftId), lovMap.programShiftId);
                $(this.dataForm.programShiftId).jqxDropDownList('selectIndex', $(this.dataForm.programShiftId).jqxDropDownList('getItemByValue', data.programShiftId).index);
            }
            $(this.dataForm.programShiftName).val(data.programShiftName === undefined ?null : data.programShiftName);
            if(data.programHeadId === undefined) {
                $(this.dataForm.programHeadId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programHeadId), lovMap.programHeadId);
                $(this.dataForm.programHeadId).jqxDropDownList('selectIndex', $(this.dataForm.programHeadId).jqxDropDownList('getItemByValue', data.programHeadId).index);
            }
            $(this.dataForm.programHeadName).val(data.programHeadName === undefined ?null : data.programHeadName);
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
            { name: 'id', type: 'int',gui:'hidden',label :'Id' },
            { name: 'programName', type: 'string' ,label :'Program Name'},
            { name: 'shortName', type: 'string' ,label :'Short Name'},
            { name: 'programTypeId', type: 'int' ,label :'Type',gui:'list',labelAttribute:'programTypeName'},
            { name: 'programTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'programLevelSetupId', type: 'int' ,label :'Level',gui:'list',labelAttribute:'programLevelSetupName'},
            { name: 'programLevelSetupName', type: 'string' ,label :'', gui:'skip'},
            { name: 'semesters', type: 'string' ,label :'Semesters'},
            { name: 'startSessionId', type: 'int' ,label :'Start Session',gui:'list',labelAttribute:'startSessionName'},
            { name: 'startSessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'creditHours', type: 'string' ,label :'Credit Hrs.'},
            { name: 'departmentId', type: 'int', label :'Department',gui:'hidden',labelAttribute:'departmentName'},
            { name: 'departmentName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campusId', type: 'int', label :'Campus',gui:'hidden',labelAttribute:'campusName'},
            { name: 'campusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'programShiftId', type: 'int' ,label :'Shift',gui:'list',labelAttribute:'programShiftName'},
            { name: 'programShiftName', type: 'string' ,label :'', gui:'skip'},
            { name: 'programHeadId', type: 'int' ,label :'Head',gui:'list',labelAttribute:'programHeadName'},
            { name: 'programHeadName', type: 'string' ,label :'', gui:'skip'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},

        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ProgramService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    ProgramService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    ProgramService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    ProgramService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        CommonService.sendAjaxRequest(this.formURL+"?department="+$("#departmentIdFilter").val()+"&campus="+$("#campusIdFilter").val(), 'get', null, $(".form-body")).then(function (data) {
            self.formDlg.find("span#dlgTitle").html("Program For '" + $("#departmentIdFilter").jqxDropDownList('getSelectedItem').label+"'");
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/ProgramController/find_by_id/'+ id, 'get', null, $(".form-body")).then(function (data) {
                    self.populateForm(data.data,data.lovMap);
                });
            }else {
                self.framework.GenerateDropDownList($(self.dataForm.programTypeId),self.lovMap.programTypeId);
                self.framework.GenerateDropDownList($(self.dataForm.programLevelSetupId),self.lovMap.programLevelSetupId);
                self.framework.GenerateDropDownList($(self.dataForm.startSessionId),self.lovMap.startSessionId);

                self.framework.GenerateDropDownList($(self.dataForm.programShiftId),self.lovMap.programShiftId);
                self.framework.GenerateDropDownList($(self.dataForm.programHeadId),self.lovMap.programHeadId);
                self.framework.GenerateDropDownList($(self.dataForm.status),self.lovMap.status);
                self.clear();

            }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ProgramService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ProgramService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    ProgramService.prototype.loadTable = function () {
        var self = this;
        CommonService.sendAjaxRequest(this.lovURL, 'get', null, $(".form-body")).then(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#programFilter").on('click',function(){
                    if( $("#departmentIdFilter").val() > 0 ) {
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
                showCollapseButton: true, height: '500px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    ProgramService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }

        this.framework.refreshGrid(this.dataGrid);
    };
    return ProgramService;
}());