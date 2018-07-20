var ContactService = (function () {
    function ContactService() {
        /********************** Private Variables ******************************************/
        this.filterFields = ["campusId","schoolId","departmentId","programId","studentStatusId"];
        this.lovMap = null;
        this.dataGrid = $("#studentTable");
        this.formDlg = $("#studentDlg");
        this.gridToolbar = $("#studentToolbar");
        this.framework = new Framework();
        this.dataForm = {};
        this.listURL = CONTEXT_PATH+'/app/StudentController/list';
        this.deleteURL = CONTEXT_PATH+'/app/StudentController/delete';
        this.saveURL = CONTEXT_PATH+'/app/StudentController/save';
        this.lovURL = CONTEXT_PATH+'/app/StudentController/refreshPageLOV';
        this.formURL = CONTEXT_PATH+'/screens/academics/contacts/contact.edit.jsp';
        this.title = "Student";
        this.populateForm = function (data, lovMap) {
            var self = this;
            
            if(data.photo != null) {
                $(this.dataForm.photo).attr("src", "data:image/PNG;base64," + data.photo);
                $(this.dataForm.photo).css("height","200px");
                $(this.dataForm.photo).css("width","160px");
            }
            $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);

            $(this.dataForm.crNo).val((data.crNo === undefined || data.crNo === null )? null : data.crNo);
            $(this.dataForm.firstName).val((data.firstName === undefined || data.firstName === null )? null : data.firstName);
            $(this.dataForm.middleName).val((data.middleName === undefined || data.middleName === null )? null : data.middleName);
            $(this.dataForm.lastName).val((data.lastName === undefined || data.lastName === null )? null : data.lastName);
            $(this.dataForm.contactTitle).val((data.contactTitle === undefined || data.contactTitle === null )? null : data.contactTitle);
            $(this.dataForm.fatherName).val((data.fatherName === undefined || data.fatherName === null )? null : data.fatherName);
            $(this.dataForm.fatherCnic).val((data.fatherCnic === undefined || data.fatherCnic === null )? null : data.fatherCnic);
            $(this.dataForm.gender).val((data.gender === undefined || data.gender === null )? null : data.gender);
            $(this.dataForm.dateOfBirth).val((data.dateOfBirth === undefined || data.dateOfBirth === null )? null : self.framework.FormatDate(new Date(data.dateOfBirth)));
            $(this.dataForm.cnic).val((data.cnic === undefined || data.cnic === null )? null : data.cnic);
            $(this.dataForm.maritalStatus).val((data.maritalStatus === undefined || data.maritalStatus === null )? null : data.maritalStatus);

            $(this.dataForm.enrollmentId).val((data.student.enrollmentId === undefined || data.student.enrollmentId === null )? null : data.student.enrollmentId);

            $(this.dataForm.enrollmentDate).val((data.student.enrollmentDate === undefined || data.student.enrollmentDate === null )? null : self.framework.FormatDate(new Date(data.student.enrollmentDate)));
            if(data.student.campusId === undefined || data.student.campusId === null) {
                $(this.dataForm.campusId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.campusId), lovMap.campusId);
                $(this.dataForm.campusId).jqxDropDownList('selectIndex', $(this.dataForm.campusId).jqxDropDownList('getItemByValue', data.student.campusId).index);
            }
            $(this.dataForm.campusName).val((data.student.campusName === undefined || data.student.campusName === null )? null : data.student.campusName);
            if(data.student.schoolId === undefined || data.student.schoolId === null) {
                $(this.dataForm.schoolId).jqxDropDownList('clearSelection');
            }else{

                this.framework.GenerateDropDownList($(this.dataForm.schoolId), lovMap.schoolId);
                $(this.dataForm.schoolId).jqxDropDownList('selectIndex', $(this.dataForm.schoolId).jqxDropDownList('getItemByValue', data.student.schoolId).index);
            }
            $(this.dataForm.schoolName).val((data.student.schoolName === undefined || data.student.schoolName === null )? null : data.student.schoolName);
            if(data.student.departmentId === undefined || data.student.departmentId === null) {
                $(this.dataForm.departmentId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.departmentId), lovMap.departmentId);
                $(this.dataForm.departmentId).jqxDropDownList('selectIndex', $(this.dataForm.departmentId).jqxDropDownList('getItemByValue', data.student.departmentId).index);
            }
            $(this.dataForm.departmentName).val((data.student.departmentName === undefined || data.student.departmentName === null )? null : data.student.departmentName);
            if(data.student.programId === undefined || data.student.programId === null) {
                $(this.dataForm.programId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.programId), lovMap.programId);
                $(this.dataForm.programId).jqxDropDownList('selectIndex', $(this.dataForm.programId).jqxDropDownList('getItemByValue', data.student.programId).index);
            }
            $(this.dataForm.programName).val((data.student.programName === undefined || data.student.programName === null )? null : data.student.programName);
            if(data.student.batchId === undefined || data.student.batchId === null) {
                $(this.dataForm.batchId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.batchId), lovMap.batchId);
                $(this.dataForm.batchId).jqxDropDownList('selectIndex', $(this.dataForm.batchId).jqxDropDownList('getItemByValue', data.student.batchId).index);
            }
            $(this.dataForm.batchName).val((data.student.batchName === undefined || data.student.batchName === null )? null : data.student.batchName);
            if(data.student.currentSemesterId === undefined || data.student.currentSemesterId === null) {
                $(this.dataForm.currentSemesterId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.currentSemesterId), lovMap.currentSemesterId);
                $(this.dataForm.currentSemesterId).jqxDropDownList('selectIndex', $(this.dataForm.currentSemesterId).jqxDropDownList('getItemByValue', data.student.currentSemesterId).index);
            }
            $(this.dataForm.currentSemesterName).val((data.student.currentSemesterName === undefined || data.student.currentSemesterName === null )? null : data.student.currentSemesterName);
            if(data.student.studentCategoryId === undefined || data.student.studentCategoryId === null) {
                $(this.dataForm.studentCategoryId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.studentCategoryId), lovMap.studentCategoryId);
                $(this.dataForm.studentCategoryId).jqxDropDownList('selectIndex', $(this.dataForm.studentCategoryId).jqxDropDownList('getItemByValue', data.student.studentCategoryId).index);
            }
            $(this.dataForm.studentCategoryName).val((data.student.studentCategoryName === undefined || data.student.studentCategoryName === null )? null : data.student.studentCategoryName);
            if(data.student.studentStatusId === undefined || data.student.studentStatusId === null) {
                $(this.dataForm.studentStatusId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.studentStatusId), lovMap.studentStatusId);
                $(this.dataForm.studentStatusId).jqxDropDownList('selectIndex', $(this.dataForm.studentStatusId).jqxDropDownList('getItemByValue', data.student.studentStatusId).index);
            }
            $(this.dataForm.studentStatusName).val((data.student.studentStatusName === undefined || data.student.studentStatusName === null )? null : data.student.studentStatusName);
            $(this.dataForm.statusChangeRemarks).val((data.student.statusChangeRemarks === undefined || data.student.statusChangeRemarks === null )? null : data.student.statusChangeRemarks);
            if(data.student.paymentSchemeId === undefined || data.student.paymentSchemeId === null) {
                $(this.dataForm.paymentSchemeId).jqxDropDownList('clearSelection');
            }else{
                this.framework.GenerateDropDownList($(this.dataForm.paymentSchemeId), lovMap.paymentSchemeId);
                $(this.dataForm.paymentSchemeId).jqxDropDownList('selectIndex', $(this.dataForm.paymentSchemeId).jqxDropDownList('getItemByValue', data.student.paymentSchemeId).index);
            }
            $(this.dataForm.paymentSchemeName).val((data.student.paymentSchemeName === undefined || data.student.paymentSchemeName === null )? null : data.student.paymentSchemeName);
            $(this.dataForm.remarks).val((data.student.remarks === undefined || data.student.remarks === null )? null : data.student.remarks);


            this.formDlg.on("change",function(){
                self.formDlg.attr("data-changed","true");
            });
            if(data.id > 0 ){
                this.formDlg.find("#DeleteBtn").removeAttr("disabled");
            }else {
                this.formDlg.find("#DeleteBtn").attr("disabled","disabled");
            }
            $(".page-message-area").html("");
            $(this.dataForm.campusId).on('change', function (event) {
                $(self.dataForm.schoolId).jqxDropDownList('clearSelection');
                $(self.dataForm.departmentId).jqxDropDownList('clearSelection');
                $(self.dataForm.programId).jqxDropDownList('clearSelection');
                $(self.dataForm.batchId).jqxDropDownList('clearSelection');
                $(self.dataForm.currentSemesterId).jqxDropDownList('clearSelection');

            });

            $(this.dataForm.schoolId).on('open', function (event) {

                 if($(self.dataForm.campusId).val() > 0) {
                    $(self.dataForm.schoolId).jqxDropDownList('clear');
                    CommonService.sendAjaxRequest("/app/CommonController/get_schools/" + $(self.dataForm.campusId).val(), 'get', null, $("#studentTable")).then(function (data) {
                        $.each(data.data, function (item, school) {
                            $("[formControlName='schoolId']").jqxDropDownList('addItem', {
                                label: school.label,
                                value: school.value
                            });
                        });
                    })
                }else{
                    $(self.dataForm.schoolId).jqxDropDownList('clear');
                }
            });
            $(this.dataForm.departmentId).on('open', function (event) {

                if($(self.dataForm.schoolId).val() > 0) {
                    $(self.dataForm.departmentId).jqxDropDownList('clear');
                    CommonService.sendAjaxRequest("/app/CommonController/get_departments/" + $(self.dataForm.schoolId).val(), 'get', null, $("#studentTable")).then(function (data) {
                        $.each(data.data, function (item, dpt) {
                            $("[formControlName='departmentId']").jqxDropDownList('addItem', {
                                label: dpt.label,
                                value: dpt.value
                            });
                        });
                    })
                }else{
                    $(self.dataForm.schoolId).jqxDropDownList('clear');
                }
            });
            $(this.dataForm.programId).on('open', function (event) {

                if($(self.dataForm.departmentId).val() > 0) {
                    $(self.dataForm.programId).jqxDropDownList('clear');
                    CommonService.sendAjaxRequest("/app/CommonController/get_programs/" + $(self.dataForm.departmentId).val(), 'get', null, $("#studentTable")).then(function (data) {
                        $.each(data.data, function (item, program) {
                            $("[formControlName='programId']").jqxDropDownList('addItem', {
                                label: program.label,
                                value: program.value
                            });
                        });
                    })
                }else{
                    $(self.dataForm.schoolId).jqxDropDownList('clear');
                }
            });
            $("#contactInfo li").on('click',function(){

                var tab = $(this).find("a").attr("href");
                if($(tab).html().trim().length === 0){
                    if(tab === "#contactAddressTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-address.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var addressService = new ContactAddressService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            addressService.loadTable(id);
                        });
                    }else if(tab === "#contactCommunicationTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-communication.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var communicationService = new ContactCommunicationService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            communicationService.loadTable(id);
                        });
                    }else if(tab === "#contactIdentityTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-identity.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var identityService = new ContactIdentityService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            identityService.loadTable(id);
                        });
                    }else if(tab === "#contactQualificationTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-qualification.jsp','get',null,$("#studentDlg")).then(function (data) {
                        $(tab).html(data);
                        var qualService = new ContactQualificationService();

                        var id = $(self.dataForm.id).val();
                        if(id.length === 0 ){
                            id = null;
                        }
                        qualService.loadTable(id);
                        });
                    }else if(tab === "#contactSkillTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-skill.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var skillService = new ContactSkillService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            skillService.loadTable(id);
                        });
                    }else if(tab === "#contactInterestTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-interest.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var intService = new ContactInterestService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            intService.loadTable(id);
                        });
                    }else if(tab === "#contactExperienceTab"){
                        CommonService.sendAjaxRequest(CONTEXT_PATH+'/screens/academics/contacts/contact-experience.jsp','get',null,$("#studentDlg")).then(function (data) {
                            $(tab).html(data);
                            var experienceService = new ContactExperienceService();

                            var id = $(self.dataForm.id).val();
                            if(id.length === 0 ){
                                id = null;
                            }
                            experienceService.loadTable(id);
                        });
                    }
                }
            });
        }
        /********************** Table Fields ******************************************/
        this.fields = [
            { name: 'id', type: 'int',gui:'hidden',label :'Id' },
            { name: 'photo', type: 'int',gui:'skip',label :'Photo' },
            { name: 'enrollmentId', type: 'string' ,label :'Enrollment #'},
            { name: 'enrollmentDate', type: 'string',gui:'skip' ,label :'Enrollment Date'},
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
            { name: 'studentStatusName', type: 'string' ,label :'Status', filterable:false},
            { name: 'crNo', type: 'string',gui:"skip" ,label :'CR #'},
            { name: 'firstName', type: 'string',gui:"skip" ,label :'First Name'},
            { name: 'middleName', type: 'string',gui:"skip" ,label :'Middle Name'},
            { name: 'lastName', type: 'string',gui:"skip" ,label :'Last Name'},
            { name: 'contactTitle', type: 'string',gui:"skip" ,label :'Contact Title'},
            { name: 'fatherName', type: 'string',gui:"skip" ,label :'Father Name'},
            { name: 'fatherCnic', type: 'string',gui:"skip" ,label :'Father CNIC'},
            { name: 'gender', type: 'string',gui:"skip" ,label :'Gender'},
            { name: 'dateOfBirth', type: 'string',gui:"skip" ,label :'Date of Birth'},
            { name: 'cnic', type: 'string',gui:"skip" ,label :'CNIC'},
            { name: 'maritalStatus', type: 'string',gui:"skip" ,label :'Marital Status'}


        ];

        /********************** Editable Popup Form Fields ******************************************/
        this.dataForm = this.framework.GenerateFormComponents(this);
    }

    /********************** Save Form Record ******************************************/
    ContactService.prototype.save = function () {
        var contact = {};

        var isValid = this.framework.validateForm($("#contactTab"));

        if(isValid){
            contact = this.framework.GetData($("#contactTab"));
            isValid = this.framework.validateForm($("#studentTab"));
            if(isValid){
                contact.student = this.framework.GetData($("#studentTab"));
                $('a[href^="#studentTab"]').parent().css("border-top","");
                
                if(window.ContactAddressService){
                    var addressService = new ContactAddressService();
                    var address = addressService.GetData();
                    if(address.validation == false){ // Address is Invalid
                        isValid = false;
                        $('a[href^="#contactAddressTab"]').click();
                    }else{
                        contact.addresses = address;
                    }
                }
                if(isValid && window.ContactCommunicationService){
                    var communicationService = new ContactCommunicationService();
                    var comm = communicationService.GetData();
                    if(comm.validation == false){// Invalid Communication
                        isValid = false;
                        $('a[href^="#contactCommunicationTab"]').click();
                    }else{
                        contact.communications = comm;
                    }

                }
                if(isValid && window.ContactIdentityService){
                    var identityService = new ContactIdentityService();
                    var identities = identityService.GetData();
                    if(identities.validation == false){// Invalid Identitities
                        isValid = false;
                        $('a[href^="#contactIdentityTab"]').click();
                    }else{
                        contact.identities = identities;
                    }

                }

                if(isValid && window.ContactQualificationService){
                    var qualService = new ContactQualificationService();
                    var quals = qualService.GetData();
                    if(quals.validation == false){// Invalid Qualifications
                        isValid = false;
                        $('a[href^="#contactQualificationTab"]').click();
                    }else{
                        contact.qualifications = quals;
                    }

                }

                if(isValid && window.ContactSkillService){
                    var skillService = new ContactSkillService();
                    var skills = skillService.GetData();
                    if(skills.validation == false){// Invalid Skills
                        isValid = false;
                        $('a[href^="#contactSkillTab"]').click();
                    }else{
                        contact.skills = quals;
                    }

                }

                if(isValid && window.ContactInterestService){
                    var intrService = new ContactInterestService();
                    var interests = intrService.GetData();
                    if(interests.validation == false){// Invalid Interests
                        isValid = false;
                        $('a[href^="#contactInterestTab"]').click();
                    }else{
                        contact.interests = interests;
                    }

                }
                if(isValid && window.ContactExperienceService){
                    var expService = new ContactExperienceService();
                    var experiences = expService.GetData();
                    if(experiences.validation == false){// Invalid Interests
                        isValid = false;
                        $('a[href^="#contactExperienceTab"]').click();
                    }else{
                        contact.experiences = experiences;
                    }

                }
            }else{// Student Tab is invalid
                isValid = false;
                $('a[href^="#studentTab"]').click();
                $('a[href^="#studentTab"]').parent().css("border-top","3px solid red");
            }


        }
        if(isValid){
            console.log(JSON.stringify(contact));
        }else{
            CommonService.errorMessage("Validation Error","Required Fields Are Missing");
        }
        /*

        var commService = new ContactCommunicationService();
        console.log(commService.GetData());
        console.log(addressService.GetData());
        var service = new ContactInterestService();
        console.log(service.GetData());
        this.framework.SaveForm(this);*/
    };
    /********************** New Record******************************************/
    ContactService.prototype.newRecord = function () {

         this.populateForm({student:{},employee:{}});
    }
    /********************** Clear Form Fields For Update******************************************/
    ContactService.prototype.clear = function () {
        this.populateForm({id: $(this.dataForm.id).val(),student:{},employee:{}});
    };

    /********************** Finding Record by Primary key ******************************************/
    ContactService.prototype.getById = function (id,contactType) {

        var self = this;// getting class level reference inside ajax success
        CommonService.sendAjaxRequest(this.formURL+"?type="+contactType, 'get', null, $(".form-body")).then(function (data) {
            self.formDlg.find(".dlg-content").html(data);
             self.formDlg.jqxWindow('open');
            // Populating the Form data
                if(contactType === "STD") {
                    if (id !== undefined && id !== null) {
                        CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/contact_controller/get_student/'+id, 'get', null, $(".form-body")).then(function (data) {
                            self.populateForm(data.data,data.lovMap);
                        });
                    }else {
                        CommonService.sendAjaxRequest('/app/contact_controller/refresh_student_lov', 'get', null, $(".form-body")).then(function (data) {
                            self.lovMap = data.data;

                            self.framework.GenerateDropDownList($(self.dataForm.campusId), self.lovMap.campusId);
                            self.framework.GenerateDropDownList($(self.dataForm.schoolId), self.lovMap.schoolId);
                            self.framework.GenerateDropDownList($(self.dataForm.departmentId), self.lovMap.departmentId);
                            self.framework.GenerateDropDownList($(self.dataForm.programId), self.lovMap.programId);
                            self.framework.GenerateDropDownList($(self.dataForm.batchId), self.lovMap.batchId);
                            self.framework.GenerateDropDownList($(self.dataForm.currentSemesterId), self.lovMap.currentSemesterId);
                            self.framework.GenerateDropDownList($(self.dataForm.studentCategoryId), self.lovMap.studentCategoryId);
                            self.framework.GenerateDropDownList($(self.dataForm.studentStatusId), self.lovMap.studentStatusId);
                            self.framework.GenerateDropDownList($(self.dataForm.paymentSchemeId), self.lovMap.paymentSchemeId);


                            self.clear();
                        });
                    }
                }


        });

    };

    /********************** Deleted Selected Rows from table ******************************************/
    ContactService.prototype.deleteRows = function () {
        this.framework.DeleteSelectedRows(this);
    };

    /********************** Delete Single Record showing in Popup ******************************************/
    ContactService.prototype.deleteRecord = function (id) {
        this.framework.DeleteRecord(this,id);
    };


    ContactService.prototype.refresh = function () {
        this.framework.refreshGrid(this.dataGrid);
    };
    return ContactService;
}());
