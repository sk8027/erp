var CourseAnnouncementService = (function () {
    function CourseAnnouncementService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId"];
        this.lovMap = null;
        this.dataGrid = $("#courseAnnouncementTable");
        this.formDlg = $("#courseAnnouncementDlg");
        this.gridToolbar = $("#courseAnnouncementToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_announcement_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_announcement_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_announcement_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_announcement_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/lms/setup/announcements/course-announcements.edit.jsp';
        this.title = "Course Announcement";
        this.populateForm = function (data, lovMap) {
            debugger;
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);

            $(this.dataForm.title).val((data.title === undefined || data.title === null )? null : data.title);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description.replace(/\"/g,"&quot;"));
            $(this.dataForm.announcementDate).val((data.announcementDate === undefined || data.announcementDate === null )? null : self.framework.FormatDate(new Date(data.announcementDate)));
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
            { name: 'courseSectionId', type: 'int' ,label :'Course Section',gui:'hidden'},
            { name: 'courseSectionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'title', type: 'string' ,label :'Title'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'announcementDate', type: 'date' ,gui:'date' ,label :'Date'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseAnnouncementService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CourseAnnouncementService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseAnnouncementService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseAnnouncementService.prototype.getById = function (id) {
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
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_announcement_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseAnnouncementService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseAnnouncementService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseAnnouncementService.prototype.loadTable = function () {
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
                            $("#resourceIdFilter").jqxDropDownList('clear');
                            self.lovMap.resourceId = data.data

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
                            $.each(data.data, function (item, department) {
                                $("#courseSectionIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#courseSectionIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#courseAnnouncementFilter").on('click',function(){
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
    CourseAnnouncementService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CourseAnnouncementService;
}());