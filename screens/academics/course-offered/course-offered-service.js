var CourseOfferedService = (function () {
    function CourseOfferedService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseOfferedTable");
        this.formDlg = $("#courseOfferedDlg");
        this.gridToolbar = $("#courseOfferedToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_offered_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_offered_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_offered_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_offered_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/academics/course-offered/course-offered.edit.jsp';
        this.title = "Course Offered";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;

            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.courseName).val((data.courseName === undefined || data.courseName === null )? null : data.courseName);
            $(this.dataForm.sessionName).val((data.sessionName === undefined || data.sessionName === null )? null : data.sessionName);
            $(this.dataForm.departmentName).val((data.departmentName === undefined || data.departmentName === null )? null : data.departmentName);
            if(lovMap == undefined){
                $(this.dataForm.semesterId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.semesterId), lovMap.semesterId);
                $(this.dataForm.semesterId).on('open', function (event) {

                    if($("[formControlName='programId']").val() > 0) {
                        $("[formControlName='semesterId']").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_semesters/" + $("[formControlName='programId']").val()+"/"+ $("#sessionIdFilter").val(), 'get', null, $("#courseOfferedDlg")).then(function (data) {


                            $.each(data.data, function (item, department) {
                                $("[formControlName='semesterId']").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("[formControlName='semesterId']").jqxDropDownList('clear');

                    }
                });
            }
            if(lovMap == undefined){
                $(this.dataForm.programId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.programId), lovMap.programId);

            }
            if(data.semesterId === undefined || data.semesterId === null) {
                $(this.dataForm.semesterId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.semesterId).jqxDropDownList('selectIndex', $(this.dataForm.semesterId).jqxDropDownList('getItemByValue', data.semesterId).index);
            }
            if(data.programId === undefined || data.programId === null) {
                $(this.dataForm.programId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.programId).jqxDropDownList('selectIndex', $(this.dataForm.programId).jqxDropDownList('getItemByValue', data.programId).index);
            }
            $(this.dataForm.semesterName).val((data.semesterName === undefined || data.semesterName === null )? null : data.semesterName);
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
            { name: 'courseId', type: 'int' ,label :'Course',gui:'hidden'},
            { name: 'courseName', type: 'string' ,label :'', gui:'skip'},
            { name: 'programId', type: 'int' ,label :'Program',gui:'list',labelAttribute:'programName'},
            { name: 'programName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sessionId', type: 'int' ,label :'Session',gui:'hidden'},
            { name: 'sessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'departmentId', type: 'int' ,label :'Department',gui:'hidden'},
            { name: 'departmentName', type: 'string' ,label :'', gui:'skip'},
            { name: 'semesterId', type: 'int' ,label :'Semester',gui:'list',labelAttribute:'semesterName'},
            { name: 'semesterName', type: 'string' ,label :'', gui:'skip'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseOfferedService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CourseOfferedService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseOfferedService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseOfferedService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?department="+$("#departmentIdFilter").val()+"&course="+$("#courseIdFilter").val()+"&session="+$("#sessionIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_offered_controller/find_by_id/' + id+'/'+$("#departmentIdFilter").val(), 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseOfferedService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseOfferedService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseOfferedService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $('#courseIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0) {
                        $("#courseIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_courses/" + $("#departmentIdFilter").val(), 'get', null, $("#courseIdFilter")).then(function (data) {


                            $.each(data.data, function (item, department) {
                                $("#courseIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#courseIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#courseOfferedFilter").on('click',function(){
                    if( $("#departmentIdFilter").val() > 0 && $("#courseIdFilter").val() > 0 && $("#sessionIdFilter").val() > 0 ) {
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
    CourseOfferedService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CourseOfferedService;
}());