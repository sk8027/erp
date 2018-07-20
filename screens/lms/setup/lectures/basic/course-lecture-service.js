var CourseLectureService = (function () {
    function CourseLectureService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId"];
        this.lovMap = null;
        this.dataGrid = $("#courseLectureTable");
        this.formDlg = $("#courseLectureDlg");
        this.gridToolbar = $("#courseLectureToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_lecture_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_lecture_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_lecture_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_lecture_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/lms/setup/lectures/basic/course-lecture.edit.jsp';
        this.title = "Course Lecture";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.lectureNo).val((data.lectureNo === undefined || data.lectureNo === null )? null : data.lectureNo);

            $(this.dataForm.lectureDate).val((data.lectureDate === undefined || data.lectureDate === null )? null : self.framework.FormatDateTime(new Date(data.lectureDate)));
            $(this.dataForm.roomNo).val((data.roomNo === undefined || data.roomNo === null )? null : data.roomNo);

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
            { name: 'lectureNo', type: 'string' ,label :'Lecture #'},
            { name: 'courseSectionId', type: 'int' ,label :'Course Section',gui:'hidden'},
            { name: 'courseSectionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'lectureDate', type: 'date' ,label :'Lecture Date', gui:'datetime'},
            { name: 'roomNo', type: 'string' ,label :'roomNo'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'}
            ];



        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseLectureService.prototype.save = function () {

        var isValid = this.framework.validateForm(this.formDlg);
        var formData = {};
        if(isValid) {
            formData = this.framework.GetFormData(this);
            var contents = $("#courseLectureDlg #contents").jqxListBox('getCheckedItems');
            var contentList = [];
            if(contents.length >0){
                $.each(contents,function (index,item) {
                    contentList.push({id:item.originalItem.outlineDetailId});
                });
                formData.contents = contentList;
            }
            var self = this;
            CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(formData),this.formDlg)
                .then(function( responseData ) {
                     if (responseData["dataHeader"].messageType === 'SUCCESS') {
                         self.formDlg.jqxWindow('close');

                         CommonService.toastMessage(self.title,"Record Saved Successfully");
                        if(formData.id > 0){
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagenum);

                        }else{
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagescount -1);
                        }

                        self.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        }


    };
    /********************** New Record******************************************/
    CourseLectureService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseLectureService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseLectureService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        var courseSectionId = $("#courseSectionIdFilter").val();
        var sessionId = $("#sessionIdFilter").val();
        $.get(this.formURL+"?courseSection="+courseSectionId,"&session="+sessionId).done(function (data) {

            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');

            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_lecture_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {

                self.populateForm(data.data,self.lovMap);
                if(data.data == null) {
                    data.data = {contents:[]};
                }
                var source =
                    {

                        datatype: "json",
                        datafields: [
                            {name: 'lectureId'},
                            {name: 'outlineDetailId'},
                            {name: 'outline'},
                            {name: 'disabled'},
                            { name: "checked" }
                        ],
                        id: 'outlineDetailId',
                        localdata: JSON.stringify(data.data.contents)
                    };

                $("#courseLectureDlg #contents").jqxListBox({
                    theme: JQXTHEME,
                    source: new $.jqx.dataAdapter(source),
                    displayMember: "outline",
                    valueMember: "outlineDetailId",
                    width: '100%',
                    height: 200,
                    checkboxes: true,
                    filterable:true,
                    searchMode:'contains',
                    renderer: function (index, label, value) {
                          var item = $(this.element).jqxListBox('getItem', index );

                        if(item.disabled){
                           label = "<span style='color:red'>"+label+"</span>";
                        }
                        return label;
                    }
                });
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseLectureService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseLectureService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseLectureService.prototype.loadTable = function () {
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
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_employees/" + departmentId, 'get', null, $("#courseBook")).then(function (data) {
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
                $("#courseSectionIdFilter").on('open', function (event) {
                    var sessionId = $("#sessionIdFilter").val();
                    var resourceId = $("#resourceIdFilter").val();
                    if(sessionId > 0 && resourceId > 0) {
                        self.lovMap.courseSectionId = [];


                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_resource_courses/" + resourceId+"/"+ sessionId, 'get', null, $("#courseBook")).then(function (data) {
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
                $("#courseLectureFilter").on('click',function(){
                    var courseSectionId = $("#courseSectionIdFilter").val();
                    var sessionId = $("#sessionIdFilter").val();
                    if( courseSectionId > 0 && sessionId > 0 ) {
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
    CourseLectureService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata','filter');

    };
    return CourseLectureService;
}());