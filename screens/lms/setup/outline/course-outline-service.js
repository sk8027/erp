var CourseOutlineService = (function () {
    function CourseOutlineService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId"];
        this.lovMap = null;
        this.dataGrid = $("#courseOutlineTable");
        this.formDlg = $("#courseOutlineDlg");
        this.gridToolbar = $("#courseOutlineToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_outline_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_outline_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_outline_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_outline_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/lms/setup/outline/course-outline.edit.jsp';
        this.title = "Course Outline";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
debugger;
            var self = this;
            this.constructOutlinesTable(self, data.outlines);
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);


            $(this.dataForm.outlineTitle).val((data.outlineTitle === undefined || data.outlineTitle === null )? null : data.outlineTitle);
            $(this.dataForm.learningOutcome).val((data.learningOutcome === undefined || data.learningOutcome === null )? null : data.learningOutcome);
            if(CURRENT_USER.APP_CONFIG.OBE_ENABLED == "true") {
                if (lovMap == undefined) {
                    $(this.dataForm.cloId).jqxDropDownList('clearSelection');
                } else {
                    this.framework.GenerateDropDownList($(this.dataForm.cloId), lovMap.cloId);
                }
                if (data.cloId === undefined || data.cloId === null) {
                    $(this.dataForm.cloId).jqxDropDownList('clearSelection');
                } else {
                    $(this.dataForm.cloId).jqxDropDownList('selectIndex', $(this.dataForm.cloId).jqxDropDownList('getItemByValue', data.cloId).index);
                }
                $(this.dataForm.cloName).val((data.cloName === undefined || data.cloName === null) ? null : data.cloName);
                $(this.dataForm.weightage).val((data.weightage === undefined || data.weightage === null )? null : data.weightage);
            }
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
            { name: 'outlineTitle', type: 'string' ,label :'Title'}

            ];
        if(CURRENT_USER.APP_CONFIG.OBE_ENABLED == "true"){
            this.fields.push({ name: 'cloId', type: 'string' ,label :'Learning Objective Id',gui:'hidden'});
            this.fields.push({ name: 'cloName', type: 'string' ,label :'Learning Objective'});
            this.fields.push({ name: 'weightage', type: 'int' ,label :'Weightage'});

        }

        this.fields.push({ name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'});
        this.fields.push({ name: 'statusName', type: 'string' ,label :'Status', gui:'skip'});
        this.fields.push({ name: 'statusName', type: 'string' ,label :'', gui:'skip'});


        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseOutlineService.prototype.save = function () {
        var self = this;
        var isValid = false;
        if(CURRENT_USER.APP_CONFIG.OBE_ENABLED == "true") {
                 isValid = this.framework.validateForm(this.formDlg);


            var formData = {};
            if(isValid) {
                if($(this.dataForm.cloId).val() >0 ) {
                    $(this.dataForm.cloId).css('border-color', '');

                    formData = this.framework.GetFormData(this);
                    formData.outlines = $("#outlinesTable").jqxGrid("getrows");
                    CommonService.sendAjaxRequest(this.saveURL, 'post', JSON.stringify(formData), this.formDlg)
                        .then(function (responseData) {
                            if (responseData["dataHeader"].messageType === 'SUCCESS') {
                                CommonService.toastMessage(self.title, "Record Saved Successfully");
                                self.formDlg.jqxWindow('close');

                                if (formData.id > 0) {
                                    self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagenum);

                                } else {
                                    self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagescount - 1);
                                }

                                self.dataGrid.jqxGrid('updatebounddata', 'cell');
                            }
                        });
                }else{
                    $(this.dataForm.cloId).css('border-color','red');
                    CommonService.errorMessage("Validation Error","Required Fields Are Missing");
                }
            }
        }else{
            this.framework.SaveForm(this);
        }

    };
    /********************** New Record******************************************/
    CourseOutlineService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseOutlineService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseOutlineService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        var courseSectionId = $("#courseSectionIdFilter").val();
        var sessionId = $("#sessionIdFilter").val();
        $.get(this.formURL+"?courseSection="+courseSectionId,"&session="+sessionId).done(function (data) {

            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            $(self.dataForm.cloId).on('open', function (event) {
                var courseId = $("#courseSectionIdFilter").jqxDropDownList('getSelectedItem');
                if(courseId != null && courseId != undefined){
                    courseId = courseId.originalItem.courseId;
                }
                var sessionId = $("#sessionIdFilter").val();
                if(courseId > 0 && sessionId > 0) {
                    self.lovMap.cloId = [];
                    CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_clo/" + courseId+"/"+sessionId, 'get', null, $("#courseOutlineDlg")).then(function (data) {
                        self.lovMap.cloId = data.data
                        $(self.dataForm.cloId).jqxDropDownList('clear');
                        $.each(data.data, function (item, department) {
                            $(self.dataForm.cloId).jqxDropDownList('addItem', {
                                label: department.label,
                                value: department.value

                            });
                        });
                    })
                }else{
                    $(self.dataForm.cloId).jqxDropDownList('clear');

                }
            });
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_outline_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                if(CURRENT_USER.APP_CONFIG.OBE_ENABLED == "true" && data.data != null && data.data.id > 0) {
                    self.lovMap.cloId = data.lovMap.cloId;
                }
                self.populateForm(data.data,self.lovMap);
            });
            $("#outlinesToolbar").find("button").click(function () {
                if(this.id === "AddRowBtn"){
                    
                    $("#outlinesTable").jqxGrid('addrow', null, {ploId : $(self.dataForm.id).val()});
                }else if(this.id === "DeleteRowBtn"){
                    HtmlHelper.ConfirmationDialog("rowsDeleteDlg", "Outline Content", "Are You sure you want to Delete?", "D", function () {
                        var ids = [];
                        $.each($("#outlinesTable").jqxGrid('getselectedrowindexes'),function(index,row){
                            ids.push($("#outlinesTable").jqxGrid('getrowid', row));
                        });

                        if(ids.length > 0) {
                            $("#outlinesTable").jqxGrid('clearselection');
                            $("#outlinesTable").jqxGrid('deleterow', ids);
                        }

                    });
                }
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseOutlineService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseOutlineService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    CourseOutlineService.prototype.constructOutlinesTable = function (service, tableData) {
        if(tableData == undefined){
            tableData = []
        }
        var self = this;
        var container = $("#outlinesTable");
        container.jqxGrid({
            width: '100%',
            height:'200',
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields:  [
                        { name: 'id', type: 'int', required:false},
                        { name: 'outlineId', type: 'int', required:false},
                         { name: 'outline', type: 'string', required:true}
                    ] ,
                    localdata : tableData,
                    updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    },
                    deleterow: function (rowid, commit) {
                        commit(true);
                    }
                }
            ),

            columns: [
                { text: '', datafield: 'id',hidden:true},
                { text: '', datafield: 'outlineId',hidden:true},
                 { text: '<b style="color:#32c5d2">Outline</b>', datafield: 'outline',width:'96%'}




            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });

        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#outlinesToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#outlinesToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#outlinesToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });

    }
    /********************** Load the table from Server ******************************************/
    CourseOutlineService.prototype.loadTable = function () {
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
                $("#courseOutlineFilter").on('click',function(){
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
                showCollapseButton: true, height: '600px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    CourseOutlineService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata','filter');

    };
    return CourseOutlineService;
}());