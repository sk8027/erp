var CourseLectureAttendanceService = (function () {
    function CourseLectureAttendanceService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId", "lectureId"];
        this.lovMap = null;
        this.dataGrid = $("#courseLectureAttendanceTable");
        this.formDlg = $("#courseLectureAttendanceDlg");
        this.gridToolbar = $("#courseLectureAttendanceToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/lecture_attendance_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/lecture_attendance_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/lecture_attendance_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/lecture_attendance_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/lms/setup/lectures/basic/course-lecture.edit.jsp';
        this.title = "Lecture Attendance";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'lectureId', type: 'int', required:true, index:0},
            { name: 'enrollmentNo', type: 'string', required:true, index:0},
            { name: 'lectureName', type: 'string', required:false},
            { name: 'studentId', type: 'int', required:true, index:0},
            { name: 'studentName', type: 'string', required:false},
            { name: 'attendance', type: 'string', required:true, index:0},
            { name: 'present', type: 'boolean', required:true, index:0},
            { name: 'leave', type: 'boolean', required:true, index:0},
            { name: 'absent', type: 'boolean', required:true, index:0},
            { name: 'remarks', type: 'string', required:false},
        ];
    /********************** Save Form Record ******************************************/
    CourseLectureAttendanceService.prototype.save = function () {
        var self = this;
        var gridData = [];
        $.each(self.dataGrid.jqxGrid('getrows'),function(index,row){
            gridData.push(row);
        });
        CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(gridData),$("#courseLectureAttendance"))
            .then(function( responseData ) {
                if (responseData["dataHeader"].messageType === 'SUCCESS') {
                     CommonService.toastMessage(self.title,"Record Saved Successfully");

                }
            });
    };
     /********************** Clear Form Fields For Update******************************************/
    CourseLectureAttendanceService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };


    /********************** Delete Single Record showing in Popup ******************************************/
    CourseLectureAttendanceService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    CourseLectureAttendanceService.prototype.constructTable = function () {
        var self = this;
        var container = self.dataGrid;
        self.source = {
            datatype: 'json',
            datafields:  self.fields ,
            localdata : self.data,
            updaterow: function (rowid, rowdata, commit) {
                commit(true);
            },
            deleterow: function (rowid, commit) {
                commit(true);
            }
        };
        var container = self.dataGrid;
        var toolbar = self.gridToolbar;
        container.jqxGrid({
            width: '100%',
            source: new $.jqx.dataAdapter(self.source),

            columns: [
                { text: '', datafield: 'id',hidden:true},
                {text: '<b style="color:#32c5d2">Lecture</b>', datafield: 'lectureId', hidden:true },
                { text: '<b style="color:#32c5d2">Registration #</b>', datafield: 'enrollmentNo', width:'200px', editable:false},
                { text: '<b style="color:#32c5d2">Student</b>', datafield: 'studentId', hidden:true},
                { text: '<b style="color:#32c5d2">Name</b>', datafield: 'studentName', editable:false},
                { text: '<b style="color:#32c5d2">Attendance</b>', datafield: 'attendance', hidden:true},
                { text: '<b style="color:#32c5d2">Present</b>', datafield: 'present',columntype:'checkbox', width:'50px' },
                { text: '<b style="color:#32c5d2">Absent</b>', datafield: 'absent',columntype:'checkbox', width:'50px'},
                { text: '<b style="color:#32c5d2">Leave</b>', datafield: 'leave',columntype:'checkbox', width:'50px'},

                { text: '<b style="color:#32c5d2">Remarks</b>', datafield: 'remarks'},

            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('cellendedit', function (event)
        {
             var args = event.args;
            var lectureId = $("#courseLectureAttendance #lectureIdFilter").val();
             var dataField = event.args.datafield;
             if(dataField == "present" ){
                   if(args.value == true) {
                      container.jqxGrid('setcellvalue', event.args.rowindex, 'leave', false);
                      container.jqxGrid('setcellvalue', event.args.rowindex, 'absent', false);
                       container.jqxGrid('setcellvalue', event.args.rowindex, 'attendance', 'P');
                       container.jqxGrid('setcellvalue', event.args.rowindex, 'lectureId', lectureId);
                  }
             }else if(dataField == "leave" ){
                 if(args.value == true) {
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'present', false);
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'absent', false);
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'attendance', 'L');
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'lectureId', lectureId);
                 }
             }else if(dataField == "absent" ){
                 if(args.value == true) {
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'leave', false);
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'present', false);
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'attendance', 'A');
                     container.jqxGrid('setcellvalue', event.args.rowindex, 'lectureId', lectureId);
                 }
             }




        });
    }
    /********************** Load the table from Server ******************************************/
    CourseLectureAttendanceService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });

                $("#resourceIdFilter").on('open', function (event) {
                    var departmentId = $("#departmentIdFilter").val();
                    if(departmentId > 0) {
                        self.lovMap.resourceId = [];
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_employees/" + departmentId, 'get', null, $("#courseLectureAttendance")).then(function (data) {
                            self.lovMap.resourceId = data.data
                            $("#resourceIdFilter").jqxDropDownList('clear');
                            $.each(data.data, function (item, department) {
                                $("#resourceIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#resourceIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#lectureIdFilter").on('open', function (event) {
                    var sectionId = $("#courseSectionIdFilter").val();
                    if(sectionId > 0) {
                        self.lovMap.lectureId = [];
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/lecture_attendance_controller/get_lecture/" + sectionId, 'get', null, $("#courseLectureAttendance")).then(function (data) {
                            self.lovMap.lectureId = data.data
                            $("#lectureIdFilter").jqxDropDownList('clear');
                            $.each(data.data, function (item, lec) {
                                $("#lectureIdFilter").jqxDropDownList('addItem', {
                                    label: lec.label,
                                    value: lec.value
                                });
                            });
                        });
                    }else{
                        $("#lectureIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#courseSectionIdFilter").on('open', function (event) {
                    var sessionId = $("#sessionIdFilter").val();
                    var resourceId = $("#resourceIdFilter").val();
                    if(sessionId > 0 && resourceId > 0) {
                        self.lovMap.courseSectionId = [];
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_resource_courses/" + resourceId+"/"+ sessionId, 'get', null, $("#courseLectureAttendance")).then(function (data) {
                            $("#courseSectionIdFilter").jqxDropDownList('clear');
                            self.lovMap.courseSectionId = data.data;
                            var courseSectionData = [] ;
                            $.each(data.data, function (item, course) {
                                courseSectionData.push(course);

                            });
                             var source =
                                {
                                    datatype: "json",
                                    datafields: [
                                        { name: 'label' },
                                        { name: 'value' },
                                        { name: 'courseId' },
                                    ],

                                    localdata : courseSectionData
                                };
                            $("#courseSectionIdFilter").jqxDropDownList({
                                 source: new $.jqx.dataAdapter(source), displayMember: "label", valueMember: "value", width: '100%',
                                height: '34px',
                                filterable: 'true',
                                searchMode : 'containsignorecase',
                            });
                        })
                    }else{
                        $("#courseSectionIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#courseLectureAttendanceFilter").on('click',function(){
                    var courseSectionId = $("#courseSectionIdFilter").val();
                    var lectureId = $("#lectureIdFilter").val();
                    if( courseSectionId > 0 && lectureId > 0 ) {
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/lecture_attendance_controller/list/" + lectureId+"/"+ courseSectionId, 'get', null, $("#courseLectureAttendance")).then(function (data) {
                            self.dataGrid.jqxGrid('clearselection');
                            if(data.data.length > 0){
                                self.gridToolbar.find("#AllPresent").removeAttr("disabled");
                                self.gridToolbar.find("#AllAbsent").removeAttr("disabled");
                                self.gridToolbar.find("#AllLeave").removeAttr("disabled");
                                self.gridToolbar.find("#SaveBtn").removeAttr("disabled");
                            }else{
                                self.gridToolbar.find("#AllPresent").attr("disabled","disabled");
                                self.gridToolbar.find("#AllAbsent").attr("disabled","disabled");
                                self.gridToolbar.find("#AllLeave").attr("disabled","disabled");
                                self.gridToolbar.find("#SaveBtn").attr("disabled","disabled");

                            }
                            self.dataGrid.jqxGrid('source')._source.localdata = data.data;
                            self.dataGrid.jqxGrid('updatebounddata', 'cells');
                            self.dataGrid.jqxGrid('refresh');
                        });
                    }
                });
            }
            self.data = [];
            self.constructTable();

        });
    };
    CourseLectureAttendanceService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata', 'filter');
    }
    };
    return CourseLectureAttendanceService;
}());