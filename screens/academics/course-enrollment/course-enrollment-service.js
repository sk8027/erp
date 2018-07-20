var CourseEnrollmentService = (function () {
    function CourseEnrollmentService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseEnrollmentTable");
        this.formDlg = $("#courseEnrollmentDlg");
        this.gridToolbar = $("#courseEnrollmentToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_enrollment_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_enrollment_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_enrollment_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_enrollment_controller/refresh_page_lov';

        this.title = "Course Enrollment";
        CourseEnrollmentService.prototype.populateStudentInfo = function (rowData) {
            var profile =  "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Campus</a></h3><p>"+rowData.campusName+"</p></div> </li>";
            profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">School</a></h3><p>"+rowData.schoolName+"</p></div> </li>";
            profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Department</a></h3><p>"+rowData.departmentName+"</p></div> </li>";
            profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Program</a></h3><p>"+rowData.programName+"</p></div> </li>";
            $("#academicProfile").html(profile);
            var personalProfile =  " <div class=\"row\">\n" +
                "                            <div class=\"col-xs-8\">\n" +
                "                                <div class=\"list-head-title-container\">\n" +
                "                                    <h3 class=\"list-title uppercase sbold\">"+rowData.contactName+"</h3>\n" +
                "                                    <div class=\"list-date\">"+rowData.enrollmentId+"</div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                            <div class=\"col-xs-4\">\n" +
                "                                <div class=\"list-head-summary-container\">\n" +
                "                                    <div class=\"list-pending\">\n" +
                "\n" +
                "                                        <div class=\"list-label\">"+rowData.batchName+"</div>\n" +
                "                                    </div>\n" +
                "                                    <div class=\"list-done\">\n" +
                "\n" +
                "                                        <div class=\"list-label\">"+rowData.studentStatusName+"</div>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>";
            $("#personalProfile").html(personalProfile);
        }
        CourseEnrollmentService.prototype.constructStudentTable = function (data) {
            var self = this;
            var container = $("#studentGridFilter");
            self.source = {
                datatype: 'json',
                datafields:  [
                    { name: 'id', type: 'int', required:false},
                    { name: 'enrollmentId', type: 'string', required:false},
                     { name: 'campusName', type: 'string', required:false},
                     { name: 'schoolName', type: 'string', required:false},
                     { name: 'departmentName', type: 'string', required:false},
                     { name: 'programName', type: 'string', required:false},
                     { name: 'batchName', type: 'string', required:false},
                    { name: 'studentStatusName', type: 'string', required:false},
                     { name: 'currentSemesterName', type: 'string', required:false},
                    { name: 'contactName', type: 'string', required:false},

                ] ,
                localdata : data,

            };


            container.jqxGrid({
                width: '100%',
                source: new $.jqx.dataAdapter(self.source),

                columns: [
                    { text: 'Id', datafield: 'id',hidden:true},
                    {text: '<b style="color:#32c5d2">Name</b>', datafield: 'contactName' },
                    {text: '<b style="color:#32c5d2">Enrollment #</b>', datafield: 'enrollmentId' },
                    {text: '<b style="color:#32c5d2">Campus </b>', datafield: 'campusName' },
                    {text: '<b style="color:#32c5d2">School </b>', datafield: 'schoolName' },
                    {text: '<b style="color:#32c5d2">Department</b>', datafield: 'departmentName' },
                    {text: '<b style="color:#32c5d2">Program</b>', datafield: 'programName' },
                    {text: '<b style="color:#32c5d2">Batch</b>', datafield: 'batchName' },
                    {text: '<b style="color:#32c5d2">Current Semester</b>', datafield: 'currentSemesterName' },
                    {text: '<b style="color:#32c5d2">Status</b>', datafield: 'studentStatusName' },


                ],
                editable: false,
                theme: JQXTHEME,
                selectionmode: 'singlerow'
            });
            container.on('rowselect', function (event)
            {
                debugger;
                var args = event.args;
                var rowBoundIndex = args.rowindex;
                 var rowData = args.row;

                var sessionId = $("#sessionIdFilter").val();
                var departmentId = $("#departmentIdFilter").val();
                self.framework.RefreshJsonGrid(self, self.listURL + "/" + rowData.id +"/"+sessionId + "/" + departmentId);
                self.formDlg.jqxWindow('close');
            });
        }
        CourseEnrollmentService.prototype.constructTable = function () {
            var self = this;
            var container = self.dataGrid;
            self.source = {
                datatype: 'json',
                datafields:  self.fields ,
                localdata : self.data,

            };

            var toolbar = self.gridToolbar;
            container.jqxGrid({
                width: '100%',
                height:'100%',
                source: new $.jqx.dataAdapter(self.source),

                columns: [
                    { text: 'Id', datafield: 'id',hidden:true},
                    { text: 'Student Id', datafield: 'studentId',hidden:true},
                    { text: 'Course Id', datafield: 'courseId',hidden:true},
                    {text: '<b style="color:#32c5d2">Course</b>', datafield: 'courseName'
                    },
                    {text: '<b style="color:#32c5d2">Credit Hrs</b>', datafield: 'creditHours'
                    },
                    {text: '<b style="color:#32c5d2">Lab Credit Hrs.</b>', datafield: 'labCreditHours'
                    },
                    { text: 'Session', datafield: 'sessionId',hidden:true},
                    { text: 'Department', datafield: 'departmentId',hidden:true},

                ],
                editable: false,
                theme: JQXTHEME,
                selectionmode: 'checkbox'
            });
            container.on('rowselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").attr("disabled","disabled");
                }else {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").removeAttr("disabled");
                }
            });
            container.on('rowunselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").attr("disabled","disabled");
                }
            });
        }
        CourseEnrollmentService.prototype.constructBulkTable = function () {
            var self = this;
            var container = $("#bulkEnrollmentTable");
            self.source = {
                datatype: 'json',
                datafields:  [
                    { name: 'studentId', type: 'int', required:false},
                    { name: 'courseId', type: 'int', required:false},
                    { name: 'creditHours', type: 'int', required:false},
                    { name: 'labCreditHours', type: 'int', required:false},
                    { name: 'sessionId', type: 'int', required:false},
                    { name: 'enrollmentId', type: 'string', required:false},
                    { name: 'studentName', type: 'string', required:false},
                    { name: 'programName', type: 'string', required:false},
                    { name: 'batchName', type: 'string', required:false},
                    { name: 'semesterName', type: 'string', required:false},


                ] ,
                localdata : self.data,

            };

            var toolbar = self.gridToolbar;
            container.jqxGrid({
                width: '100%',
                height:'100%',
                source: new $.jqx.dataAdapter(self.source),
                filterable : true,

                columns: [
                    { text: 'Id', datafield: 'studentId',hidden:true},
                    { text: 'course', datafield: 'courseId',hidden:true},
                    { text: 'session', datafield: 'sessionId',hidden:true},
                    { text: 'Cr Hrs', datafield: 'creditHours',hidden:true},
                    { text: 'Lab Cr Hrs', datafield: 'labCreditHours',hidden:true},
                    {text: '<b style="color:#32c5d2">Enrollment #</b>', datafield: 'enrollmentId' },
                    {text: '<b style="color:#32c5d2">Name</b>', datafield: 'studentName' },
                     {text: '<b style="color:#32c5d2">Program</b>', datafield: 'programName',filterable :false },
                    {text: '<b style="color:#32c5d2">Batch</b>', datafield: 'batchName' ,filterable :false},
                    {text: '<b style="color:#32c5d2">Semester</b>', datafield: 'semesterName',filterable :false },
                ],
                editable: false,
                theme: JQXTHEME,
                selectionmode: 'checkbox'
            });
            container.on('rowselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").attr("disabled","disabled");
                }else {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").removeAttr("disabled");
                }
            });
            container.on('rowunselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseEnrollmentToolbar #DeleteRowBtn").attr("disabled","disabled");
                }
            });
        }
        /********************** Table Fields ******************************************/
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'studentId', type: 'int', required:true, index:0},
            { name: 'studentName', type: 'string', required:false},
            { name: 'courseId', type: 'int', required:true, index:0},
            { name: 'departmentId', type: 'int', required:true, index:0},
            { name: 'courseName', type: 'string', required:false},
            { name: 'sessionId', type: 'int', required:true, index:0},
            { name: 'creditHours', type: 'int', required:true, index:0},
            { name: 'labCreditHours', type: 'int', required:true, index:0},
            { name: 'sessionName', type: 'string', required:false},
            { name: 'sectionTypeId', type: 'int', required:true, index:0},
            { name: 'sectionTypeName', type: 'string', required:false},
            { name: 'courseSectionId', type: 'int', required:false},
            { name: 'courseSectionName', type: 'string', required:false},
            { name: 'sectionStatusId', type: 'int', required:false},
            { name: 'sectionStatusName', type: 'string', required:false},
            { name: 'remarks', type: 'string', required:false},
            { name: 'status', type: 'string', required:false},
            { name: 'statusName', type: 'string', required:false},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseEnrollmentService.prototype.enroll = function () {
        var self = this;
        var data = [];

        $.each($("#bulkEnrollmentTable").jqxGrid('getselectedrowindexes'),function(index,row){
            data.push($("#bulkEnrollmentTable").jqxGrid('getrowdata', row));
        });
        if(data.length > 0) {
            CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/course_enrollment_controller/enroll/", 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

                if (responseData["dataHeader"].messageType === 'SUCCESS') {
                    CommonService.toastMessage("Course Enrollment", "Student Enrolled Successfully");
                    var sessionId = $("#sessionIdFilter").val();
                    var departmentId = $("#departmentIdFilter").val();
                    var courseId = $("#courseIdFilter").val();
                    var url = CONTEXT_PATH + "/app/course_enrollment_controller/get_student/" + departmentId + "/" + sessionId + "/" + courseId;
                    CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {
                        $("#bulkEnrollmentTable").jqxGrid('clearselection');
                        $("#bulkEnrollmentTable").jqxGrid('source')._source.localdata = data.data;
                        $("#bulkEnrollmentTable").jqxGrid('updatebounddata', 'cells');
                        $("#bulkEnrollmentTable").jqxGrid('refresh');

                    });
                }
            });
        }else{
            CommonService.toastError("Course Enrollment", "Please Select Students to Enroll");
        }
    }

    CourseEnrollmentService.prototype.searchStudent = function () {
        if( $("#departmentIdFilter").val() > 0 && $("#enrollmentIdFilter").val().length > 0 && $("#sessionIdFilter").val() > 0 ) {
            var enrollmentNo = $("#enrollmentIdFilter").val();
            var sessionId = $("#sessionIdFilter").val();
            var departmentId = $("#departmentIdFilter").val();
            CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_student/"+enrollmentNo , 'get', null, $(".form-body")).then(function (data) {
                 if(data.data.length == 0) {
                    alert('no data found');
                }else if(data.data.length == 1) {
                    var sessionId = $("#sessionIdFilter").val();
                    var departmentId = $("#departmentIdFilter").val();
                    self.framework.RefreshJsonGrid(self, self.listURL + "/" + data.data[0].id +"/"+sessionId + "/" + departmentId);
                    var rowData = data.data[0];
                    var profile =  "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Campus</a></h3><p>"+rowData.campusName+"</p></div> </li>";
                    profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">School</a></h3><p>"+rowData.schoolName+"</p></div> </li>";
                    profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Department</a></h3><p>"+rowData.departmentName+"</p></div> </li>";
                    profile += "<li class=\"mt-list-item done\"> <div class=\"list-item-content\" style=\"padding-left:10px\"><h3 class=\"uppercase bold\"><a href=\"javascript:;\">Program</a></h3><p>"+rowData.programName+"</p></div> </li>";
                    $("#academicProfile").html(profile);

                    var personalProfile =  " <div class=\"row\">\n" +
                        "                            <div class=\"col-xs-8\">\n" +
                        "                                <div class=\"list-head-title-container\">\n" +
                        "                                    <h3 class=\"list-title uppercase sbold\">"+rowData.contactName+"</h3>\n" +
                        "                                    <div class=\"list-date\">"+rowData.enrollmentId+"</div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"col-xs-4\">\n" +
                        "                                <div class=\"list-head-summary-container\">\n" +
                        "                                    <div class=\"list-pending\">\n" +
                        "                                        <div class=\"list-label\">"+rowData.batchName+"</div>\n" +
                        "                                    </div>\n" +
                        "                                    <div class=\"list-done\">\n" +
                        "\n" +
                        "                                        <div class=\"list-label\">"+rowData.studentStatusName+"</div>\n" +
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                        </div>";
                    $("#personalProfile").html(personalProfile);
                    self.formDlg.jqxWindow('close');
                    $("#enrollBtn").removeAttr("disabled");
                }else{
                    self.constructStudentTable(data.data);
                    self.formDlg.jqxWindow('open');
                    $("#enrollBtn").removeAttr("disabled");

                }

            });

        }
    }


    /********************** Load the table from Server ******************************************/
    CourseEnrollmentService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                self.framework.GenerateDropDownList($("#enrollmentTypeFilter"),[{label:"Student" ,value:"S"},{label:"Course" ,value:"C"}]);
                self.data = [];
                self.constructTable();
                self.constructBulkTable();
                $("#courseEnrollmentDiv").hide();
                $("#studentEnrollmentDiv").hide();
                $('#enrollmentTypeFilter').on('select', function (event) {
                    $("#campusIdFilter").jqxDropDownList('clearSelection');
                    $("#campusIdFilter").jqxDropDownList('clearFilter');
                    $("#schoolIdFilter").jqxDropDownList('clear');
                    $("#departmentIdFilter").jqxDropDownList('clear');
                    $("#courseIdFilter").jqxDropDownList('clear');
                    $("#sessionIdFilter").jqxDropDownList('clearSelection');
                    $("#sessionIdFilter").jqxDropDownList('clearFilter');
                     $("#enrollmentIdFilter").val("")
                    $("#courseEnrollmentToolbar").show();
                    self.framework.ClearGrid($("#bulkEnrollmentTable"));
                    self.framework.ClearGrid($("#courseEnrollmentTable"));
                    if(event.args.item.value === "S"){
                        $("#screenFilterDiv").show();
                        $("#courseIdFilterDiv").hide();

                        $("#enrollmentIdFilterDiv").show();
                        $("#studentEnrollmentDiv").show();
                        $("#courseEnrollmentDiv").hide();
                    }else if(event.args.item.value === "C"){
                        $("#screenFilterDiv").show();
                        $("#courseIdFilterDiv").show();

                        $("#enrollmentIdFilterDiv").hide();
                        $("#studentEnrollmentDiv").hide();
                        $("#courseEnrollmentDiv").show();
                    }

                });
                $('#enrollmentIdFilter').jqxInput({placeHolder: "Enrollment #", height: 36, width: '100%', theme:JQXTHEME});

                var width = ($(window).width()-50);
                self.formDlg.jqxWindow({
                    showCollapseButton: true, height: '400px',width:width,maxWidth:width,
                    isModal:true,
                    theme : JQXTHEME,
                    autoOpen: false
                });
                $('#courseIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0 && $("#sessionIdFilter").val() > 0) {
                        $("#courseIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_offered_courses/" + $("#departmentIdFilter").val()+"/"+$("#sessionIdFilter").val(), 'get', null, $("#courseIdFilter")).then(function (data) {


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

                $("#courseEnrollmentFilter").on('click',function(){
                    debugger;
                    var enrollmentTypeFilter = $("#enrollmentTypeFilter").val();
                    if(enrollmentTypeFilter === "S"){
                        this.searchStudent();
                    }else if(enrollmentTypeFilter === "C"){
                        var departmentId = $("#departmentIdFilter").val();
                         var sessionId = $("#sessionIdFilter").val();

                        var courseId = $("#courseIdFilter").val();

                         if(departmentId > 0 && courseId > 0  && sessionId > 0){
                             $("#enrollBtn").removeAttr("disabled");
                             var url = CONTEXT_PATH+ "/app/course_enrollment_controller/get_student/" + departmentId +"/"+sessionId+ "/" + courseId;
                             CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {

                                 $("#bulkEnrollmentTable").jqxGrid('clearselection');
                                  $("#bulkEnrollmentTable").jqxGrid('source')._source.localdata = data.data;
                                 $("#bulkEnrollmentTable").jqxGrid('updatebounddata', 'cells');
                                 $("#bulkEnrollmentTable").jqxGrid('refresh');

                             });
                         }

                    }

                });
            }
        });
    };
    return CourseEnrollmentService;
}());