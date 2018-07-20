var CourseApprovalService = (function () {
    function CourseApprovalService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseApprovalTable");
        this.formDlg = $("#courseApprovalDlg");
        this.gridToolbar = $("#courseApprovalToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_enrollment_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_enrollment_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_enrollment_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_enrollment_controller/refresh_page_lov';

        this.title = "Course Approval";


        CourseApprovalService.prototype.constructTable = function () {
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
                    $("#courseApprovalToolbar #DeleteRowBtn").attr("disabled","disabled");
                }else {
                    $("#courseApprovalToolbar #DeleteRowBtn").removeAttr("disabled");
                }
            });
            container.on('rowunselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseApprovalToolbar #DeleteRowBtn").attr("disabled","disabled");
                }
            });
        }

        /********************** Table Fields ******************************************/
        this.fields = [
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


        ] ;

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseApprovalService.prototype.approve = function () {
        $("#remarks").val("");
        $(".page-message-area").html("");
        if(this.dataGrid.jqxGrid('getselectedrowindexes').length>0){
            this.formDlg.jqxWindow('open');
        }else{
            CommonService.toastError("Course Approval", "No Student Selected for Approval");
        }


        /*var self = this;
        var data = [];

        $.each($("#bulkEnrollmentTable").jqxGrid('getselectedrowindexes'),function(index,row){
            data.push($("#bulkEnrollmentTable").jqxGrid('getrowdata', row));
        });

        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/course_enrollment_controller/enroll/", 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

            if (responseData["dataHeader"].messageType === 'SUCCESS') {
                CommonService.toastMessage("Course Enrollment", "Student Enrolled Successfully");
                var sessionId = $("#sessionIdFilter").val();
                var sectionTypeId = $("#sectionTypeIdFilter").val();
                var courseId = $("#courseIdFilter").val();
                var url = CONTEXT_PATH+ "/app/course_enrollment_controller/get_approval_request/" + sectionTypeId +"/"+sessionId+ "/" + courseId;
                CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {
                    $("#bulkEnrollmentTable").jqxGrid('clearselection');
                    $("#bulkEnrollmentTable").jqxGrid('source')._source.localdata = data.data;
                    $("#bulkEnrollmentTable").jqxGrid('updatebounddata', 'cells');
                    $("#bulkEnrollmentTable").jqxGrid('refresh');

                });
            }
        })*/
    };
    CourseApprovalService.prototype.searchFilterRequest = function () {
        var sessionId = $("#sessionIdFilter").val();
        var courseId = $("#courseIdFilter").val();
        if(courseId > 0  && sessionId > 0){
            $("#enrollBtn").removeAttr("disabled");
            var url = CONTEXT_PATH+ "/app/course_enrollment_controller/get_approval_request/" + +sessionId+ "/" + courseId;
            CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {

                $("#courseApprovalTable").jqxGrid('clearselection');
                $("#courseApprovalTable").jqxGrid('source')._source.localdata = data.data;
                $("#courseApprovalTable").jqxGrid('updatebounddata', 'cells');
                $("#courseApprovalTable").jqxGrid('refresh');

            });
        }else{
            CommonService.toastError("Course Approval", "Select Course and Session to Search");
        }
    }
    CourseApprovalService.prototype.processRequest = function (self,requestType) {


        var data = [];

        $.each(self.dataGrid.jqxGrid('getselectedrowindexes'),function(index,row){
            var rowData =self.dataGrid.jqxGrid('getrowdata', row);
            data.push({studentId:rowData.studentId, remarks:$("#remarks").val()});
        });

        var url = CONTEXT_PATH + "/app/course_enrollment_controller/update_course_status/"+$("#courseIdFilter").val()+"/"+$("#sessionIdFilter").val() +"/"+requestType;
        CommonService.sendAjaxRequest(url, 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

            if (responseData["dataHeader"].messageType === 'SUCCESS') {
                CommonService.toastMessage("Course Approval", "Request processed Successfully");
                self.searchFilterRequest();
                self.formDlg.jqxWindow('close');

            }
        })
    };



    /********************** Load the table from Server ******************************************/
    CourseApprovalService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });

                self.data = [];
                self.constructTable();

                self.formDlg.jqxWindow({
                    showCollapseButton: true, height: '350px',width:'800px',
                    isModal:true,
                    theme : JQXTHEME,
                    autoOpen: false
                });
                $("#screenFilterDiv").on("change",function () {
                    self.framework.ClearGrid(self.dataGrid);
                })
                $("#approvePopupBtn").on('click',function () {
                    self.processRequest(self,"A");
                })
                $("#rejectPopupBtn").on('click',function () {
                    if($("#remarks").val().trim().length>0){
                        self.processRequest(self,"R");
                    }else{
                        CommonService.errorMessage("Course Approval", "Explain the reason in remarks for rejection");
                    }

                })
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

                $("#courseApprovalFilter").on('click',function(){
                    self.searchFilterRequest();



                });
            }
        });
    };
    return CourseApprovalService;
}());