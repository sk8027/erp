var CampaignResponseService = (function () {
    function CampaignResponseService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["campaignId"];
        this.lovMap = null;
        this.dataGrid = $("#campaignResponseTable");
        this.formDlg = $("#campaignResponseDlg");
        this.gridToolbar = $("#campaignResponseToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/campaign_response_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/campaign_response_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/campaign_response_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/campaign_response_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/crm/campaigns/response/campaign-response.edit.jsp';
        this.title = "Campaign Response";
        this.populateForm = function (data, lovMap) {
            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
            $(this.dataForm.subject).val((data.subject === undefined || data.subject === null )? null : data.subject);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            if(lovMap == undefined){
                $(this.dataForm.campaignResponseId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignResponseId), lovMap.campaignResponseId);
            }
            if(data.campaignResponseId === undefined || data.campaignResponseId === null) {
                $(this.dataForm.campaignResponseId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.campaignResponseId).jqxDropDownList('selectIndex', $(this.dataForm.campaignResponseId).jqxDropDownList('getItemByValue', data.campaignResponseId).index);
            }
            $(this.dataForm.campaignResponseName).val((data.campaignResponseName === undefined || data.campaignResponseName === null )? null : data.campaignResponseName);
            $(this.dataForm.campaignName).val((data.campaignName === undefined || data.campaignName === null )? null : data.campaignName);
            $(this.dataForm.contactId).val((data.contactId === undefined || data.contactId === null )? null : data.contactId);
            $(this.dataForm.contactName).val((data.contactName === undefined || data.contactName === null )? null : data.contactName);
            $(this.dataForm.firstName).val((data.firstName === undefined || data.firstName === null )? null : data.firstName);
            $(this.dataForm.lastName).val((data.lastName === undefined || data.lastName === null )? null : data.lastName);
            if(lovMap == undefined){
                $(this.dataForm.genderId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.genderId), lovMap.genderId);
            }
            if(data.genderId === undefined || data.genderId === null) {
                $(this.dataForm.genderId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.genderId).jqxDropDownList('selectIndex', $(this.dataForm.genderId).jqxDropDownList('getItemByValue', data.genderId).index);
            }
            if(data.id > 0) {
                $(this.dataForm.firstName).attr("disabled", "disabled");
                $(this.dataForm.lastName).attr("disabled", "disabled");
                $(this.dataForm.genderId).jqxDropDownList({disabled:true});
            }
            $(this.dataForm.responseDate).val((data.responseDate === undefined || data.responseDate === null )? null : self.framework.FormatDate(new Date(data.responseDate)));
            if(lovMap == undefined){
                $(this.dataForm.campaignChannelId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.campaignChannelId), lovMap.campaignChannelId);
            }
            if(data.campaignChannelId === undefined || data.campaignChannelId === null) {
                $(this.dataForm.campaignChannelId).jqxDropDownList('clearSelection');
            }else{
                if(data.campaignChannelId > 0) {
                    debugger;
                    $(this.dataForm.campaignChannelId).jqxDropDownList('selectIndex', $(this.dataForm.campaignChannelId).jqxDropDownList('getItemByValue', data.campaignChannelId).index);
                }
            }
            $(this.dataForm.campaignChannelName).val((data.campaignChannelName === undefined || data.campaignChannelName === null )? null : data.campaignChannelName);
            if(lovMap == undefined){
                $(this.dataForm.directionId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.directionId), lovMap.directionId);
            }
            if(data.directionId === undefined || data.directionId === null) {
                $(this.dataForm.directionId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.directionId).jqxDropDownList('selectIndex', $(this.dataForm.directionId).jqxDropDownList('getItemByValue', data.directionId).index);
            }
            $(this.dataForm.directionName).val((data.directionName === undefined || data.directionName === null )? null : data.directionName);
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
            { name: 'subject', type: 'string' ,label :'Subject'},
            { name: 'description', type: 'string' ,label :'Description'},
            { name: 'campaignResponseId', type: 'int' ,label :'Response',gui:'list',labelAttribute:'campaignResponseName'},
            { name: 'campaignResponseName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campaignId', type: 'int' ,label :'Campaign',gui:'hidden'},
            { name: 'campaignName', type: 'string' ,label :'', gui:'skip'},
            { name: 'contactId', type: 'int' ,label :'Contact',gui:'list',labelAttribute:'contactName'},
            { name: 'contactName', type: 'string' ,label :'', gui:'skip'},
            { name: 'firstName', type: 'string' ,label :'', gui:'skip'},
            { name: 'lastName', type: 'string' ,label :'', gui:'skip'},
            { name: 'genderId', type: 'string' ,label :'', gui:'skip'},
            { name: 'genderName', type: 'string' ,label :'', gui:'skip'},
            { name: 'responseDate', type: 'string' ,label :''},
            { name: 'campaignChannelId', type: 'int' ,label :'Channel',gui:'list',labelAttribute:'campaignChannelName'},
            { name: 'campaignChannelName', type: 'string' ,label :'', gui:'skip'},
            { name: 'directionId', type: 'int' ,label :'Direction',gui:'hidden'},
            { name: 'directionName', type: 'string' ,label :'', gui:'hidden'}
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    CampaignResponseService.prototype.save = function () {
        var self = this;
        var campaignResponse = {};
        var isValid = this.framework.validateForm($("#responseTab"));

        if(isValid){
            campaignResponse = this.framework.GetData($("#responseTab"));

            if(window.ContactAddressService){
                if($("#contactAddressTable").length>0) {
                    var addressService = new ContactAddressService();
                    var address = self.framework.GetGridData(addressService,false, $($("#campaignResponseTab li a[href='#contactAddressTab']")));
                    if (address.validation == false) { // Address is Invalid
                        isValid = false;
                        $('a[href^="#contactAddressTab"]').click();
                    } else {
                        campaignResponse.addresses = address;
                    }
                }
            }
            if(isValid && window.ContactCommunicationService){
                if($("#contactCommunicationTab").length > 0) {
                    var commService = new ContactCommunicationService();
                    var comm = self.framework.GetGridData(commService,false, $($("#campaignResponseTab li a[href='#contactCommunicationTab']")));
                    if (comm.validation == false) {// Invalid Communication
                        isValid = false;
                        $('a[href^="#contactCommunicationTab"]').click();
                    } else {
                        campaignResponse.communications = comm;
                    }
                }
            }





        }
        if(isValid){
debugger;
            CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(campaignResponse),this.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage(self.title,"Record Saved Successfully",false);
                        self.formDlg.jqxWindow('hide');

                        if(campaignResponse.id > 0){
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagenum);

                        }else{
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagescount -1);
                        }

                        self.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        }else{
            CommonService.errorMessage("Validation Error","Required Fields Are Missing");
        }
    };
    /********************** New Record******************************************/
    CampaignResponseService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    CampaignResponseService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    CampaignResponseService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL+"?campaign="+$("#campaignIdFilter").val()).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }

            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/campaign_response_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (responseData) {

                self.populateForm(responseData.data,self.lovMap);

                $("#campaignResponseTab li").on('click',function(){

                    var tab = $(this).find("a").attr("href");
                    if($(tab).html().trim().length === 0){
                        if(tab === "#contactAddressTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-address.jsp','get',null,$("#campaignResponse")).then(function (data) {
                                $(tab).html(data);
                                var addressService = new ContactAddressService();

                                var id = $(self.dataForm.contactId).val();
                                if(id.length === 0 ){
                                    id = null;
                                }
                                var editable = true;
                                if(id > 0){
                                    editable = false;
                                }
                                addressService.loadTable(id,editable);


                            });
                        }else if(tab === "#contactCommunicationTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-communication.jsp','get',null,$("#campaignResponse")).then(function (data) {
                                $(tab).html(data);
                                var communicationService = new ContactCommunicationService();

                                var id = $(self.dataForm.contactId).val();
                                if(id.length === 0 ){
                                    id = null;
                                }
                                communicationService.loadTable(id);
                                if(id > 0){
                                    $("#contactCommunicationTable").jqxGrid({ editable: false});
                                }
                            });
                        }else if(tab === "#activityTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/crm/leads/lead-activity.jsp','get',null,$("#campaignResponse")).then(function (data) {
                                $(tab).html(data);
                                var activityService = new ActivityService();

                                var id = $(self.dataForm.contactId).val();
                                var editable = true;
                                if(id > 0){
                                    editable = false;
                                }
                                activityService.loadTable(id,editable);
                            });
                        }
                    }
                });
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    CampaignResponseService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    CampaignResponseService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    CampaignResponseService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            if(self.filterFields != undefined ){
                $.each(self.filterFields,function(index,item){
                    self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
                });
                $("#campaignResponseFilter").on('click',function(){
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
                showCollapseButton: true, height: '700px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    CampaignResponseService.prototype.refresh = function () {
        if(this.filterFields != undefined ) {
            $.each(this.filterFields, function (index, item) {
                $("#"+item+"Filter").jqxDropDownList('clearFilter');
                $("#"+item+"Filter").jqxDropDownList('clearSelection');
            });
        }
        this.framework.refreshGrid(this.dataGrid);
    };
    return CampaignResponseService;
}());