var AcademicCalendarService = (function () {
    function AcademicCalendarService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["campusId","sessionId"];
        this.lovMap = null;
        this.dataGrid = $("#academicCalendarTable");
        this.formDlg = $("#academicCalendarDlg");
        this.gridToolbar = $("#academicCalendarToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/academic_calendar_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/academic_calendar_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/academic_calendar_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/academic_calendar_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/academics/calendar/academic-calendar.edit.jsp';
        this.title = "Academic Calendar";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.sessionName).val((data.sessionName === undefined || data.sessionName === null )? null : data.sessionName);
            if(lovMap == undefined){
                $(this.dataForm.activityTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.activityTypeId), lovMap.activityTypeId);
            }
            if(data.activityTypeId === undefined || data.activityTypeId === null) {
                $(this.dataForm.activityTypeId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.activityTypeId).jqxDropDownList('selectIndex', $(this.dataForm.activityTypeId).jqxDropDownList('getItemByValue', data.activityTypeId).index);
            }
            $(this.dataForm.activityTypeName).val((data.activityTypeName === undefined || data.activityTypeName === null )? null : data.activityTypeName);
            $(this.dataForm.activityDate).val((data.activityDate === undefined || data.activityDate === null )? null : self.framework.FormatDate(new Date(data.activityDate)));
            if(lovMap  == undefined){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.status), lovMap.status);
            }
            if(data.status === undefined || data.status === null){
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);

            }else{
                $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', data.status).index);
            }
            $(this.dataForm.statusName).val((data.statusName === undefined || data.statusName === null )? null : data.statusName);
            $(this.dataForm.campusName).val((data.campusName === undefined || data.campusName === null )? null : data.campusName);
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
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'sessionId', type: 'int' ,label :'Session',gui:'hidden'},
            { name: 'sessionName', type: 'string' ,label :'', gui:'skip'},
            { name: 'activityTypeId', type: 'int' ,label :'Activity',gui:'list',labelAttribute:'activityTypeName'},
            { name: 'activityTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'activityDate', type: 'string' ,label :'Date'},
            { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
            { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
            { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campusId', type: 'int' ,label :'',gui:'hidden'},
            { name: 'campusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    AcademicCalendarService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    AcademicCalendarService.prototype.newRecord = function () {

        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    AcademicCalendarService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    AcademicCalendarService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?campus="+$("#campusIdFilter").val()+"&session="+$("#sessionIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/academic_calendar_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                self.lovMap = data.lovMap;
                self.populateForm(data.data,data.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    AcademicCalendarService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    AcademicCalendarService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    AcademicCalendarService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#academicCalendarFilter").on('click',function(){
                    if( $("#campusIdFilter").val() > 0 && $("#sessionIdFilter").val() > 0 ) {
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
    AcademicCalendarService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return AcademicCalendarService;
}());