var CampaignActivityService = (function () {
    function CampaignActivityService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["campaignId"];
        this.lovMap = null;
        this.dataGrid = $("#campaignActivityTable");
        this.formDlg = $("#campaignActivityDlg");
        this.gridToolbar = $("#campaignActivityToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/campaign_activity_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/campaign_activity_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/campaign_activity_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/campaign_activity_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/crm/campaigns/activity/campaign-activity.edit.jsp';
        this.title = "Campaign Activity";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.title).val((data.title === undefined || data.title === null )? null : data.title);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.campaignName).val((data.campaignName === undefined || data.campaignName === null )? null : data.campaignName);
            if(lovMap == undefined){
                $(this.dataForm.campaignActivityTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignActivityTypeId), lovMap.campaignActivityTypeId);
            }
            if(data.campaignActivityTypeId === undefined || data.campaignActivityTypeId === null) {
                $(this.dataForm.campaignActivityTypeId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.campaignActivityTypeId).jqxDropDownList('selectIndex', $(this.dataForm.campaignActivityTypeId).jqxDropDownList('getItemByValue', data.campaignActivityTypeId).index);
            }
            $(this.dataForm.campaignActivityTypeName).val((data.campaignActivityTypeName === undefined || data.campaignActivityTypeName === null )? null : data.campaignActivityTypeName);
            if(lovMap == undefined){
                $(this.dataForm.campaignChannelId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignChannelId), lovMap.campaignChannelId);
            }

            if(data.campaignChannelId === undefined || data.campaignChannelId === null) {
                $(this.dataForm.campaignChannelId).jqxDropDownList('clearSelection');
            }else{
                if(data.campaignChannelId > 0) {
                    $(this.dataForm.campaignChannelId).jqxDropDownList('selectIndex', $(this.dataForm.campaignChannelId).jqxDropDownList('getItemByValue', data.campaignChannelId).index);
                }
            }
            $(this.dataForm.campaignChannelName).val((data.campaignChannelName === undefined || data.campaignChannelName === null )? null : data.campaignChannelName);
            if(lovMap == undefined){
                $(this.dataForm.communityId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.communityId), lovMap.communityId);
            }
            if(data.communityId === undefined || data.communityId === null) {
                $(this.dataForm.communityId).jqxDropDownList('clearSelection');
            }else{
                if(data.communityId > 0) {
                    $(this.dataForm.communityId).jqxDropDownList('selectIndex', $(this.dataForm.communityId).jqxDropDownList('getItemByValue', data.communityId).index);
                }
            }
            $(this.dataForm.communityName).val((data.communityName === undefined || data.communityName === null )? null : data.communityName);
            $(this.dataForm.scheduleStart).val((data.scheduleStart === undefined || data.scheduleStart === null )? null : self.framework.FormatDate(new Date(data.scheduleStart)));
            $(this.dataForm.scheduleEnd).val((data.scheduleEnd === undefined || data.scheduleEnd === null )? null : self.framework.FormatDate(new Date(data.scheduleEnd)));
            $(this.dataForm.actualStart).val((data.actualStart === undefined || data.actualStart === null )? null : self.framework.FormatDate(new Date(data.actualStart)));
            $(this.dataForm.actualEnd).val((data.actualEnd === undefined || data.actualEnd === null )? null : self.framework.FormatDate(new Date(data.actualEnd)));
            if(lovMap == undefined){
                $(this.dataForm.priorityId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.priorityId), lovMap.priorityId);
            }
            if(data.priorityId === undefined || data.priorityId === null) {
                $(this.dataForm.priorityId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.priorityId).jqxDropDownList('selectIndex', $(this.dataForm.priorityId).jqxDropDownList('getItemByValue', data.priorityId).index);
            }
            $(this.dataForm.priorityName).val((data.priorityName === undefined || data.priorityName === null )? null : data.priorityName);
            if(lovMap == undefined){
                $(this.dataForm.activityStatusId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.activityStatusId), lovMap.activityStatusId);
            }
            if(data.activityStatusId === undefined || data.activityStatusId === null) {
                $(this.dataForm.activityStatusId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.activityStatusId).jqxDropDownList('selectIndex', $(this.dataForm.activityStatusId).jqxDropDownList('getItemByValue', data.activityStatusId).index);
            }
            $(this.dataForm.activityStatusName).val((data.activityStatusName === undefined || data.activityStatusName === null )? null : data.activityStatusName);
            if(lovMap == undefined){
                $(this.dataForm.currencyId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.currencyId), lovMap.currencyId);
            }
            if(data.currencyId === undefined || data.currencyId === null) {
                $(this.dataForm.currencyId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.currencyId).jqxDropDownList('selectIndex', $(this.dataForm.currencyId).jqxDropDownList('getItemByValue', data.currencyId).index);
            }
            $(this.dataForm.currencyName).val((data.currencyName === undefined || data.currencyName === null )? null : data.currencyName);
            $(this.dataForm.allocatedBudget).val((data.allocatedBudget === undefined || data.allocatedBudget === null )? null : data.allocatedBudget);
            $(this.dataForm.actualCost).val((data.actualCost === undefined || data.actualCost === null )? null : data.actualCost);
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
            { name: 'campaignId', type: 'int' ,label :'Campaign',gui:'hidden'},
            { name: 'title', type: 'string' ,label :'Title'},
            { name: 'description', type: 'string' ,label :'Description',gui:'hidden'},
            { name: 'campaignName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campaignActivityTypeId', type: 'int' ,label :'Activity Type',gui:'list',labelAttribute:'campaignActivityTypeName'},
            { name: 'campaignActivityTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campaignChannelId', type: 'int' ,label :'Channel',gui:'hidden',labelAttribute:'campaignChannelName'},
            { name: 'campaignChannelName', type: 'string' ,label :'', gui:'skip'},
            { name: 'communityId', type: 'int' ,label :'Community',gui:'hidden',labelAttribute:'communityName'},
            { name: 'communityName', type: 'string' ,label :'', gui:'skip'},
            { name: 'scheduleStart', type: 'date',gui:'date' ,label :'Schedule Date'},
            { name: 'scheduleEnd', type: 'date',gui:'date' ,label :'Schedule End',gui:'hidden'},
            { name: 'actualStart', type: 'date',gui:'date' ,label :'Actual Start'},
            { name: 'actualEnd', type: 'date',gui:'date' ,label :'Actual End',gui:'hidden'},
            { name: 'priorityId', type: 'int' ,label :'Priority',gui:'list',labelAttribute:'priorityName'},
            { name: 'priorityName', type: 'string' ,label :'', gui:'skip'},
            { name: 'activityStatusId', type: 'int' ,label :'Status',gui:'list',labelAttribute:'activityStatusName'},
            { name: 'activityStatusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'currencyId', type: 'int' ,label :'Currency',gui:'hidden',labelAttribute:'currencyName'},
            { name: 'currencyName', type: 'string' ,label :'', gui:'skip'},
            { name: 'allocatedBudget', type: 'string' ,label :'Budget',gui:'hidden'},
            { name: 'actualCost', type: 'string' ,label :'Actual Cost',gui:'hidden'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CampaignActivityService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CampaignActivityService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CampaignActivityService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CampaignActivityService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?campaign="+$("#campaignIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/campaign_activity_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,self.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CampaignActivityService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CampaignActivityService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CampaignActivityService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#campaignActivityFilter").on('click',function(){
                    if( $("#campaignIdFilter").val() > 0 ) {
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
    CampaignActivityService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CampaignActivityService;
}());