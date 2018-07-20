var LeadService = (function () {
    function LeadService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#leadTable");
        this.formDlg = $("#leadDlg");
        this.gridToolbar = $("#leadToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/lead_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/lead_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/lead_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/lead_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/crm/leads/lead.edit.jsp';
        this.title = "Lead";
        this.populateForm = function (data, lovMap) {

            if(data === null || data === undefined){
                data = {};
            }
            var self = this;
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);

            $(this.dataForm.contactId).val((data.contactId === undefined || data.contactId === null )? null : data.contactId);
            $(this.dataForm.contactName).val((data.contactName === undefined || data.contactName === null )? null : data.contactName);
            $(this.dataForm.firstName).val((data.firstName === undefined || data.firstName === null )? null : data.firstName);
            $(this.dataForm.lastName).val((data.lastName === undefined || data.lastName === null )? null : data.lastName);
            //$(this.dataForm.gender).val((data.gender === undefined || data.gender === null )? null : data.gender);
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
            debugger;
            if(lovMap == undefined){
                $(this.dataForm.currencyId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.currencyId), lovMap.currencyId);
            }
            if(data.currencyId === undefined || data.currencyId === null) {
                $(this.dataForm.currencyId).jqxDropDownList('clearSelection');
            }else{
                if(data.currencyId > 0) {
                    $(this.dataForm.currencyId).jqxDropDownList('selectIndex', $(this.dataForm.currencyId).jqxDropDownList('getItemByValue', data.currencyId).index);
                }
            }
            $(this.dataForm.currencyName).val((data.currencyName === undefined || data.currencyName === null )? null : data.currencyName);
            debugger;
            if(lovMap == undefined){
                $(this.dataForm.leadSourceId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.leadSourceId), lovMap.leadSourceId);
            }
            if(data.leadSourceId === undefined || data.leadSourceId === null) {
                $(this.dataForm.leadSourceId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.leadSourceId).jqxDropDownList('selectIndex', $(this.dataForm.leadSourceId).jqxDropDownList('getItemByValue', data.leadSourceId).index);
            }
            $(this.dataForm.leadSourceName).val((data.leadSourceName === undefined || data.leadSourceName === null )? null : data.leadSourceName);
            $(this.dataForm.ownerId).val((data.ownerId === undefined || data.ownerId === null )? CURRENT_USER.contactId : data.ownerId);
            $(this.dataForm.ownerName).val((data.ownerName === undefined || data.ownerName === null )? CURRENT_USER.contactTitle : data.ownerName );

            if(lovMap == undefined){
                $(this.dataForm.revenueTypeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.revenueTypeId), lovMap.revenueTypeId);
            }
            if(data.revenueTypeId === undefined || data.revenueTypeId === null) {
                $(this.dataForm.revenueTypeId).jqxDropDownList('clearSelection');
            }else{
                if(data.revenueTypeId > 0) {
                    $(this.dataForm.revenueTypeId).jqxDropDownList('selectIndex', $(this.dataForm.revenueTypeId).jqxDropDownList('getItemByValue', data.revenueTypeId).index);
                }
            }
            $(this.dataForm.revenueTypeName).val((data.revenueTypeName === undefined || data.revenueTypeName === null )? null : data.revenueTypeName);
            if(lovMap == undefined){
                $(this.dataForm.leadRatingId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.leadRatingId), lovMap.leadRatingId);
            }
            if(data.leadRatingId === undefined || data.leadRatingId === null) {
                $(this.dataForm.leadRatingId).jqxDropDownList('clearSelection');
            }else{
                if(data.leadRatingId > 0) {
                    $(this.dataForm.leadRatingId).jqxDropDownList('selectIndex', $(this.dataForm.leadRatingId).jqxDropDownList('getItemByValue', data.leadRatingId).index);
                }
            }
            $(this.dataForm.leadRatingName).val((data.leadRatingName === undefined || data.leadRatingName === null )? null : data.leadRatingName);
            $(this.dataForm.topic).val((data.topic === undefined || data.topic === null )? null : data.topic);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.estimatedRevenue).val((data.estimatedRevenue === undefined || data.estimatedRevenue === null )? null : data.estimatedRevenue);
            $(this.dataForm.estimatedCloseDate).val((data.estimatedCloseDate === undefined || data.estimatedCloseDate === null )? null : self.framework.FormatDate(new Date(data.estimatedCloseDate)));
            $(this.dataForm.probability).val((data.probability === undefined || data.probability === null )? null : data.probability);
            if(!CURRENT_USER.IS_ACADEMIC) {
                 if (lovMap == undefined) {
                    $(this.dataForm.purchaseProcessId).jqxDropDownList('clearSelection');
                } else {
                    this.framework.GenerateDropDownList($(this.dataForm.purchaseProcessId), lovMap.purchaseProcessId);
                }
                if (data.purchaseProcessId === undefined || data.purchaseProcessId === null) {
                    $(this.dataForm.purchaseProcessId).jqxDropDownList('clearSelection');
                } else {
                    if (data.purchaseProcessId > 0) {
                        $(this.dataForm.purchaseProcessId).jqxDropDownList('selectIndex', $(this.dataForm.purchaseProcessId).jqxDropDownList('getItemByValue', data.purchaseProcessId).index);
                    }
                }
                $(this.dataForm.purchaseProcessName).val((data.purchaseProcessName === undefined || data.purchaseProcessName === null) ? null : data.purchaseProcessName);
                if (lovMap == undefined) {
                    $(this.dataForm.purchaseTimeId).jqxDropDownList('clearSelection');
                } else {
                    this.framework.GenerateDropDownList($(this.dataForm.purchaseTimeId), lovMap.purchaseTimeId);
                }
                if (data.purchaseTimeId === undefined || data.purchaseTimeId === null) {
                    $(this.dataForm.purchaseTimeId).jqxDropDownList('clearSelection');
                } else {
                    if (data.purchaseTimeId > 0) {
                        $(this.dataForm.purchaseTimeId).jqxDropDownList('selectIndex', $(this.dataForm.purchaseTimeId).jqxDropDownList('getItemByValue', data.purchaseTimeId).index);
                    }
                }
                $(this.dataForm.purchaseTimeName).val((data.purchaseTimeName === undefined || data.purchaseTimeName === null) ? null : data.purchaseTimeName);
            }else{
                if (lovMap == undefined) {
                    $(this.dataForm.campusId).jqxDropDownList('clearSelection');
                    $(this.dataForm.sessionId).jqxDropDownList('clearSelection');
                    $(this.dataForm.programId).jqxDropDownList('clearSelection');
                } else {
                    this.framework.GenerateDropDownList($(this.dataForm.campusId), lovMap.campusId);
                    this.framework.GenerateDropDownList($(this.dataForm.sessionId), lovMap.sessionId);
                    this.framework.GenerateDropDownList($(this.dataForm.programId), lovMap.programId);
                }
                if (data.campusId === undefined || data.campusId === null) {
                    $(this.dataForm.campusId).jqxDropDownList('clearSelection');
                } else {
                    if (data.campusId > 0) {
                        $(this.dataForm.campusId).jqxDropDownList('selectIndex', $(this.dataForm.campusId).jqxDropDownList('getItemByValue', data.campusId).index);
                    }
                }
                if (data.programId === undefined || data.programId === null) {
                    $(this.dataForm.programId).jqxDropDownList('clearSelection');
                } else {
                    if (data.programId > 0) {
                        $(this.dataForm.programId).jqxDropDownList('selectIndex', $(this.dataForm.programId).jqxDropDownList('getItemByValue', data.programId).index);
                    }
                }
                if (data.sessionId === undefined || data.sessionId === null) {
                    $(this.dataForm.sessionId).jqxDropDownList('clearSelection');
                } else {
                    if (data.sessionId > 0) {
                        $(this.dataForm.sessionId).jqxDropDownList('selectIndex', $(this.dataForm.sessionId).jqxDropDownList('getItemByValue', data.sessionId).index);
                    }
                }
                $("[formControlName='programId']").on('open', function (event) {
                    if($("[formControlName='campusId']").val() > 0) {

                        $("[formControlName='programId']").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_programs_by_campus/" + $("[formControlName='campusId']").val(), 'get', null, $("#studentTable")).then(function (data) {


                            $.each(data.data, function (item, lov) {
                                $("[formControlName='programId']").jqxDropDownList('addItem', {
                                    label: lov.label,
                                    value: lov.value
                                });
                            });
                        })
                    }else{
                        $("[formControlName='programId']").jqxDropDownList('clear');
                    }
                });
            }
            if(lovMap == undefined){
                $(this.dataForm.leadStatusId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.leadStatusId), lovMap.leadStatusId);
            }
            if(data.leadStatusId === undefined || data.leadStatusId === null) {
                $(this.dataForm.leadStatusId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.leadStatusId).jqxDropDownList('selectIndex', $(this.dataForm.leadStatusId).jqxDropDownList('getItemByValue', data.leadStatusId).index);
            }
            $(this.dataForm.leadStatusName).val((data.leadStatusName === undefined || data.leadStatusName === null )? null : data.leadStatusName);

            if(lovMap == undefined){
                $(this.dataForm.sourceCampaignId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.sourceCampaignId), lovMap.sourceCampaignId);
            }
            if(data.sourceCampaignId === undefined || data.sourceCampaignId=== null) {
                $(this.dataForm.sourceCampaignId).jqxDropDownList('clearSelection');
            }else{
                if(data.sourceCampaignId > 0){
                    $(this.dataForm.sourceCampaignId).jqxDropDownList('selectIndex', $(this.dataForm.sourceCampaignId).jqxDropDownList('getItemByValue', data.sourceCampaignId).index);
                }

            }
            $(this.dataForm.sourceCampaignName).val((data.sourceCampaignName === undefined || data.sourceCampaignName === null )? null : data.sourceCampaignName);
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
            { name: 'topic', type: 'string' ,label :'Topic'},
            { name: 'contactId', type: 'int' ,label :'Contact',gui:'list',labelAttribute:'contactName'},
            { name: 'contactName', type: 'string' ,label :'', gui:'skip'},
            { name: 'firstName', type: 'string' ,label :'First Name'},
            { name: 'lastName', type: 'string' ,label :'Last Name'},
            { name: 'genderId', type: 'string' ,label :'Gender',gui:'list',labelAttribute:'genderName'},
            { name: 'genderName', type: 'string' ,label :'', gui:'skip'},
            { name: 'currencyId', type: 'int' ,label :'Currency',gui:'hidden'},
            { name: 'currencyName', type: 'string' ,label :'', gui:'skip'},
            { name: 'leadSourceId', type: 'int' ,label :'Lead Source',gui:'list',labelAttribute:'leadSourceName'},
            { name: 'leadSourceName', type: 'string' ,label :'', gui:'skip'},
            { name: 'revenueTypeId', type: 'int' ,label :'Revenue Type',gui:'hidden'},
            { name: 'revenueTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'sourceCampaignId', type: 'int' ,label :'Campaign',gui:'hidden'},
            { name: 'sourceCampaignName', type: 'string' ,label :'', gui:'skip'},
            { name: 'leadRatingId', type: 'int' ,label :'Lead Rating',gui:'hidden'},
            { name: 'leadRatingName', type: 'string' ,label :'', gui:'skip'},
            { name: 'estimatedRevenue', type: 'string' ,label :'Est. Budget', gui:'hidden'},
            { name: 'purchaseProcessId', type: 'int' ,label :'Purchase Process',gui:'hidden'},
            { name: 'purchaseProcessName', type: 'string' ,label :'', gui:'skip'},
            { name: 'purchaseTimeId', type: 'int' ,label :'Est. Purchase Time',gui:'hidden'},
            { name: 'purchaseTimeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'leadStatusId', type: 'int' ,label :'Lead Status',gui:'hidden'},
            { name: 'leadStatusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'campusId', type: 'int',gui:'hidden',label :'Campus' },
            { name: 'programId', type: 'int',gui:'hidden',label :'Program' },
            { name: 'sessionId', type: 'int',gui:'hidden',label :'Session' }
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    LeadService.prototype.save = function () {
        var self = this;
        var contact = {};

        var isValid = this.framework.validateForm($("#contactTab"));

        if(isValid){
            contact = this.framework.GetData($("#contactTab"));
             debugger;
                contact.currencyId = $("[formControlName='currencyId']").val();
                contact.leadSourceId = $("[formControlName='leadSourceId']").val();
                contact.probability =  $("[formControlName='probability']").val();
            contact.probability =  $("[formControlName='probability']").val();
            contact.estimatedCloseDate = new Date($("[formControlName='estimatedCloseDate']").val());
            contact.ownerId = CURRENT_USER.contactId;
                contact.revenueTypeId = $("[formControlName='revenueTypeId']").val();
            contact.sourceCampaignId = $("[formControlName='sourceCampaignId']").val();
            contact.leadRatingId= $("[formControlName='leadRatingId']").val();
            contact.estimatedRevenue = $("[formControlName='estimatedRevenue']").val();
            contact.purchaseProcessId = $("[formControlName='purchaseProcessId']").val();
            contact.purchaseTimeId = $("[formControlName='purchaseTimeId']").val();
            contact.purchaseTimeId = $("[formControlName='purchaseTimeId']").val();
            contact.leadStatusId = $("[formControlName='leadStatusId']").val();
            contact.campusId = $("[formControlName='campusId']").val();
            contact.programId = $("[formControlName='programId']").val();
            contact.sessionId = $("[formControlName='sessionId']").val();
               if(window.ContactAddressService){
                   if($("#contactAddressTable").length>0) {
                       var addressService = new ContactAddressService();
                       var address = addressService.GetData();
                       if (address.validation == false) { // Address is Invalid
                           isValid = false;
                           $('a[href^="#contactAddressTab"]').click();
                       } else {
                           contact.addresses = address;
                       }
                   }
                }
                if(isValid && window.ContactCommunicationService){
                   if($("#contactCommunicationTab").length > 0) {


                       var communicationService = new ContactCommunicationService();
                       var comm = communicationService.GetData();
                       if (comm.validation == false) {// Invalid Communication
                           isValid = false;
                           $('a[href^="#contactCommunicationTab"]').click();
                       } else {
                           contact.communications = comm;
                       }
                   }
                }
                if(isValid && window.ActivityService){
                    if($("#activityTab").length > 0) {
                        var activityService = new ActivityService();
                        var activities = activityService.GetData();

                        if (activities.validation == false) {// Invalid Activities
                            isValid = false;
                            $('a[href^="#activityTab"]').click();
                        } else {
                            contact.activities = activities;
                        }
                    }
                }




        }
        if(isValid){

            CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(contact),this.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage(self.title,"Record Saved Successfully",false);
                        self.formDlg.jqxWindow('hide');

                        if(contact.id > 0){
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
    LeadService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    LeadService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    LeadService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/lead_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (serverData) {
                self.populateForm(serverData.data,self.lovMap);
                if(serverData.data != null && serverData.data.id > 0 ){
                    $("#QualifyBtn").show();
                    $("#DisqualifyBtn").show();
                    $("#leftPanel").show();
                    $("#rightPanel").show();
                    $("#middlePanel").removeAttr("class")
                    $("#middlePanel").attr("class","col-md-6");
                    if(serverData.data.sourceCampaignId > 0){
                        $("[formControlName='leadSourceId']").jqxDropDownList({disabled:true});
                    }
                }else{
                    $("#QualifyBtn").hide();
                    $("#DisqualifyBtn").hide();
                    $("#leftPanel").hide();
                    $("#rightPanel").hide();
                    $("#middlePanel").removeAttr("class")
                    $("#middlePanel").attr("class","col-md-12");
                }
                 var workflowStageId ='N';
                        if(serverData.data != null){
                            workflowStageId = serverData.data.workflowStageId;
                        }
                         $("#workflowProgress").find("li").removeClass("active");
                         $("#workflowProgress").find("li[workflow='"+workflowStageId+"']").addClass("active");
                        var $total = $("#workflowProgress").find('li').length;
                        var $current = $("#workflowProgress").find('li.active').index() + 1;
                        var $percent = ($current/$total) * 100;
                        $('#workflowProgress .progress-bar').css({width:$percent+'%'});

                $.each($("#workflowProgress").find("li"),function(index,item){
                    debugger;
                    if(index <($current-1)){

                        $(item).find(">a.step>.number").attr("style","background:#cef0f5;color:white");
                    }
                });
                 $("#contactInfo li").on('click',function(){

                    var tab = $(this).find("a").attr("href");
                    if($(tab).html().trim().length === 0){
                        if(tab === "#contactAddressTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-address.jsp','get',null,$("#studentDlg")).then(function (data) {
                                $(tab).html(data);
                                var addressService = new ContactAddressService();

                                var id = $(self.dataForm.contactId).val();
                                if(id.length === 0 ){
                                    id = null;
                                }
                                addressService.loadTable(id);
                            });
                        }else if(tab === "#contactCommunicationTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-communication.jsp','get',null,$("#studentDlg")).then(function (data) {
                                $(tab).html(data);
                                var communicationService = new ContactCommunicationService();

                                var id = $(self.dataForm.contactId).val();
                                if(id.length === 0 ){
                                    id = null;
                                }
                                communicationService.loadTable(id);
                            });
                        }else if(tab === "#activityTab"){
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/crm/leads/lead-activity.jsp','get',null,$("#studentDlg")).then(function (data) {
                                $(tab).html(data);
                                var activityService = new ActivityService();

                                var id = $(self.dataForm.contactId).val();
                                if(id.length === 0 ){
                                    id = null;
                                }
                                activityService.loadTable(id);
                            });
                        }
                    }
                });
            });
        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    LeadService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    LeadService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    LeadService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            self.framework.GenerateDropDownList($("[formControlName='responseId']"),self.lovMap.responseId);
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);

            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '98%',width:'98%',maxWidth:'98%',
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
            $("#leadDisqualifyDlg").jqxWindow({
                showCollapseButton: true, height: '300px',width:'500px',
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });

        });
    };
    LeadService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    LeadService.prototype.qualify = function () {
        var self = this;
        debugger;
        CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/lead_controller/qualify/'+$(this.dataForm.id).val()+"/"+$(this.dataForm.contactId).val(),'get',this.formDlg)
            .then(function( responseData ) {
                if (responseData["dataHeader"].messageType === 'SUCCESS') {
                    CommonService.notificationMessage('Lead Qualification',"Lead Qualified Successfully",false);
                    self.formDlg.jqxWindow('hide');
                    self.dataGrid.jqxGrid('gotopage', 0);


                    self.dataGrid.jqxGrid('updatebounddata','cell');
                }
            });
    };
    LeadService.prototype.disqualify = function () {
        var self = this;
        $("#ProcessDisqualify").on('click',function(){
            debugger;
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/lead_controller/disqualify/'+$(self.dataForm.id).val()+"/"+$("[formControlName='responseId']").val()+"/"+$(self.dataForm.contactId).val(),'get',self.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage('Lead Disqualify',"Lead Disqualified",false);
                        self.formDlg.jqxWindow('hide');
                        self.dataGrid.jqxGrid('gotopage', 0);


                        self.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        });
        $("#leadDisqualifyDlg").jqxWindow('open');
    };
    return LeadService;
}());