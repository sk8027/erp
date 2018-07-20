var ProgramPeoService = (function () {
    function ProgramPeoService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["programId","batchId"];
        this.lovMap = null;
        this.dataGrid = $("#programPeoTable");
        this.formDlg = $("#programPeoDlg");
        this.gridToolbar = $("#programPeoToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/peo_controller/list';
        this.deleteURL = CONTEXT_PATH + '/app/peo_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/peo_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/peo_controller/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/obe/peo/peo.edit.jsp';
        this.title = "Program Peo";
        this.populateForm = function (data, lovMap) {
            var self = this;
            if(data === null || data === undefined){
                data = {};
            }
            this.constructPloTable(self, data.plos, lovMap.plos);

            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);


            $(this.dataForm.programName).val((data.programName === undefined || data.programName === null )? null : data.programName);
            $(this.dataForm.peoName).val((data.peoName === undefined || data.peoName === null )? null : data.peoName);
            $(this.dataForm.peoDescription).val((data.peoDescription === undefined || data.peoDescription === null )? null : data.peoDescription);
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

            { name: 'peoName', type: 'string' ,label :'Name'},
            { name: 'peoDescription', type: 'string' ,label :'Description'},
            { name: 'weightage', type: 'string' ,label :'Weightage'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ProgramPeoService.prototype.save = function () {
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
                formData.plos = $("#plosTable").jqxGrid("getrows");
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
    ProgramPeoService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    ProgramPeoService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    ProgramPeoService.prototype.getById = function (id) {
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

                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/peo_controller/find_by_id/' + id+"/"+$("#batchIdFilter").val(), 'get', null, $(".form-body"))
                 .done(function (data) {

                    self.populateForm(data.data,data.lovMap);
                });
            $("#plosToolbar").find("button").click(function () {
                if(this.id === "AddRowBtn"){
                    debugger;
                    $("#plosTable").jqxGrid('addrow', null, {peoId : $(self.dataForm.id).val()});
                }else if(this.id === "DeleteRowBtn"){
                    HtmlHelper.ConfirmationDialog("rowsDeleteDlg", "Learning Objective", "Are You sure you want to Delete?", "D", function () {
                        var ids = [];
                        $.each($("#plosTable").jqxGrid('getselectedrowindexes'),function(index,row){
                            ids.push($("#plosTable").jqxGrid('getrowid', row));
                        });

                            if(ids.length > 0) {
                                $("#plosTable").jqxGrid('clearselection');
                                $("#plosTable").jqxGrid('deleterow', ids);
                            }

                    });
                }
            });
             });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ProgramPeoService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ProgramPeoService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };
    /*********************** Load Courses table************************************************/
    ProgramPeoService.prototype.constructPloTable = function (service, tableData, ploLov) {
        if(tableData == undefined){
            tableData = []
        }
        var self = this;
        var container = $("#plosTable");
        container.jqxGrid({
            width: '100%',
            height:'200',
            source: new $.jqx.dataAdapter(
                {
                    datatype: 'json',
                    datafields:  [
                        { name: 'id', type: 'int', required:false},
                        { name: 'ploId', type: 'int', required:false},
                        { name: 'ploName', type: 'string', required:false},
                        { name: 'peoId', type: 'int', required:true, index:4},
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
                { text: '', datafield: 'peoId',hidden:true},
                {text: '<b style="color:#32c5d2">PLO</b>', datafield: 'ploId',

                    displayfield: 'ploName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        service.framework.GenerateGridDropDownList(editor, ploLov);


                    },
                    validation: function (cell, value) {
                        var rowData = $("#plosTable").jqxGrid('getrows');
                        var valid = true;
                        for(idx =0 ;idx<rowData.length ; idx++){
                            if(rowData[idx].ploId == value.value){
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
                $("#plosToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#plosToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#plosToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });

    }
    /********************** Load the table from Server ******************************************/
    ProgramPeoService.prototype.loadTable = function () {
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
                $("#peoFilter").on('click',function(){
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
    ProgramPeoService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return ProgramPeoService;
}());
