var UserService = (function () {
    function UserService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#userTable");
        this.formDlg = $("#userDlg");
        this.gridToolbar = $("#userToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH +'/app/UserController/list';
        this.deleteURL = CONTEXT_PATH +'/app/UserController/delete';
        this.saveURL = CONTEXT_PATH + '/app/UserController/save';
        this.lovURL = CONTEXT_PATH + '/app/UserController/refreshPageLOV';
        this.formURL = CONTEXT_PATH + '/screens/core/users/user.edit.jsp';
        this.title = "User";
        this.populateForm = function (data, lovMap) {
            $(".page-message-area").html("");

             var treeData = data.accessTree;
            var treeSource = {
                datatype: 'json',
                datafields: [
                    { name: 'id' },
                    { name: 'parentId' },
                    { name: 'text' },
                     { name: 'value' },
                    { name: 'checked' }


                ],
                id: 'id',
                localdata:  treeData


            };

            var dataAdapter = new jqx.dataAdapter(treeSource, { autoBind: true });

            var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'text', map: 'label' }]);
            $('#userDtpAccess').jqxTree({ theme: JQXTHEME, source: records, width: '100%',hasThreeStates: true, checkboxes: true});
            $('#userDtpAccess').jqxTree('expandAll');
            var self = this;
            if(data.contact !== null && data.contact !== undefined){
                $("#profileLeft").show();
                $("#userDetail").show();
                if(data.loginId === undefined || data.loginId === null){
                    $(this.dataForm.loginId).val(data.contact.crNo);
                    $(this.dataForm.loginId).css('background','#f3f309');
                }else{
                    $(this.dataForm.loginId).val(data.loginId);
                    $(this.dataForm.loginId).css('background','');
                }

                
                $("[labelControlName='contactName']").html(data.contact.firstName + " " + data.contact.lastName );
                var gender = "<i class=\"fa fa-male\"></i>";
                if(data.contact.gender === "F"){
                    gender = "<i class=\"fa fa-female\"></i>";
                }

                    $("[labelControlName='contactTypeName']").html(data.contact.contactTypeName +"  " + gender);
                $("[labelControlName='crNo']").html(data.contact.crNo);
                $("[labelControlName='cnic']").html(data.contact.cnic);
                $("[labelControlName='fatherName']").html(data.contact.fatherName);
                var detail ="";
                if(data.contact.contactTypeValue === "STD"){
                    $("[labelControlName='profileTitle']").html("Academics");

                    detail = "<span class=\"profile-desc-text\"> "+data.student.departmentName+"</span>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Program :  <span class='profile-desc-text'> "+data.student.programName+"</span></div>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Session :  <span class='profile-desc-text'> "+data.student.sessionNo+"</span></div>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Status :  <span class='profile-desc-text'> "+data.student.studentStatusName+"</span></div>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Current Semester:  <span class='profile-desc-text'> "+data.student.currentSemesterId+"</span></div>";


                    $("[labelControlName='profileDetail']").html(detail);

                }else if(data.contact.contactTypeValue === "EMP"){
                    $("[labelControlName='profileTitle']").html("Departmental");
                    detail = "<span class=\"profile-desc-text\"> "+data.employee.departmentName+"</span>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Employee Type :  <span class='profile-desc-text'> "+data.employee.employeeTypeName+"</span></div>";
                    detail += "<div class='uppercase profile-stat-text' style='text-align: left;'> Title :  <span class='profile-desc-text'> "+data.employee.positionName+"</span></div>";
                    $("[labelControlName='profileDetail']").html(detail);
                }
                //profileCommunication
                var comm ="";
                if( data.communications !== null ){
                    $.each(data.communications, function(index,item){
                        comm += "<div class='uppercase profile-stat-text' style='text-align: left;'> "+item.commTypeName+" :  <span class='profile-desc-text'> "+item.value+"</span></div>";
                    });
                    $("[labelControlName='profileCommunication']").html(comm);
                }
            }
            $(this.dataForm.id).val((data.id === undefined || data.id === null) ? null : data.id);

            if(data.userTypeId === undefined || data.userTypeId === null) {
                $(this.dataForm.userTypeId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.userTypeId), lovMap.userTypeId);
                $(this.dataForm.userTypeId).jqxDropDownList('selectIndex', $(this.dataForm.userTypeId).jqxDropDownList('getItemByValue', data.userTypeId).index);
            }
            $(this.dataForm.userTypeName).val(data.userTypeName === undefined ?null : data.userTypeName);
            if(data.userLevelId === undefined || data.userLevelId === null) {
                $(this.dataForm.userLevelId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.userLevelId), lovMap.userLevelId);
                $(this.dataForm.userLevelId).jqxDropDownList('selectIndex', $(this.dataForm.userLevelId).jqxDropDownList('getItemByValue', data.userLevelId).index);
            }
             $(this.dataForm.userLevelName).val((data.userLevelName === undefined || data.userLevelName === null) ?null : data.userLevelName);

            $(this.dataForm.contactTypeName).val((data.contactTypeName === undefined || data.contactTypeName === null) ? null : data.contactTypeName);
            if(data.contact !== undefined) {
                $(this.dataForm.contactId).val(data.contact.id);
            }
            $(this.dataForm.registrationNo).val((data.registrationNo === undefined || data.registrationNo === null) ? null : data.registrationNo);

            if(data.userStatusId === undefined || data.userStatusId === null) {
                $(this.dataForm.userStatusId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.userStatusId), lovMap.userStatusId);
                $(this.dataForm.userStatusId).jqxDropDownList('selectIndex', $(this.dataForm.userStatusId).jqxDropDownList('getItemByValue', data.userStatusId).index);
            }
            $(this.dataForm.userStatusName).val((data.userStatusName === undefined || data.userStatusName === null )? null : data.userStatusName);
            $(this.dataForm.userPassword).val(data.userPassword === undefined ?null : data.userPassword);

            $(this.dataForm.activationDate).val((data.activationDate === undefined || data.activationDate === null) ? null : self.framework.FormatDate(new Date(data.activationDate)));
            $(this.dataForm.passwordExpiryDate).val((data.passwordExpiryDate === undefined || data.passwordExpiryDate === null ) ? null : self.framework.FormatDate(new Date(data.passwordExpiryDate)));
            $(this.dataForm.loginExpiryDate).val((data.loginExpiryDate === undefined || data.loginExpiryDate === null)?null : self.framework.FormatDate(new Date(data.loginExpiryDate)));

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
            { name: 'registrationNo', type: 'string' ,label :'Registration #'},
            { name: 'contactTypeId', type: 'int' ,label :'Contact Type',gui:'list',labelAttribute:'contactTypeName'},
            { name: 'contactTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'userTypeId', type: 'int' ,label :'User Type',gui:'list',labelAttribute:'userTypeName'},
            { name: 'userTypeName', type: 'string' ,label :'', gui:'skip'},
            { name: 'userLevelId', type: 'int' ,label :'User Level',gui:'list',labelAttribute:'userLevelName'},
            { name: 'userLevelName', type: 'string' ,label :'', gui:'skip'},
            { name: 'contactName', type: 'string' ,label :'Contact'},
            { name: 'contactId', type: 'int' ,label :'', gui:'hidden'},
            { name: 'loginId', type: 'string' ,label :'Login'},

            { name: 'userStatusId', type: 'int' ,label :'User Status',gui:'list',labelAttribute:'userStatusName'},
            { name: 'userStatusName', type: 'string' ,label :'', gui:'skip'},
            { name: 'activationDate', type: 'string' ,label :'', gui:'skip'},
            { name: 'passwordExpiryDate', type: 'string' ,label :'', gui:'skip'},
            { name: 'loginExpiryDate', type: 'string' ,label :'', gui:'skip'},

        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    UserService.prototype.save = function () {
        
        var self= this;
        var isValid = this.framework.validateForm(this.formDlg);
        if(isValid){
            var formData = this.framework.GetFormData(this);
            var checkedItems = $("#userDtpAccess").jqxTree('getCheckedItems');
            var accessList = [];
            $.each(checkedItems,function (index,dpt) {
               accessList.push({departmentId:dpt.value})
            });
        formData.accessList = accessList;
            CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(formData),this.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage(self.title,"Record Saved Successfully");
                        self.formDlg.modal('hide');

                        if(formData.id > 0){
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagenum);

                        }else{
                            self.dataGrid.jqxGrid('gotopage', self.dataGrid.jqxGrid('getpaginginformation').pagescount -1);
                        }

                        self.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        }
    };
    /********************** New Record******************************************/
    UserService.prototype.newRecord = function () {
        
        this.populateForm({});
        $("#filterRow").show();
        $("#userDetail").hide();
        $("#profileLeft").hide();
        $(this.dataForm.contactTypeId).jqxDropDownList('clearSelection');
        $("[formControlName='searchBy']").jqxDropDownList('clearSelection');
        $("[formControlName='searchValue']").val("");
    }
    /********************** Clear Form Fields For Update******************************************/
    UserService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val()});
    };

    /********************** Finding Record by Primary key ******************************************/
    UserService.prototype.getById = function (id) {
        var self = this;// getting class level reference inside ajax success
        CommonService.sendAjaxRequest(this.formURL,'get').then(function( data ) {

            self.formDlg.find(".dlg-content").html(data);
            self.formDlg.jqxWindow('open');
            // Populating the Form data
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/UserController/find_by_id/' + id,'get',null,$(".form-body")).then(function( data) {

                    self.populateForm(data.data,data.lovMap);
                    $("#filterRow").hide();
                });
            }else {
                $("#filterRow").show();
                self.framework.GenerateDropDownList($(self.dataForm.userTypeId),self.lovMap.userTypeId);
                self.framework.GenerateDropDownList($(self.dataForm.userLevelId),self.lovMap.userLevelId);
                self.framework.GenerateDropDownList($(self.dataForm.contactTypeId),self.lovMap.contactTypeId);
                self.framework.GenerateDropDownList($("[formControlName='searchBy']"),[{label:'Id', value:'id'},{label:'Registration #', value:'crNo'}, {label:'National Id', value:'nationalId'}]);
                self.framework.GenerateDropDownList($(self.dataForm.userStatusId),self.lovMap.userStatusId);

                self.clear();

            }
        });

    };

    /********************** Finding Record by Contact Id ******************************************/
    UserService.prototype.getByContactId = function () {
        var contactTypeId = $("[formControlName='contactTypeId']").val();
        
        if(contactTypeId.length === 0  || isNaN(contactTypeId)){
            contactTypeId = parseInt(0);
        }
        var searchBy = $("[formControlName='searchBy']").val();
        var searchValue = $("[formControlName='searchValue']").val();

        if(searchValue.length === 0 ){
            CommonService.errorMessage("Validation Error","Enter a value to Search");

        }else if(searchBy.length === 0 ){
            CommonService.errorMessage("Validation Error","Select 'Search By' Field");

        }else if(searchBy === "id" && isNaN(searchValue)){
            CommonService.errorMessage("Validation Error","Validation Error","Id must be a numeric field");
        }else if(searchBy !== "id" && contactTypeId === 0) {
            CommonService.errorMessage("Validation Error","Choose a Contact Type to search ");
        }else {
            var self = this;// getting class level reference inside ajax success
            if (id !== undefined && id !== null) {
                CommonService.sendAjaxRequest(CONTEXT_PATH +'/app/UserController/find_by_contact/' + contactTypeId + '/' + searchBy + '/' + searchValue, 'get', null, $(".form-body")).then(function (responseData) {
                    if(responseData.data.id > 0) {
                        self.populateForm(responseData.data, responseData.lovMap);
                        $("#filterRow").hide();
                    }else{
                        CommonService.errorMessage("Search Error","No Record Found against ' "+searchValue+"'");
                    }
                });
            }
        }

    };
    /********************** Deleted Selected Rows from table ******************************************/
    UserService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    UserService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };

    /********************** Load the table from Server ******************************************/
    UserService.prototype.loadTable = function () {
        var self = this;
        CommonService.sendAjaxRequest(this.lovURL,'get').then(function( data ) {
            self.lovMap = data.data;
            self.framework.PopulateGrid (self);
            var width = ($(window).width()-50);
            var height = ($(window).height()-50);
            self.formDlg.jqxWindow({
                showCollapseButton: true, height: height,width:width,maxWidth:width,
                isModal:true,
                theme : JQXTHEME,
                autoOpen: false
            });
        });
    };
    UserService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return UserService;
}());
