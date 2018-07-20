var ProgramPloService = (function () {
    function ProgramPloService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["programId","batchId"];
        this.lovMap = null;
        this.dataGrid = $("#programPloTable");
        this.formDlg = $("#programPloDlg");
        this.gridToolbar = $("#programPloToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/plo_controller/list';
        this.deleteURL = CONTEXT_PATH + '/app/plo_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/plo_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/plo_controller/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/obe/plo/plo.edit.jsp';
        this.title = "Program Plo";
        this.populateForm = function (data, lovMap) {
            var self = this;
            if(data === null || data === undefined){
                data = {};
            }
            this.constructCourseTable(self, data.courses, lovMap.courses);

            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);


            $(this.dataForm.programName).val((data.programName === undefined || data.programName === null )? null : data.programName);
            $(this.dataForm.ploName).val((data.ploName === undefined || data.ploName === null )? null : data.ploName);
            $(this.dataForm.ploDescription).val((data.ploDescription === undefined || data.ploDescription === null )? null : data.ploDescription);
            $(this.dataForm.weightage).val((data.weightage === undefined || data.weightage === null )? null : data.weightage);
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
            { name: 'programId', type: 'int' ,label :'Program',gui:'hidden'},

            { name: 'batchId', type: 'int' ,label :'Batch',gui:'hidden'},

            { name: 'ploName', type: 'string' ,label :'Name'},
            { name: 'ploDescription', type: 'string' ,label :'Description'},
            { name: 'weightage', type: 'string' ,label :'Weightage'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ProgramPloService.prototype.save = function () {
        $(".page-message-area").html('');
        var sum = this.framework.aggregateValue(this.dataGrid,"weightage");
        if($("[formControlName='id']").val()>0){
            var currentRowWeightage = 0;
            var rowData = this.dataGrid.jqxGrid('getrows');
            for(idx =0 ;idx<rowData.length ; idx++){
                if(rowData[idx].id == $("[formControlName='id']").val()){
                    currentRowWeightage = rowData[idx].weightage;
                    break;
                }
            };

        }
        var weightage = $("[formControlName='weightage']").val();
        if(isNaN(weightage)){
            weightage = 0;
        }else{
            weightage = parseInt(weightage);
        }
        if(sum + weightage > 100){
            CommonService.errorMessage("Weightage Error", "Total PLO weightage Exceeding 100%, please adjust all weightages within 100%");
        }else{
            var service = this;

            var isValid = service.framework.validateForm(service.formDlg);
             var formData = {};
            if(isValid) {
                formData = service.framework.GetFormData(service);
                formData.courses = $("#coursesTable").jqxGrid("getrows");
                CommonService.sendAjaxRequest(service.saveURL,'post',JSON.stringify(formData),service.formDlg)
                    .then(function( responseData ) {
                        if (responseData["dataHeader"].messageType === 'SUCCESS') {
                            CommonService.toastMessage(self.title,"Record Saved Successfully");
                            service.formDlg.jqxWindow('close');

                            if(formData.id > 0){
                                service.dataGrid.jqxGrid('gotopage', service.dataGrid.jqxGrid('getpaginginformation').pagenum);

                            }else{
                                service.dataGrid.jqxGrid('gotopage', service.dataGrid.jqxGrid('getpaginginformation').pagescount -1);
                            }

                            service.dataGrid.jqxGrid('updatebounddata','cell');
                        }
                    });
            }
        }


    };
    /********************** New Record******************************************/
    ProgramPloService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    ProgramPloService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    ProgramPloService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success

        $.get(this.formURL+"?program="+$("#programIdFilter").val()+"&batch="+$("#batchIdFilter").val()).done(function (data) {
            self.formDlg.find("span#dlgTitle").html("Program Learning Objectives For '" + $("#programIdFilter").jqxDropDownList('getSelectedItem').label+"'");
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }

                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/plo_controller/find_by_id/' + id+"/"+$("#batchIdFilter").val(), 'get', null, $(".form-body"))
                 .done(function (data) {

                    self.populateForm(data.data,data.lovMap);
                });
            $("#coursesToolbar").find("button").click(function () {
                if(this.id === "AddRowBtn"){
                    debugger;
                    $("#coursesTable").jqxGrid('addrow', null, {ploId : $(self.dataForm.id).val()});
                }else if(this.id === "DeleteRowBtn"){
                    HtmlHelper.ConfirmationDialog("rowsDeleteDlg", "PLO Courses", "Are You sure you want to Delete?", "D", function () {
                        var ids = [];
                        $.each($("#coursesTable").jqxGrid('getselectedrowindexes'),function(index,row){
                            ids.push($("#coursesTable").jqxGrid('getrowid', row));
                        });

                            if(ids.length > 0) {
                                $("#coursesTable").jqxGrid('clearselection');
                                $("#coursesTable").jqxGrid('deleterow', ids);
                            }

                    });
                }
            });
             });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ProgramPloService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ProgramPloService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    /*********************** Load Courses table************************************************/
    ProgramPloService.prototype.constructCourseTable = function (service, tableData, courseLov) {
        if(tableData == undefined){
            tableData = []
        }
        var self = this;
        var container = $("#coursesTable");
        container.jqxGrid({
            width: '100%',
            height:'200',
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields:  [
                        { name: 'id', type: 'int', required:false},
                        { name: 'courseId', type: 'int', required:false},
                        { name: 'courseName', type: 'string', required:false},
                        { name: 'ploId', type: 'int', required:true, index:4},
                        { name: 'weightage', type: 'int', required:false}
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
                { text: '', datafield: 'ploId',hidden:true},
                {text: '<b style="color:#32c5d2">Course</b>', datafield: 'courseId',

                    displayfield: 'courseName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        service.framework.GenerateGridDropDownList(editor, courseLov);


                    },
                    validation: function (cell, value) {
                        var rowData = $("#coursesTable").jqxGrid('getrows');
                        var valid = true;
                        for(idx =0 ;idx<rowData.length ; idx++){
                            if(rowData[idx].courseId == value.value){
                                valid = false;
                                break;
                            }
                        };

                        if (!valid) {

                            return { result: false, message: "Course Already Exist" };
                        }
                        return true;
                    }
                },

                { text: '<b style="color:#32c5d2">Weightages</b>', datafield: 'weightage'}




            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });

        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#coursesToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#coursesToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#coursesToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });

    }
    /********************** Load the table from Server ******************************************/
    ProgramPloService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $('#programIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0) {
                        $("#programIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_programs/" + $("#departmentIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {


                            $.each(data.data, function (item, department) {
                                $("#programIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#programIdFilter").jqxDropDownList('clear');

                    }
                });
                $('#batchIdFilter').on('open', function (event) {
                    if($("#programIdFilter").val() > 0) {
                        $("#batchIdFilter").jqxDropDownList('clear');
                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_batches/" + $("#programIdFilter").val(), 'get', null, $("#studySchemeTable")).then(function (data) {
                            $.each(data.data, function (item, lov) {
                                $("#batchIdFilter").jqxDropDownList('addItem', {
                                    label: lov.label,
                                    value: lov.value
                                });
                            });
                        })
                    }else{
                        $("#batchIdFilter").jqxDropDownList('clear');

                    }
                });
                $("#ploFilter").on('click',function(){
                    if( $("#programIdFilter").val() > 0 && $("#batchIdFilter").val() > 0 ) {
                        self.gridToolbar.find("#AddBtn").removeAttr("disabled");
                        self.gridToolbar.find("#RefreshBtn").removeAttr("disabled");
                        $.each(self.filterFields,function(index,item){
                            var filter =   new $.jqx.filter();
                            filter.addfilter(0, filter.createfilter('numericfilter', $("#"+item+"Filter").val(), "EQUAL"));
                            self.dataGrid.jqxGrid('addfilter', item, filter);
                        });

                        self.dataGrid.jqxGrid('applyfilters');
                    }
                });
            }
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-350);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '700px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });


        });
    };
    ProgramPloService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return ProgramPloService;
}());
