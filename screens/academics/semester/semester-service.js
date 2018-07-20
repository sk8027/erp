var SemesterService = (function () {
    function SemesterService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["programId","batchId"];
        this.lovMap = null;
        this.dataGrid = $("#semesterTable");
        this.formDlg = $("#semesterDlg");
        this.gridToolbar = $("#semesterToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/semester_controller/list';
        this.deleteURL =  CONTEXT_PATH + '/app/semester_controller/delete';
        this.saveURL =  CONTEXT_PATH + '/app/semester_controller/save';
        this.lovURL =  CONTEXT_PATH + '/app/semester_controller/refresh_page_lov';
        this.formURL =  CONTEXT_PATH + '/screens/academics/semester/semester.edit.jsp';
        this.title = "Semester";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.batchName).val((data.batchName === undefined || data.batchName === null )? null : data.batchName);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.semesterNo).val((data.semesterNo === undefined || data.semesterNo === null )? null : data.semesterNo);
            this.framework.GenerateDropDownList($(this.dataForm.academicSessionId), lovMap.academicSessionId);
            if(data.academicSessionId === undefined || data.academicSessionId === null) {
                $(this.dataForm.academicSessionId).jqxDropDownList('clearSelection');
            }else{

                $(this.dataForm.academicSessionId).jqxDropDownList('selectIndex', $(this.dataForm.academicSessionId).jqxDropDownList('getItemByValue', data.academicSessionId).index);
            }
            $(this.dataForm.academicSessionName).val((data.academicSessionName === undefined || data.academicSessionName === null )? null : data.academicSessionName);
            this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
            if(data.status === undefined || data.status === null){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{

                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }
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
            { name: 'batchId', type: 'int' ,label :'Batch',gui:'hidden'},
            { name: 'batchName', type: 'string' ,label :'', gui:'skip'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'semesterNo', type: 'string' ,label :'Semester #'},
            { name: 'academicSessionId', type: 'int' ,label :'Academic Session',gui:'list',labelAttribute:'academicSessionName'},
            { name: 'academicSessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    SemesterService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    SemesterService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    SemesterService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    SemesterService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?batch="+$("#batchIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
               id = -1;
            }

            $.get('/app/semester_controller/find_by_id/' + id).done(function (data) {

                 self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    SemesterService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    SemesterService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    SemesterService.prototype.loadTable = function () {
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

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_programs/" + $("#departmentIdFilter").val(), 'get', null, $("#semesterTable")).then(function (data) {


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

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_batches/" + $("#programIdFilter").val(), 'get', null, $("#semesterTable")).then(function (data) {
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
                $("#semesterFilter").on('click',function(){
                    if( $("#batchIdFilter").val() > 0 ) {
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
    SemesterService.prototype.refresh = function () {

        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }

        this.framework.refreshGrid(this.dataGrid);
    };
    return SemesterService;
}());
