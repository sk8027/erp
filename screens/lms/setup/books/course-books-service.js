var CourseBookService = (function () {
    function CourseBookService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["sessionId","courseSectionId","resourceId"];
        this.lovMap = null;
        this.dataGrid = $("#courseBookTable");
        this.formDlg = $("#courseBookDlg");
        this.gridToolbar = $("#courseBookToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_book_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_book_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_book_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_book_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/lms/setup/books/course-books.edit.jsp';
        this.title = "Course Book";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }

            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);


            $(this.dataForm.title).val((data.title === undefined || data.title === null )? null : data.title);
            $(this.dataForm.edition).val((data.edition === undefined || data.edition === null )? null : data.edition);
            $(this.dataForm.author).val((data.author === undefined || data.author === null )? null : data.author);
            $(this.dataForm.publisher).val((data.publisher === undefined || data.publisher === null )? null : data.publisher);
            $(this.dataForm.isbn).val((data.isbn === undefined || data.isbn === null )? null : data.isbn);
            $(this.dataForm.url).val((data.url === undefined || data.url === null )? null : data.url);
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
        this.fields = this.fields = [
            { name: 'id', type: 'int',gui:'hidden',label :'Id' },
            { name: 'courseSectionId', type: 'int' ,label :'Course Section',gui:'hidden'},
            { name: 'courseSectionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'title', type: 'string' ,label :'Title'},
            { name: 'edition', type: 'string' ,label :'Edition'},
            { name: 'author', type: 'string' ,label :'Author'},
            { name: 'publisher', type: 'string' ,label :'Publisher'},
            { name: 'isbn', type: 'string' ,label :'ISBN'},
            { name: 'url', type: 'string' ,label :'Url'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseBookService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CourseBookService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseBookService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseBookService.prototype.getById = function (id) {
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
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_book_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                debugger;
                self.populateForm(data.data,self.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseBookService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseBookService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseBookService.prototype.loadTable = function () {
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
                $("#courseBookFilter").on('click',function(){
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
    CourseBookService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CourseBookService;
}());