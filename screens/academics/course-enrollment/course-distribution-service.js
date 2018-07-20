var CourseDistributionService = (function () {
    function CourseDistributionService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId","sectionTypeId"];
        this.lovMap = null;
        this.dataGrid = $("#courseDistributionTable");
        this.formDlg = $("#courseDistributionDlg");
        this.gridToolbar = $("#courseDistributionToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_enrollment_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_enrollment_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_enrollment_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_enrollment_controller/refresh_page_lov';

        this.title = "Course Distribution";


        CourseDistributionService.prototype.constructTable = function () {
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
                    $("#courseDistributionToolbar #DeleteRowBtn").attr("disabled","disabled");
                }else {
                    $("#courseDistributionToolbar #DeleteRowBtn").removeAttr("disabled");
                }
            });
            container.on('rowunselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseDistributionToolbar #DeleteRowBtn").attr("disabled","disabled");
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
    CourseDistributionService.prototype.distribute = function () {
        var self = this;
        //$("#remarks").val("");
        $(".page-message-area").html("");


        if($("#courseIdFilter").val() > 0 && $("#sessionIdFilter").val() >0 && $("#sessionIdFilter").val() > 0) {
            debugger;
            if(this.dataGrid.jqxGrid('getselectedrowindexes').length>0){
                CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/course_enrollment_controller/get_course_sections/" + $("#courseIdFilter").val() + "/" + $("#sessionIdFilter").val() + "/" + $("#sectionTypeIdFilter").val(), 'get', null, $("#courseDistribution")).then(function (data) {
                    if(data.data.length > 0) {
                        $("#courseSectionFilter").jqxDropDownList({
                            theme: JQXTHEME,
                            source: self.framework.GenerateDropDownAdapter(data.data, "courseSectionName", "courseSectionId"),
                            displayMember: "courseSectionName",
                            valueMember: "courseSectionId",
                            width: '100%',
                            height: '34px',
                            filterable: 'true',
                            searchMode: 'containsignorecase',

                        });
                        self.formDlg.jqxWindow('open');
                    }else{
                        CommonService.toastError("Course Distribution", "Define section");
                    }
                });
            }else{
                CommonService.toastError("Course Approval", "No Student For Section Distribution");
            }

        }else{
            CommonService.toastError("Course Distribution", "Please choose Course to approve");
        }

    };

    CourseDistributionService.prototype.searchFilterRequest = function () {
        var sectionTypeId = $("#sectionTypeIdFilter").val();
        var sessionId = $("#sessionIdFilter").val();

        var courseId = $("#courseIdFilter").val();

        if(sectionTypeId > 0 && courseId > 0  && sessionId > 0){
            $("#enrollBtn").removeAttr("disabled");
            var url = CONTEXT_PATH+ "/app/course_enrollment_controller/get_section_distribution_list/" + sectionTypeId +"/"+sessionId+ "/" + courseId;
            CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {

                $("#courseDistributionTable").jqxGrid('clearselection');
                $("#courseDistributionTable").jqxGrid('source')._source.localdata = data.data;
                $("#courseDistributionTable").jqxGrid('updatebounddata', 'cells');
                $("#courseDistributionTable").jqxGrid('refresh');

            });
        }else{
            CommonService.toastError("Course Approval", "Select Course, Session and Sectiont Type to Search");
        }
    }


    /********************** Load the table from Server ******************************************/
    CourseDistributionService.prototype.loadTable = function () {
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
                    showCollapseButton: true, height: '270px',width:'800px',
                    isModal:true,
                    theme : JQXTHEME,
                    autoOpen: false
                });
                $("#screenFilterDiv").on("change",function () {
                     self.framework.ClearGrid(self.dataGrid);
                });
                $("#placeBtn").on('click',function () {
                    var data = [];
                    $.each(self.dataGrid.jqxGrid('getselectedrowindexes'),function(index,row){
                        var rowData =self.dataGrid.jqxGrid('getrowdata', row);
                        data.push({
                            studentId:rowData.studentId,
                            courseSectionId:$("#courseSectionFilter").val(),
                            courseId:$("#courseIdFilter").val(),
                            sessionId:$("#sessionIdFilter").val(),
                            sectionTypeId:$("#sectionTypeIdFilter").val()
                        });
                    });

                    var url = CONTEXT_PATH + "/app/course_enrollment_controller/distribute_students";
                    CommonService.sendAjaxRequest(url, 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

                        if (responseData["dataHeader"].messageType === 'SUCCESS') {
                            CommonService.toastMessage("Course Approval", "Request processed Successfully");
                             self.searchFilterRequest();
                            self.formDlg.jqxWindow('close');

                        }
                    });
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

                $("#courseDistributionFilter").on('click',function(){

                       self.searchFilterRequest();



                });
            }
        });
    };
    return CourseDistributionService;
}());