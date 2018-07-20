var OpportunityService = (function () {
    function OpportunityService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#opportunityTable");
        this.formDlg = $("#opportunityDlg");
        this.gridToolbar = $("#opportunityToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH + '/app/opportunity_controller/list';
        this.deleteURL =  CONTEXT_PATH +'/app/opportunity_controller/delete';
        this.saveURL = CONTEXT_PATH + '/app/opportunity_controller/save';
        this.lovURL = CONTEXT_PATH + '/app/opportunity_controller/refresh_page_lov';
        this.formURL = CONTEXT_PATH + '/screens/crm/opportunity/opportunity.edit.jsp';
        this.title = "Opportunity";
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
            if(lovMap == undefined){
                $(this.dataForm.opportunitySourceId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.opportunitySourceId), lovMap.opportunitySourceId);
            }
            if(data.opportunitySourceId === undefined || data.opportunitySourceId === null) {
                $(this.dataForm.opportunitySourceId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.opportunitySourceId).jqxDropDownList('selectIndex', $(this.dataForm.opportunitySourceId).jqxDropDownList('getItemByValue', data.opportunitySourceId).index);
            }
            $(this.dataForm.opportunitySourceName).val((data.opportunitySourceName === undefined || data.opportunitySourceName === null )? null : data.opportunitySourceName);
            $(this.dataForm.topic).val((data.topic === undefined || data.topic === null )? null : data.topic);
            $(this.dataForm.description).val((data.description === undefined || data.description === null )? null : data.description);
            $(this.dataForm.estimatedBudget).val((data.estimatedBudget === undefined || data.estimatedBudget === null )? null : data.estimatedBudget);
            if(lovMap == undefined){
                $(this.dataForm.purchaseProcessId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.purchaseProcessId), lovMap.purchaseProcessId);
            }
            if(data.purchaseProcessId === undefined || data.purchaseProcessId === null) {
                $(this.dataForm.purchaseProcessId).jqxDropDownList('clearSelection');
            }else{
                if(data.purchaseProcessId > 0) {
                    $(this.dataForm.purchaseProcessId).jqxDropDownList('selectIndex', $(this.dataForm.purchaseProcessId).jqxDropDownList('getItemByValue', data.purchaseProcessId).index);
                }
            }
            $(this.dataForm.purchaseProcessName).val((data.purchaseProcessName === undefined || data.purchaseProcessName === null )? null : data.purchaseProcessName);
            if(lovMap == undefined){
                $(this.dataForm.purchaseTimeId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.purchaseTimeId), lovMap.purchaseTimeId);
            }
            if(data.purchaseTimeId === undefined || data.purchaseTimeId === null) {
                $(this.dataForm.purchaseTimeId).jqxDropDownList('clearSelection');
            }else{
                if(data.purchaseTimeId > 0) {
                    $(this.dataForm.purchaseTimeId).jqxDropDownList('selectIndex', $(this.dataForm.purchaseTimeId).jqxDropDownList('getItemByValue', data.purchaseTimeId).index);
                }
            }
            $(this.dataForm.purchaseTimeName).val((data.purchaseTimeName === undefined || data.purchaseTimeName === null )? null : data.purchaseTimeName);
            if(lovMap == undefined){
                $(this.dataForm.opportunityStatusId).jqxDropDownList('clearSelection');
            }else {
                this.framework.GenerateDropDownList($(this.dataForm.opportunityStatusId), lovMap.opportunityStatusId);
            }
            if(data.opportunityStatusId === undefined || data.opportunityStatusId === null) {
                $(this.dataForm.opportunityStatusId).jqxDropDownList('clearSelection');
            }else{
                $(this.dataForm.opportunityStatusId).jqxDropDownList('selectIndex', $(this.dataForm.opportunityStatusId).jqxDropDownList('getItemByValue', data.opportunityStatusId).index);
            }
            $(this.dataForm.opportunityStatusName).val((data.opportunityStatusName === undefined || data.opportunityStatusName === null )? null : data.opportunityStatusName);
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
            { name: 'opportunitySourceId', type: 'int' ,label :'Opportunity Source',gui:'list',labelAttribute:'opportunitySourceName'},
            { name: 'opportunitySourceName', type: 'string' ,label :'', gui:'skip'},


            { name: 'estimatedBudget', type: 'string' ,label :'Est. Budget', gui:'hidden'},
            { name: 'purchaseProcessId', type: 'int' ,label :'Purchase Process',gui:'hidden'},
            { name: 'purchaseProcessName', type: 'string' ,label :'', gui:'skip'},
            { name: 'purchaseTimeId', type: 'int' ,label :'Est. Purchase Time',gui:'hidden'},
            { name: 'purchaseTimeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'opportunityStatusId', type: 'int' ,label :'Opportunity Status',gui:'hidden'},
            { name: 'opportunityStatusName', type: 'string' ,label :'', gui:'skip'},
        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    OpportunityService.prototype.save = function () {
        var self = this;
        var contact = {};

        var isValid = this.framework.validateForm($("#contactTab"));

        if(isValid){
            contact = this.framework.GetData($("#contactTab"));

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
    OpportunityService.prototype.newRecord = function () {
        this.populateForm({});
    }
    /********************** Clear Form Fields For Update******************************************/
    OpportunityService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    OpportunityService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        $.get(this.formURL).done(function (data) {
            self.formDlg.find(".modal-body").html(data);
            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id === undefined || id === null) {
                id = -1;
            }
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/opportunity_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (serverData) {
                self.populateForm(serverData.data,self.lovMap);

                         $("#workflowProgress").find("li").removeClass("active");
                         $("#workflowProgress").find("li[workflow='"+serverData.data.workflowStageId+"']").addClass("active");
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
                            CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/crm/opportunitys/opportunity-activity.jsp','get',null,$("#studentDlg")).then(function (data) {
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
    OpportunityService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    OpportunityService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    OpportunityService.prototype.loadTable = function () {
        var self = this;
        $.get(this.lovURL).done(function (data) {
            self.lovMap = data.data;
            self.framework.GenerateDropDownList($("[formControlName='responseId']"),self.lovMap.responseId);
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);

            self.formDlg.jqxWindow({
                showCollapseButton: true, height: '700px',width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
            $("#opportunityDisqualifyDlg").jqxWindow({
                showCollapseButton: true, height: '300px',width:'500px',
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });

        });
    };
    OpportunityService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    OpportunityService.prototype.qualify = function () {
        var self = this;
        debugger;
        CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/opportunity_controller/qualify/'+$(this.dataForm.id).val()+"/"+$(this.dataForm.contactId).val(),'get',this.formDlg)
            .then(function( responseData ) {
                if (responseData["dataHeader"].messageType === 'SUCCESS') {
                    CommonService.notificationMessage('Opportunity Qualification',"Opportunity Qualified Successfully",false);
                    self.formDlg.jqxWindow('hide');
                    self.dataGrid.jqxGrid('gotopage', 0);


                    self.dataGrid.jqxGrid('updatebounddata','cell');
                }
            });
    };
    OpportunityService.prototype.disqualify = function () {
        var self = this;
        $("#ProcessDisqualify").on('click',function(){
            debugger;
            CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/opportunity_controller/disqualify/'+$(self.dataForm.id).val()+"/"+$("[formControlName='responseId']").val()+"/"+$(self.dataForm.contactId).val(),'get',self.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage('Opportunity Disqualify',"Opportunity Disqualified",false);
                        self.formDlg.jqxWindow('hide');
                        self.dataGrid.jqxGrid('gotopage', 0);


                        self.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        });
        $("#opportunityDisqualifyDlg").jqxWindow('open');
    };
    return OpportunityService;
}());