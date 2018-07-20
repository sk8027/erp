var StudentService = (function () {
    function StudentService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["campusId","schoolId","departmentId","programId","studentStatusId"];
        this.lovMap = null;
        this.dataGrid = $("#studentTable");
        this.formDlg = $("#studentDlg");
        this.gridToolbar = $("#studentToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/StudentController/list';
        this.lovURL = CONTEXT_PATH + '/app/StudentController/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/academics/contacts/contact.edit.jsp?type=s';
        this.title = "Student";
        this.contactService = new ContactService();
         /********************** Table Fields ******************************************/
        this.fields = [
            { name: 'id', type: 'int',gui:'hidden',label :'Id' },
            { name: 'enrollmentId', type: 'string' ,label :'Enrollment #'},
            { name: 'contactName', type: 'string' ,label :'Contact', filterable:false},
            { name: 'campusId', type: 'int' ,label :'Campus',gui:'hidden',labelAttribute:'campusName'},
            { name: 'campusName', type: 'string' ,label :'Campus', gui:'skip'},
            { name: 'schoolId', type: 'int' ,label :'School',gui:'hidden',labelAttribute:'schoolName'},
            { name: 'schoolName', type: 'string' ,label :'School', filterable:false},
            { name: 'departmentId', type: 'int' ,label :'Department',gui:'hidden',labelAttribute:'departmentName'},
            { name: 'departmentName', type: 'string' ,label :'Department' , filterable:false},
            { name: 'programId', type: 'int' ,label :'Program',gui:'hidden',labelAttribute:'programName'},
            { name: 'programName', type: 'string' ,label :'Program',filterable:false},
            { name: 'batchId', type: 'int' ,label :'ProgramBatch',gui:'hidden',labelAttribute:'batchName'},
            { name: 'batchName', type: 'string' ,label :'Batch', filterable:false},
            { name: 'currentSemesterId', type: 'int' ,label :'Current Semester',gui:'hidden',labelAttribute:'currentSemesterName'},
            { name: 'currentSemesterName', type: 'string' ,label :'Semester', filterable:false},
            {name : 'studentCategoryId', type:'int', gui:'skip'},
            {name : 'paymentSchemeId', type:'int', gui:'skip'},
            { name: 'studentStatusId', type: 'int' ,label :'Status',gui:'hidden',labelAttribute:'studentStatusName'},
            { name: 'studentStatusName', type: 'string' ,label :'Status', filterable:false}
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    StudentService.prototype.save = function () {

    };
    /********************** New Record******************************************/
    StudentService.prototype.newRecord = function () {
        this.contactService.newRecord();

    }
    /********************** Clear Form Fields For Update******************************************/
    StudentService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    StudentService.prototype.getById = function (id) {
        this.contactService.getById(id,"STD");

    };

    /********************** Deleted Selected Rows from table ******************************************/
    StudentService.prototype.deleteRows = function () {

    };

    /********************** Delete Single Record showing in Popup ******************************************/
    StudentService.prototype.deleteRecord = function (id) {
        t
    };

    /********************** Load the table from Server ******************************************/
    StudentService.prototype.loadTable = function () {
        var self = this;
        CommonService.sendAjaxRequest(this.lovURL,'get',null,$(".form-body")).then(function( data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $('#campusIdFilter').on('change', function (event) {
                    $("#schoolIdFilter").jqxDropDownList('clearSelection');
                    $("#departmentIdFilter").jqxDropDownList('clearSelection');
                    $("#programIdFilter").jqxDropDownList('clearSelection');
                });
                $('#schoolIdFilter').on('change', function (event) {
                    $("#departmentIdFilter").jqxDropDownList('clearSelection');
                    $("#programIdFilter").jqxDropDownList('clearSelection');
                });
                $('#departmentIdFilter').on('change', function (event) {

                    $("#programIdFilter").jqxDropDownList('clearSelection');
                });
                $('#schoolIdFilter').on('open', function (event) {
                    if($("#campusIdFilter").val() > 0) {

                        $("#schoolIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_schools/" + $("#campusIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {


                            $.each(data.data, function (item, school) {
                                $("#schoolIdFilter").jqxDropDownList('addItem', {
                                    label: school.label,
                                    value: school.value
                                });
                            });
                        })
                    }else{
                        $("#schoolIdFilter").jqxDropDownList('clear');
                    }
                });
                $('#departmentIdFilter').on('open', function (event) {

                    if($("#schoolIdFilter").val() > 0) {
                        $("#departmentIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_departments/" + $("#schoolIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {
                             $.each(data.data, function (item, department) {
                                $("#departmentIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#departmentIdFilter").jqxDropDownList('clear');

                    }
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
                $("#studentFilter").on('click',function(){
                    if( $("#campusIdFilter").val() > 0 ) {
                        $.each(self.filterFields,function(index,item){
                            console.log("Filter "+item +" with value "+$("#"+item+"Filter").val().length);
                            if($("#"+item+"Filter").val().length==0){
                                self.dataGrid.jqxGrid('showcolumn',item.replace("Id","Name"));
                            }else{
                                self.dataGrid.jqxGrid('hidecolumn',item.replace("Id","Name"));
                            }
                            var filter =   new $.jqx.filter();
                            filter.addfilter(0, filter.createfilter('numericfilter', $("#"+item+"Filter").val(), "EQUAL"));
                            self.dataGrid.jqxGrid('addfilter', item, filter);
                        });

                        self.dataGrid.jqxGrid('applyfilters');
                    }
                });
            }
            self.framework.PopulateGrid (self);
        });
        var height = ($(window).height()-50);
        var width = ($(window).width()-50);
        self.formDlg.jqxWindow({

            showCollapseButton: true, height: height,width:width,maxHeight:height,maxWidth:width,
            isModal:true,
            theme : JQXTHEME,
            autoOpen: false
        });

    };
    StudentService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return StudentService;
}());
