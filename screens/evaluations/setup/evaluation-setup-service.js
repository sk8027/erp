var EvaluationSetupService = (function () {
    function EvaluationSetupService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId"];
        this.lovMap = null;
        this.dataGrid = $("#evaluationSetupTable");
        this.formDlg = $("#evaluationSetupDlg");
        this.gridToolbar = $("#evaluationSetupToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/evaluation_setup_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/evaluation_setup_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/evaluation_setup_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/evaluation_setup_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/evaluations/setup/evaluation-setup.edit.jsp';
        this.title = "Course Outline";
        this.populateForm = function (data, lovMap) {


            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            this.constructQuestionsTable(self, data.questions);
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            if(lovMap == undefined){
                $(this.dataForm.evaluationTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.evaluationTypeId), lovMap.evaluationTypeId);
            }
            if(data.evaluationTypeId === undefined || data.evaluationTypeId === null) {
                $(this.dataForm.evaluationTypeId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.evaluationTypeId).jqxDropDownList('selectIndex', $(this.dataForm.evaluationTypeId).jqxDropDownList('getItemByValue', data.evaluationTypeId).index);
            }
            $(this.dataForm.evaluationTypeName).val((data.evaluationTypeName === undefined || data.evaluationTypeName === null )? null : data.evaluationTypeName);
            $(this.dataForm.title).val((data.title === undefined || data.title === null )? null : data.title);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.marks).val((data.marks === undefined || data.marks === null )? null : data.marks);
             $(this.dataForm.openDate).val((data.openDate === undefined || data.openDate === null )? null : self.framework.FormatDate(new Date(data.openDate)));
            $(this.dataForm.deadline).val((data.deadline === undefined || data.deadline === null )? null : self.framework.FormatDate(new Date(data.deadline)));
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
            { name: 'evaluationTypeId', type: 'int' ,label :'Evaluation Type',gui:'list',labelAttribute:'evaluationTypeName'},
            { name: 'evaluationTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'title', type: 'string' ,label :'Type'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'marks', type: 'string' ,label :'Marks'},
            { name: 'courseSectionId', type: 'int' ,label :'Section',gui:'hidden'},
             { name: 'openDate', type: 'string' ,label :'Open Date'},
            { name: 'deadline', type: 'string' ,label :'Deadline'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'}

        ]

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    EvaluationSetupService.prototype.save = function () {

        var self = this;
        var isValid = false;

        isValid = this.framework.validateForm(this.formDlg);


        var formData = {};
        if(isValid) {
            var totalMarks = parseInt($("#evaluationSetupDlg [formControlName='marks']").val());
            if (this.framework.aggregateValue($("#questionsTable"), "questionMarks") != totalMarks) {
                CommonService.toastError("Evaluation Setup", "Total Marks of every question should be equal to Evaluation Marks");
            } else {
                formData = this.framework.GetFormData(this);
                formData.questions = $("#questionsTable").jqxGrid("getrows");
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

            }
        }


    };
    /********************** New Record******************************************/
    EvaluationSetupService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    EvaluationSetupService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    EvaluationSetupService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        var courseSectionId = $("#courseSectionIdFilter").val();
        if(courseSectionId > 0) {
            var sessionId = $("#sessionIdFilter").val();
            $.get(this.formURL + "?courseSection=" + courseSectionId, "&session=" + sessionId).done(function (data) {

                self.formDlg.find(".modal-body").html(data);
                self.formDlg.find(".dlg-content").html(data);
                self.formDlg.jqxWindow('open');

                // Populating the Form data
                if (id === undefined || id === null) {
                    id = -1;
                }

                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/evaluation_setup_controller/find_by_id/' + id + "/" + courseSectionId, 'get', null, $(".form-body")).done(function (data) {
                    if (CURRENT_USER.APP_CONFIG.OBE_ENABLED == "true" && data.data != null && data.data.id > 0) {
                        self.lovMap = data.lovMap;
                    }
                    self.populateForm(data.data, self.lovMap);
                });
                $("#questionsToolbar").find("button").click(function () {
                    if (this.id === "AddRowBtn") {

                        $("#questionsTable").jqxGrid('addrow', null, {evaluationId: $(self.dataForm.id).val()});
                    } else if (this.id === "DeleteRowBtn") {
                        HtmlHelper.ConfirmationDialog("rowsDeleteDlg", "Outline Content", "Are You sure you want to Delete?", "D", function () {
                            var ids = [];
                            $.each($("#questionsTable").jqxGrid('getselectedrowindexes'), function (index, row) {
                                ids.push($("#questionsTable").jqxGrid('getrowid', row));
                            });

                            if (ids.length > 0) {
                                $("#questionsTable").jqxGrid('clearselection');
                                $("#questionsTable").jqxGrid('deleterow', ids);
                            }

                        });
                    }
                });
            });
        }
    };

    /********************** Deleted Selected Rows from table ******************************************/
    EvaluationSetupService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    EvaluationSetupService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    EvaluationSetupService.prototype.constructQuestionsTable = function (service, tableData) {
        if(tableData == undefined){
            tableData = []
        }
        var self = this;
        var container = $("#questionsTable");
        container.jqxGrid({
            width: '100%',
            height:'200',
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields:  [
                        { name: 'id', type: 'int', required:false},
                        { name: 'evaluationId', type: 'int', required:true, index:0},
                        { name: 'evaluationName', type: 'string', required:false},
                        { name: 'question', type: 'string', required:true, index:0},
                        { name: 'questionNo', type: 'int', required:true, index:0},
                        { name: 'outlineId', type: 'int', required:true, index:0},
                        { name: 'outlineName', type: 'string', required:false},
                        { name: 'questionMarks', type: 'int', required:false}

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
                { text: '', datafield: 'evaluationId',hidden:true},
                { text: '<b style="color:#32c5d2">Question #</b>', datafield: 'questionNo', validation: function (cell, value) {
                        if (value > 0 ) {
                            return true;
                        }
                        return { result: false, message: "This is a mandatory field" };
                    }
                },
                { text: '<b style="color:#32c5d2">Question</b>', datafield: 'question', validation: function (cell, value) {
                        if (value.trim().length == 0 ) {
                            return { result: false, message: "This is a mandatory field" };
                        }
                        return true;
                    }},

                {text: '<b style="color:#32c5d2">Outline</b>', datafield: 'outlineId', validation: function (cell, value) {
                        if (value.value > 0 ) {
                            return true;
                        }
                        return { result: false, message: "This is a mandatory field" };
                    },
                    width:'10%',
                    displayfield: 'outlineName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.outlineId);

                    }
                },
                { text: '<b style="color:#32c5d2">Marks</b>', datafield: 'questionMarks', validation: function (cell, value) {
                        if (value > 0 ) {
                            return true;
                        }
                        return { result: false, message: "This is a mandatory field" };
                    }
                }

            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });

        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#questionsToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#questionsToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#questionsToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });

    }
    /********************** Load the table from Server ******************************************/
    EvaluationSetupService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL+"/-1").done(function (data) {
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
                $("#evaluationSetupFilter").on('click',function(){
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
    EvaluationSetupService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata','filter');

    };
    return EvaluationSetupService;
}());