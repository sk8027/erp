var CourseLearnObjectiveService = (function () {
    function CourseLearnObjectiveService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseLearnObjectiveTable");
        this.formDlg = $("#courseLearnObjectiveDlg");
        this.gridToolbar = $("#courseLearnObjectiveToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_learn_objective_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_learn_objective_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_learn_objective_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_learn_objective_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/obe/clo/clo.edit.jsp';
        this.title = "Course LearnObjective";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.courseName).val((data.courseName === undefined || data.courseName === null )? null : data.courseName);
            $(this.dataForm.sessionName).val((data.sessionName === undefined || data.sessionName === null )? null : data.sessionName);
            if(lovMap == undefined){
                $(this.dataForm.domainId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.domainId), lovMap.domainId);
            }

            if(data.domainId === undefined || data.domainId === null) {
                $(this.dataForm.domainId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.domainId).jqxDropDownList('selectIndex', $(this.dataForm.domainId).jqxDropDownList('getItemByValue', data.domainId).index);
            }
            if(lovMap == undefined){
                $(this.dataForm.taxonomyId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.taxonomyId), lovMap.taxonomyId);
            }

            if(data.taxonomyId === undefined || data.taxonomyId === null) {
                $(this.dataForm.taxonomyId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.taxonomyId).jqxDropDownList('selectIndex', $(this.dataForm.taxonomyId).jqxDropDownList('getItemByValue', data.taxonomyId).index);
            }
            $(this.dataForm.taxonomyName).val((data.taxonomyName === undefined || data.taxonomyName === null )? null : data.taxonomyName);
            this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
            if(data.status === undefined || data.status === null){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }
            $(this.dataForm.statusName).val((data.statusName === undefined || data.statusName === null )? null : data.statusName);
            $(this.dataForm.cloName).val((data.cloName === undefined || data.cloName === null )? null : data.cloName);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.weightage).val((data.weightage === undefined || data.weightage === null )? null : data.weightage);
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
            { name: 'courseId', type: 'int' ,label :'Course',gui:'hidden'},
            { name: 'courseName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sessionId', type: 'int' ,label :'Session',gui:'hidden'},
            { name: 'sessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'cloName', type: 'string' ,label :'Name'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'domainId', type: 'int' ,label :'Domain',gui:'list',labelAttribute:'domainName'},
            { name: 'domainName', type: 'string' ,label :'', gui:'skip'},
            { name: 'taxonomyId', type: 'int' ,label :'Taxonomy',gui:'list',labelAttribute:'taxonomyName'},
            { name: 'taxonomyName', type: 'string' ,label :'', gui:'skip'},

            { name: 'weightage', type: 'string' ,label :'Weightage'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'}


        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseLearnObjectiveService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CourseLearnObjectiveService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseLearnObjectiveService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseLearnObjectiveService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?&course="+$("#courseIdFilter").val()+"&session="+$("#sessionIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_learn_objective_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,data.lovMap);
                $(self.dataForm.taxonomyId).on('open', function (event) {

                    if($(self.dataForm.domainId).val() > 0) {
                        $(self.dataForm.taxonomyId).jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_taxonomy/" + $(self.dataForm.domainId).val(), 'get', null, $(self.dataForm.taxonomyId)).then(function (data) {


                            $.each(data.data, function (item, lov) {
                                $(self.dataForm.taxonomyId).jqxDropDownList('addItem', {
                                    label: lov.label,
                                    value: lov.value
                                });
                            });
                        })
                    }else{
                        $(self.dataForm.taxonomyId).jqxDropDownList('clear');

                    }
                });
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseLearnObjectiveService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseLearnObjectiveService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseLearnObjectiveService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $('#courseIdFilter').on('open', function (event) {

                    if($("#departmentIdFilter").val() > 0) {
                        $("#courseIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_courses/" + $("#departmentIdFilter").val(), 'get', null, $("#courseIdFilter")).then(function (data) {


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

                $("#courseLearnObjectiveFilter").on('click',function(){
                    if( $("#departmentIdFilter").val() > 0 && $("#courseIdFilter").val() > 0 && $("#sessionIdFilter").val() > 0 ) {
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
    CourseLearnObjectiveService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CourseLearnObjectiveService;
}());