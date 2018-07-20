var ProgramLevelService = (function () {
    function ProgramLevelService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#programLevelTable");
        this.formDlg = $("#programLevelDlg");
        this.gridToolbar = $("#programLevelToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/program_level_controller/list';
        this.deleteURL = CONTEXT_PATH +'/app/program_level_controller/delete';
        this.saveURL = CONTEXT_PATH +'/app/program_level_controller/save';
        this.lovURL = CONTEXT_PATH +'/app/program_level_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH +'/screens/academics/level/level.edit.jsp';
        this.title = "Program Level";
        this.populateForm = function (data, lovMap) {
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            if(data.programLevelId === undefined || data.programLevelId === null) {
                $(this.dataForm.programLevelId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programLevelId), lovMap.programLevelId);
                $(this.dataForm.programLevelId).jqxDropDownList('selectIndex', $(this.dataForm.programLevelId).jqxDropDownList('getItemByValue', data.programLevelId).index);
            }
            $(this.dataForm.programLevelName).val((data.programLevelName === undefined || data.programLevelName === null )? null : data.programLevelName);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.minCourseLoad).val((data.minCourseLoad === undefined || data.minCourseLoad === null )? null : data.minCourseLoad);
            $(this.dataForm.maxCourseLoad).val((data.maxCourseLoad === undefined || data.maxCourseLoad === null )? null : data.maxCourseLoad);
            $(this.dataForm.summerCourseLoad).val((data.summerCourseLoad === undefined || data.summerCourseLoad === null )? null : data.summerCourseLoad);
            $(this.dataForm.duration).val((data.duration === undefined || data.duration === null )? null : data.duration);
            $(this.dataForm.semesters).val((data.semesters === undefined || data.semesters === null )? null : data.semesters);
            $(this.dataForm.maxRepeatCourses).val((data.maxRepeatCourses === undefined || data.maxRepeatCourses === null )? null : data.maxRepeatCourses);
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
            { name: 'programLevelId', type: 'int' ,label :'Level',gui:'list',labelAttribute:'programLevelName'},
            { name: 'programLevelName', type: 'string' ,label :'', gui:'skip'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'minCourseLoad', type: 'string' ,label :'Minimum Load'},
            { name: 'maxCourseLoad', type: 'string' ,label :'Maximum Load'},
            { name: 'summerCourseLoad', type: 'string' ,label :'Summer Load'},
            { name: 'duration', type: 'string' ,label :'Duration'},
            { name: 'semesters', type: 'string' ,label :'Semester'},
            { name: 'maxRepeatCourses', type: 'string' ,label :'Max. Repeat Allowed'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ProgramLevelService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    ProgramLevelService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    ProgramLevelService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    ProgramLevelService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/program_level_controller/find_by_id/' + id, 'get', null, $(".form-body"))
                    .done(function (data) {
                    self.populateForm(data.data,data.lovMap);
                });
            }else {
                self.framework.GenerateDropDownList($(self.dataForm.programLevelId),self.lovMap.programLevelId);
                self.framework.GenerateDropDownList($(self.dataForm.status),self.lovMap.status);
                self.clear();

            }
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ProgramLevelService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ProgramLevelService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    ProgramLevelService.prototype.loadTable = function () {
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
    ProgramLevelService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return ProgramLevelService;
}());