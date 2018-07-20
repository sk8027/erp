var EvaluationRecordService = (function () {
    function EvaluationRecordService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId","evaluationId"];
        this.lovMap = null;
        this.dataGrid = $("#evaluationRecordTable");
        this.formDlg = $("#evaluationRecordDlg");
        this.gridToolbar = $("#evaluationRecordToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/evaluation_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/evaluation_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/evaluation_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/evaluation_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/evaluations/setup/evaluation-setup.edit.jsp';
        this.title = "Course Outline";
        this.populateForm = function (data, lovMap) {


        }
        /********************** Table Fields ******************************************/

        /********************** Editable Popup Form Fields ******************************************/
        //this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    EvaluationRecordService.prototype.save = function () {


        var self = this;
        var courseSectionId = $("#courseSectionIdFilter").val();
        var evaluationId = $("#evaluationIdFilter").val();
                var evaluationData = $("#evaluationRecordTable").jqxGrid("getrows");
                CommonService.sendAjaxRequest(this.saveURL+"/"+evaluationId+"/"+courseSectionId, 'post', JSON.stringify(evaluationData), this.formDlg)
                    .then(function (responseData) {
                        debugger;
                        if (responseData["dataHeader"].messageType === 'SUCCESS') {
                            CommonService.toastMessage(self.title, "Marks saved for '"+$("#evaluationIdFilter").jqxDropDownList('getSelectedItem').label+"'");
                            $("#evaluationIdFilter").jqxDropDownList('clearSelection');

                            $("#evaluationRecordToolbar").hide();
                            $("#evaluationRecordTableDiv").hide();
                        }
                    });



    };
    /********************** New Record******************************************/
    EvaluationRecordService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    EvaluationRecordService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    EvaluationRecordService.prototype.getById = function (id) {

    };

    /********************** Deleted Selected Rows from table ******************************************/
    EvaluationRecordService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    EvaluationRecordService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    EvaluationRecordService.prototype.constructTable = function (service, tableData) {
        $("#evaluationRecordToolbar #SaveBtn").removeAttr("disabled");

        var fields =  [
            { name: 'id', type: 'int', required:false},
            { name: 'studentId', type: 'int', required:true, index:0},
            { name: 'enrollmentNo', type: 'int', required:true, index:0},
            { name: 'studentName', type: 'string', required:false}];


        var columns = [
            { text: '', datafield: 'id',hidden:true},
            { text: '<b style="color:#32c5d2">studentId</b>', datafield: 'studentId', hidden:true  },
            { text: '<b style="color:#32c5d2">Enrollment #</b>', datafield: 'enrollmentNo', editable:false ,width:'200px' },
            { text: '<b style="color:#32c5d2">Name</b>', datafield: 'studentName'  , editable:false}


        ];
        $.each(Object.keys(tableData[0]),function(index,item){
            if(item.startsWith("Q") && !item.endsWith("total")){
                fields.push({ name: item, type: 'float'});
                fields.push({ name: item+"_total", type: 'float'});
                columns.push({ text: '<b style="color:#32c5d2">Q # '+item.split("_")[1]+" (" +tableData[0][item+"_total"]+') </b>', datafield: item,cellsformat :'d' ,width:'75px',
                    validation: function (cell, value) {
                        var totalMarks = parseFloat($("#evaluationRecordTable").jqxGrid('getcellvalue',cell.row,cell.datafield+'_total'));
                        if (parseFloat(value) > totalMarks) {
                            return { result: false, message: "Maximum marks for this qustion is "+ totalMarks };
                        }
                        return true;
                    }
                });
                columns.push({ text: '<b style="color:#32c5d2">Total Q # '+item.split("_")[1]+'</b>', datafield: item+"_total",cellsformat :'d'  ,hidden:true});
            }
        });
        var self = this;
        var container = $("#evaluationRecordTable");
        container.jqxGrid({
            width: '100%',
            height:'600',
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields: fields,
                    localdata : tableData,
                    updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    },
                    deleterow: function (rowid, commit) {
                        commit(true);
                    }
                }
            ),

            columns: columns,
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });


    }
    /********************** Load the table from Server ******************************************/
    EvaluationRecordService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL+"/-1").done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#evaluationIdFilter").on('open', function (event) {
                    var courseSectionId = $("#courseSectionIdFilter").val();

                    if(courseSectionId > 0) {

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/evaluation_controller/get_evaluations/" + courseSectionId, 'get', null, $("#evaluationRecord")).then(function (data) {

                            $("#evaluationIdFilter").jqxDropDownList('clear');
                            $.each(data.data, function (item, department) {
                                $("#evaluationIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#evaluationIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#resourceIdFilter").on('open', function (event) {
                    var departmentId = $("#departmentIdFilter").val();

                    if(departmentId > 0) {

                        self.lovMap.resourceId = [];
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_employees/" + departmentId, 'get', null, $("#evaluationRecord")).then(function (data) {
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


                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_resource_courses/" + resourceId+"/"+ sessionId, 'get', null, $("#evaluationRecord")).then(function (data) {
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
                $("#evaluationRecordFilter").on('click',function(){
                    var courseSectionId = $("#courseSectionIdFilter").val();
                    var evaluationId = $("#evaluationIdFilter").val();
                    if( courseSectionId > 0 && evaluationId > 0 ) {
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/evaluation_controller/list/" + evaluationId+"/"+ courseSectionId, 'get', null, $("#evaluationRecord")).then(function (data) {
                            debugger;
                            if(data.data.length ==0){
                                $("#evaluationRecordToolbar").hide();
                                $("#evaluationRecordTableDiv").hide();
                                CommonService.toastError("Student Evaluation", "No Questions Defined For '" +$("#evaluationIdFilter").jqxDropDownList('getSelectedItem').label+"'");
                            }else{
                                $("#evaluationRecordToolbar").show();
                                $("#evaluationRecordTableDiv").show();
                                self.constructTable(self, data.data);
                            }

                        });
                    }
                });
            }

        });
    };
    EvaluationRecordService.prototype.refresh = function () {
        this.dataGrid.jqxGrid('updatebounddata','filter');

    };
    return EvaluationRecordService;
}());