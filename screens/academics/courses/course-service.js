
var CourseService = (function () {
 function CourseService() {
     /********************** Private Variables ******************************************/
     this.filterFields = ["courseDepartmentId"];
     this.lovMap = null;
     this.dataGrid = $("#courseTable");
     this.formDlg = $("#courseDlg");
     this.gridToolbar = $("#courseToolbar");
     this.framework = new Framework();
     this.dataForm = {};
     this.listURL = CONTEXT_PATH + '/app/course_controller/list';
     this.deleteURL =  CONTEXT_PATH +'/app/course_controller/delete';
     this.saveURL = CONTEXT_PATH + '/app/course_controller/save';
     this.lovURL = CONTEXT_PATH + '/app/course_controller/refresh_page_lov';
     this.formURL = CONTEXT_PATH + '/screens/academics/courses/course.edit.jsp';
     this.title = "Course";
     this.populateForm = function (data, lovMap) {
         if(data === null || data === undefined){
             data = {};
         }
         debugger;
         var self = this;
         $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
         $(this.dataForm.courseCode).val((data.courseCode === undefined || data.courseCode === null )? null : data.courseCode);
         $(this.dataForm.courseTitle).val((data.courseTitle === undefined || data.courseTitle === null )? null : data.courseTitle);
         $(this.dataForm.creditHour).val((data.creditHour === undefined || data.creditHour === null )? null : data.creditHour);
         $(this.dataForm.creditHourLab).val((data.creditHourLab === undefined || data.creditHourLab === null )? null : data.creditHourLab);
         $(this.dataForm.courseDepartmentName).val((data.courseDepartmentName === undefined || data.courseDepartmentName === null )? null : data.courseDepartmentName);
         if(lovMap == undefined){
             $(this.dataForm.courseCategoryId).jqxDropDownList('clearSelection');
         }else {
             this.framework.GenerateDropDownList($(this.dataForm.courseCategoryId), lovMap.courseCategoryId);
         }
         if(data.courseCategoryId === undefined || data.courseCategoryId === null) {
             $(this.dataForm.courseCategoryId).jqxDropDownList('clearSelection');
         }else{
             $(this.dataForm.courseCategoryId).jqxDropDownList('selectIndex', $(this.dataForm.courseCategoryId).jqxDropDownList('getItemByValue', data.courseCategoryId).index);
         }
         $(this.dataForm.courseCategoryName).val((data.courseCategoryName === undefined || data.courseCategoryName === null )? null : data.courseCategoryName);
         if(lovMap == undefined){
             $(this.dataForm.courseLevelId).jqxDropDownList('clearSelection');
         }else {
             this.framework.GenerateDropDownList($(this.dataForm.courseLevelId), lovMap.courseLevelId);
         }
         if(data.courseLevelId === undefined || data.courseLevelId === null) {
             $(this.dataForm.courseLevelId).jqxDropDownList('clearSelection');
         }else{
             $(this.dataForm.courseLevelId).jqxDropDownList('selectIndex', $(this.dataForm.courseLevelId).jqxDropDownList('getItemByValue', data.courseLevelId).index);
         }
         $(this.dataForm.courseLevelName).val((data.courseLevelName === undefined || data.courseLevelName === null )? null : data.courseLevelName);
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
         { name: 'courseCode', type: 'string' ,label :'Code'},
         { name: 'courseTitle', type: 'string' ,label :'Title'},
         { name: 'creditHour', type: 'string' ,label :'Credit Hrs.'},
         { name: 'creditHourLab', type: 'string' ,label :'Lab Credit Hrs.'},
         { name: 'courseDepartmentId', type: 'int' ,label :'Department',gui:'hidden'},
         { name: 'courseDepartmentName', type: 'string' ,label :'', gui:'skip'},
         { name: 'courseCategoryId', type: 'int' ,label :'Category',gui:'list',labelAttribute:'courseCategoryName'},
         { name: 'courseCategoryName', type: 'string' ,label :'', gui:'skip'},
         { name: 'courseLevelId', type: 'int' ,label :'Lavel',gui:'list',labelAttribute:'courseLevelName'},
         { name: 'courseLevelName', type: 'string' ,label :'', gui:'skip'},
         { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
         { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
         { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
         
     ];

     /********************** Editable Popup Form Fields ******************************************/
     this.dataForm = this.framework.GenerateFormComponents(this);
 }

 /********************** Save Form Record ******************************************/
 CourseService.prototype.save = function () {
     //this.framework.SaveForm(this);
      var isValid = this.framework.validateForm(this.formDlg);
     var formData = {};
     if(isValid) {
         formData = this.framework.GetFormData(this);
         var prerequisites = $("#prerequisites").jqxListBox('getCheckedItems');
         var preList = [];
         if(prerequisites.length >0){
             $.each(prerequisites,function (index,item) {
                 preList.push({id:item.originalItem.id});
             });
             formData.prerequisites = preList;
         }
         var self = this;
         CommonService.sendAjaxRequest(this.saveURL,'post',JSON.stringify(formData),this.formDlg)
             .then(function( responseData ) {
                 if (responseData["dataHeader"].messageType === 'SUCCESS') {
                     self.formDlg.jqxWindow('close');
                      CommonService.toastMessage(self.title,"Record Saved Successfully");


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
 CourseService.prototype.newRecord = function () {
     this.populateForm({});
 }
 /********************** Clear Form Fields For Update******************************************/
 CourseService.prototype.clear = function () {
     this.populateForm({id: $(this.dataForm.id).val()});
 };

 /********************** Finding Record by Primary key ******************************************/
 CourseService.prototype.getById = function (id) {
     var self = this;// getting class level reference inside ajax success
     $.get(this.formURL+"?courseDepartment="+$("#departmentIdFilter").val()).done(function (data) {
         self.formDlg.find(".modal-body").html(data);
         self.formDlg.find(".dlg-content").html(data);
         self.formDlg.jqxWindow('open');
         // Populating the Form data
         if (id === undefined || id === null) {
             id = -1;
         }
         CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/course_controller/find_by_id/' + id, 'get', null, $(".form-body")).done(function (data) {
             self.populateForm(data.data,data.lovMap);
             if(data.data == null) {
                data.data = {prerequisites:[]};
             }
                 var source =
                     {

                         datatype: "json",
                         datafields: [
                             {name: 'id'},
                             {name: 'courseTitle'},
                             { name: "checked" }
                         ],
                         id: 'courseId',
                         localdata: JSON.stringify(data.data.prerequisites)
                     };

                 $("#prerequisites").jqxListBox({
                     theme: JQXTHEME,
                     source: new $.jqx.dataAdapter(source),
                     displayMember: "courseTitle",
                     valueMember: "courseId",
                     width: '100%',
                     height: 200,
                     checkboxes: true,
                     filterable:true,
                     searchMode:'contains'
                 });
            // $("#prerequisites").jqxListBox('checkIndex', 0);
            // $("#prerequisites").jqxListBox('checkIndex', 1);
         });

     });

 };

 /********************** Deleted Selected Rows from table ******************************************/
 CourseService.prototype.deleteRows = function () {
     this.framework.DeleteSelectedRows(this);
 };

 /********************** Delete Single Record showing in Popup ******************************************/
 CourseService.prototype.deleteRecord = function (id) {
     this.framework.DeleteRecord(this,id);
 };

 /********************** Load the table from Server ******************************************/
 CourseService.prototype.loadTable = function () {
     var self = this;
     $.get(this.lovURL).done(function (data) {
         self.lovMap = data.data;
         if(self.filterFields != undefined ){
             /*$.each(self.filterFields,function(index,item){
                 self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
             });*/
             $("#courseFilter").on('click',function(){
                 if( $("#departmentIdFilter").val() > 0 ) {

                         var filter =   new $.jqx.filter();
                         filter.addfilter(0, filter.createfilter('numericfilter', $("#departmentIdFilter").val(), "EQUAL"));
                         self.dataGrid.jqxGrid('addfilter', "courseDepartmentId", filter);


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
 CourseService.prototype.refresh = function () {
     if(this.filterFields != undefined ) {
         $.each(this.filterFields, function (index, item) {
             $("#"+item+"Filter").jqxDropDownList('clearFilter');
             $("#"+item+"Filter").jqxDropDownList('clearSelection');
         });
     }
     this.framework.refreshGrid(this.dataGrid);
 };
 return CourseService;
}());
