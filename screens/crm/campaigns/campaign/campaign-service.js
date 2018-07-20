var CampaignService = (function () {
    function CampaignService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#campaignTable");
        this.formDlg = $("#campaignDlg");
        this.gridToolbar = $("#campaignToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/campaign_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/campaign_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/campaign_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/campaign_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/crm/campaigns/campaign/campaign.edit.jsp';
        this.title = "Campaign";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.title).val((data.title === undefined || data.title === null )? null : data.title);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.campaignCode).val((data.campaignCode === undefined || data.campaignCode === null )? null : data.campaignCode);
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

            if(lovMap == undefined){
                $(this.dataForm.campaignStatusId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignStatusId), lovMap.campaignStatusId);
            }
            if(data.campaignStatusId === undefined || data.currencyId === null) {
                $(this.dataForm.campaignStatusId).jqxDropDownList('clearSelection');
            }else{
                if(data.campaignStatusId > 0){
                    $(this.dataForm.campaignStatusId).jqxDropDownList('selectIndex', $(this.dataForm.campaignStatusId).jqxDropDownList('getItemByValue', data.campaignStatusId).index);
                }

            }
            $(this.dataForm.campaignStatusName).val((data.campaignStatusName === undefined || data.campaignStatusName === null )? null : data.campaignStatusName);
            $(this.dataForm.campaignStatusCode).val((data.campaignStatusCode === undefined || data.campaignStatusCode === null )? null : data.campaignStatusCode);

            if(lovMap == undefined){
                $(this.dataForm.campaignTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignTypeId), lovMap.campaignTypeId);
            }
            if(data.campaignTypeId === undefined || data.campaignTypeId === null) {
                $(this.dataForm.campaignTypeId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.campaignTypeId).jqxDropDownList('selectIndex', $(this.dataForm.campaignTypeId).jqxDropDownList('getItemByValue', data.campaignTypeId).index);
            }
            $(this.dataForm.campaignTypeName).val((data.campaignTypeName === undefined || data.campaignTypeName === null )? null : data.campaignTypeName);
            $(this.dataForm.expectedResponse).val((data.expectedResponse === undefined || data.expectedResponse === null )? null : data.expectedResponse);
            $(this.dataForm.proposedStart).val((data.proposedStart === undefined || data.proposedStart === null )? null : self.framework.FormatDate(new Date(data.proposedStart)));
            $(this.dataForm.proposedEnd).val((data.proposedEnd === undefined || data.proposedEnd === null )? null : self.framework.FormatDate(new Date(data.proposedEnd)));
            $(this.dataForm.actualStart).val((data.actualStart === undefined || data.actualStart === null )? null : self.framework.FormatDate(new Date(data.actualStart)));
            $(this.dataForm.actualEnd).val((data.actualEnd === undefined || data.actualEnd === null )? null : self.framework.FormatDate(new Date(data.actualEnd)));
            $(this.dataForm.allocatedBudget).val((data.allocatedBudget === undefined || data.allocatedBudget === null )? null : data.allocatedBudget);
            $(this.dataForm.activityCost).val((data.activityCost === undefined || data.activityCost === null )? null : data.activityCost);
            $(this.dataForm.miscCost).val((data.miscCost === undefined || data.miscCost === null )? null : data.miscCost);
            $(this.dataForm.ownerId).val((data.ownerId === undefined || data.ownerId === null )? CURRENT_USER.contactId : data.ownerId);
            $(this.dataForm.ownerName).val((data.ownerName === undefined || data.ownerName === null )? null : data.ownerName);
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
            { name: 'title', type: 'string' ,label :'Title'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'campaignCode', type: 'string' ,label :'Code'},
            { name: 'currencyId', type: 'int' ,label :'Currency',gui:'list',labelAttribute:'currencyName'},
            { name: 'currencyName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campaignStatusId', type: 'int' ,label :'Currency',gui:'list',labelAttribute:'campaignStatusName'},
            { name: 'campaignStatusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campaignStatusCode', type: 'int',gui:'hidden',label :'Id' },
            { name: 'campaignTypeId', type: 'int' ,label :'Campaign Type',gui:'list',labelAttribute:'campaignTypeName'},
            { name: 'campaignTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'expectedResponse', type: 'string' ,label :'Expected Response(%)'},
            { name: 'proposedStart', type: 'date',gui:'date' ,label :'Proposed Start Date'},
            { name: 'proposedEnd', type: 'date',gui:'date' ,label :'Proposed End Date'},
            { name: 'actualStart', type: 'date',gui:'date' ,label :'Actual Start Date'},
            { name: 'actualEnd', type: 'date',gui:'date' ,label :'Actual End Date'},
            { name: 'allocatedBudget', type: 'string' ,label :'Allocated Budget'},
            { name: 'activityCost', type: 'string' ,label :'Activity Cost'},
            { name: 'miscCost', type: 'string' ,label :'Misc. Cost'},
            { name: 'ownerId', type: 'int' ,label :'Owner',gui:'list',labelAttribute:'ownerName'},
            { name: 'ownerName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CampaignService.prototype.save = function () {
        this.framework.SaveForm(this);
    };
    /********************** New Record******************************************/
    CampaignService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CampaignService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CampaignService.prototype.getById = function (id) {

        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/campaign_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
                self.populateForm(data.data,self.lovMap);
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CampaignService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CampaignService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CampaignService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            debugger;
            self.lovMap = data.data;
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '700px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    CampaignService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return CampaignService;
}());
