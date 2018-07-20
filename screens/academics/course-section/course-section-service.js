var CourseSectionService = (function () {
    function CourseSectionService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["courseId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#courseSectionTable");
        this.formDlg = $("#courseSectionDlg");
        this.gridToolbar = $("#courseSectionToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/course_section_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/course_section_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/course_section_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/course_section_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/academics/course-section/course-section.edit.jsp';
        this.title = "Course Section";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            debugger;
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.sectionLimit).val((data.sectionLimit === undefined || data.sectionLimit === null )? null : data.sectionLimit);
            $(this.dataForm.courseName).val((data.courseName === undefined || data.courseName === null )? null : data.courseName);
            $(this.dataForm.sectionStatusId).val((data.sectionStatusId=== undefined || data.sectionStatusId=== null )? null : data.sectionStatusId);
            $(this.dataForm.sessionName).val((data.sessionName === undefined || data.sessionName === null )? null : data.sessionName);
            if(lovMap == undefined){
                $(this.dataForm.sectionId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.sectionId), lovMap.sectionId);
            }
            if(data.sectionId === undefined || data.sectionId === null) {
                $(this.dataForm.sectionId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.sectionId).jqxDropDownList('selectIndex', $(this.dataForm.sectionId).jqxDropDownList('getItemByValue', data.sectionId).index);
            }
            $(this.dataForm.sectionName).val((data.sectionName === undefined || data.sectionName === null )? null : data.sectionName);
            if(lovMap == undefined){
                $(this.dataForm.sectionTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.sectionTypeId), lovMap.sectionTypeId);
            }
            if(data.sectionTypeId === undefined || data.sectionTypeId === null) {
                $(this.dataForm.sectionTypeId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.sectionTypeId).jqxDropDownList('selectIndex', $(this.dataForm.sectionTypeId).jqxDropDownList('getItemByValue', data.sectionTypeId).index);
            }
            $(this.dataForm.sectionTypeName).val((data.sectionTypeName === undefined || data.sectionTypeName === null )? null : data.sectionTypeName);
            if(lovMap == undefined){
                $(this.dataForm.resourcePersonId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.resourcePersonId), lovMap.employee);
            }
            if(data.resourcePersonId === undefined || data.resourcePersonId === null) {
                $(this.dataForm.resourcePersonId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.resourcePersonId).jqxDropDownList('selectIndex', $(this.dataForm.resourcePersonId).jqxDropDownList('getItemByValue', data.resourcePersonId).index);
            }
            $(this.dataForm.resourcePersonName).val((data.resourcePersonName === undefined || data.resourcePersonName === null )? null : data.resourcePersonName);
            if(lovMap == undefined){
                $(this.dataForm.resultReviewerId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.resultReviewerId), lovMap.employee);
            }
            if(data.resultReviewerId === undefined || data.resultReviewerId === null) {
                $(this.dataForm.resultReviewerId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.resultReviewerId).jqxDropDownList('selectIndex', $(this.dataForm.resultReviewerId).jqxDropDownList('getItemByValue', data.resultReviewerId).index);
            }
            $(this.dataForm.resultReviewerName).val((data.resultReviewerName === undefined || data.resultReviewerName === null )? null : data.resultReviewerName);

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
            { name: 'courseId', type: 'int' ,label :'Course',gui:'hidden'},
            { name: 'courseName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sessionId', type: 'int' ,label :'Session',gui:'hidden'},
            { name: 'sessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sectionId', type: 'int' ,label :'Course Section',gui:'list',labelAttribute:'sectionName'},
            { name: 'sectionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sectionTypeId', type: 'int' ,label :'Section Type',gui:'list',labelAttribute:'sectionTypeName'},
            { name: 'sectionTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'resourcePersonId', type: 'int' ,label :'Resource Person',gui:'list',labelAttribute:'resourcePersonName'},
            { name: 'resourcePersonName', type: 'string' ,label :'', gui:'skip'},
            { name: 'resultReviewerId', type: 'int' ,label :'Result Reviewer',gui:'list',labelAttribute:'resultReviewerName'},
            { name: 'resultReviewerName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sectionStatusId', type: 'int' ,label :'Section Status'},
             { name: 'sectionStatusName', type: 'string' ,label :'Section Status'},
            { name: 'sectionLimit', type: 'int',label :'Limit' },
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CourseSectionService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CourseSectionService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CourseSectionService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CourseSectionService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?department="+$("#departmentIdFilter").val()+"&course="+$("#courseIdFilter").val()+"&session="+$("#sessionIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_section_controller/find_by_id/' + id+'/'+$("#departmentIdFilter").val(), 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CourseSectionService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CourseSectionService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CourseSectionService.prototype.loadTable = function () {
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
                $("#courseSectionFilter").on('click',function(){
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
    CourseSectionService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CourseSectionService;
}());