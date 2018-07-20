var CourseDistributionListService = (function () {
    function CourseDistributionListService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseDistributionListTable");
        this.formDlg = $("#courseDistributionListDlg");
        this.gridToolbar = $("#courseDistributionListToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_enrollment_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_enrollment_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_enrollment_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_enrollment_controller/refresh_page_lov';

        this.title = "Course DistributionList";


        CourseDistributionListService.prototype.constructTable = function () {
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
                    { text: 'sectionId', datafield: 'sectionId',hidden:true},
                    { text: 'Student Id', datafield: 'studentId',hidden:true},
                    { text: 'course', datafield: 'courseId',hidden:true},
                    { text: 'Section Type', datafield: 'sectionTypeId',hidden:true},
                    { text: 'session', datafield: 'sessionId',hidden:true},
                    {text: '<b style="color:#32c5d2">Section Type</b>', datafield: 'sectionType',hidden:true },
                    {text: '<b style="color:#32c5d2">Section Name</b>', datafield: 'sectionName',hidden:true },
                    {text: '<b style="color:#32c5d2">Enrollment #</b>', datafield: 'enrollmentId' },
                    {text: '<b style="color:#32c5d2">Name</b>', datafield: 'studentName' },
                    {text: '<b style="color:#32c5d2">Program</b>', datafield: 'programName',filterable :false },
                    {text: '<b style="color:#32c5d2">Batch</b>', datafield: 'batchName' ,filterable :false},
                    {text: '<b style="color:#32c5d2">Semester</b>', datafield: 'semesterName',filterable :false },
                ],
                editable: false,
                theme: JQXTHEME,
                selectionmode: 'checkbox',
                groupable: true,
                closeablegroups:false,
                groups : ["sectionType", "sectionName"]
            });
            container.on('rowselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseDistributionListToolbar #DeleteRowBtn").attr("disabled","disabled");
                }else {
                    $("#courseDistributionListToolbar #DeleteRowBtn").removeAttr("disabled");
                }
            });
            container.on('rowunselect', function (event)
            {
                if(container.jqxGrid('getselectedrowindexes').length === 0) {
                    $("#courseDistributionListToolbar #DeleteRowBtn").attr("disabled","disabled");
                }
            });
        }

        /********************** Table Fields ******************************************/
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'studentId', type: 'int', required:false},
            { name: 'courseId', type: 'int', required:false},
            { name: 'sectionId', type: 'int', required:false},
            { name: 'sectionTypeId', type: 'int', required:false},
            { name: 'sectionType', type: 'string', required:false},
            { name: 'sectionName', type: 'string', required:false},
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
    CourseDistributionListService.prototype.drop= function () {

        var self = this;
        if(self.dataGrid.jqxGrid('getselectedrowindexes').length > 0) {
            HtmlHelper.ConfirmationDialog("courseDrpDlg", "Drop Course", "Are You sure you want to Drop the Course? Course will be dropped from Lab as well", "D", function () {
                var data = [];
                $.each(self.dataGrid.jqxGrid('getselectedrowindexes'), function (index, row) {
                    debugger;
                    var rowData = self.dataGrid.jqxGrid('getrowdata', row);
                    data.push(rowData);
                });

                var url = CONTEXT_PATH + "/app/course_enrollment_controller/drop_course";
                debugger;
                CommonService.sendAjaxRequest(url, 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.toastMessage("Course Approval", "Course Dropped Successfully");
                        self.searchFilterRequest();
                        self.formDlg.jqxWindow('close');

                    }
                });
            });
        }else{
            CommonService.toastError("Course Drop", "Choose a Student to Drop");
        }
    }
    CourseDistributionListService.prototype.transfer= function () {
        var self = this;
        //$("#remarks").val("");
        $(".page-message-area").html("");


        if($("#courseIdFilter").val() > 0 && $("#sessionIdFilter").val() >0) {
            if(this.dataGrid.jqxGrid('getselectedrowindexes').length>0){
                var groups = {};
                var courseSections = {};
                $.each(self.dataGrid.jqxGrid('getselectedrowindexes'), function (index, row) {
                     var rowData = self.dataGrid.jqxGrid('getrowdata', row);
                     groups[rowData.sectionTypeId] = true;
                    courseSections[rowData.sectionTypeId] = rowData.sectionId;
                });
                if(Object.keys(groups).length>1){
                    CommonService.toastError("Section Transfer", "Please Choose Students from Single Section");
                }else {
                    debugger;
                    var course = $("#courseIdFilter").val();
                    var session = $("#sessionIdFilter").val();
                    var sectionType = Object.keys(groups)[0];
                    var section = courseSections[sectionType];

                    CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/course_enrollment_controller/get_course_other_sections/" + course + "/" + session+"/"+sectionType+"/"+section, 'get', null, $("#courseDistributionList")).then(function (data) {
                        if (data.data != undefined && data.data.length > 0) {
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
                        } else {
                            CommonService.toastError("Section Transfer", "There is only one section for this Subject");
                        }
                    });
                }
            }else{
                CommonService.toastError("Course Approval", "No Student For Section DistributionList");
            }

        }else{
            CommonService.toastError("Course DistributionList", "Please choose Course to approve");
        }

    };

    CourseDistributionListService.prototype.searchFilterRequest = function () {

        var sessionId = $("#sessionIdFilter").val();

        var courseId = $("#courseIdFilter").val();

        if( courseId > 0  && sessionId > 0){
            $("#enrollBtn").removeAttr("disabled");
            var url = CONTEXT_PATH+ "/app/course_enrollment_controller/get_all_distribution/" + +sessionId+ "/" + courseId;
            CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {

                $("#courseDistributionListTable").jqxGrid('clearselection');
                $("#courseDistributionListTable").jqxGrid('source')._source.localdata = data.data;
                $("#courseDistributionListTable").jqxGrid('updatebounddata' );
                $("#courseDistributionListTable").jqxGrid('refresh');
                $("#courseDistributionListTable").jqxGrid('addgroup',"sectionType" );
                $("#courseDistributionListTable").jqxGrid('addgroup',"sectionName" );

            });
        }else{
            CommonService.toastError("Course Approval", "Select Course, Session and Sectiont Type to Search");
        }
    }


    /********************** Load the table from Server ******************************************/
    CourseDistributionListService.prototype.loadTable = function () {
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
                $("#transferPopupBtn").on('click',function () {
                    var data = [];
                    $.each(self.dataGrid.jqxGrid('getselectedrowindexes'),function(index,row){
                        var rowData =self.dataGrid.jqxGrid('getrowdata', row);
                        data.push(rowData.id);
                    });

                    var url = CONTEXT_PATH + "/app/course_enrollment_controller/transfer_section/"+$("#courseSectionFilter").val();
                    CommonService.sendAjaxRequest(url, 'post', JSON.stringify(data), $(".form-body")).then(function (responseData) {

                        if (responseData["dataHeader"].messageType === 'SUCCESS') {
                            CommonService.toastMessage("Course Approval", "Student Transfered Successfully");
                             self.searchFilterRequest();
                            self.formDlg.jqxWindow('close');

                        }
                    });
                })
                $('#courseIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0 && $("#sessionIdFilter").val() > 0) {
                        $("#courseIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_offered_courses/" + $("#departmentIdFilter").val()+"/"+$("#sessionIdFilter").val(), 'get', null, $("#courseIdFilter")).then(function (data) {
                            $("#courseIdFilter").jqxDropDownList('clear');

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

                $("#courseDistributionListFilter").on('click',function(){

                       self.searchFilterRequest();



                });
            }
        });
    };
    return CourseDistributionListService;
}());