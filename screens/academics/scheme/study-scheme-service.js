var StudySchemeService = (function () {
 function StudySchemeService() {
     /********************** Private Variables ******************************************/
     this.filterFields = ["programId","batchId"];
     this.lovMap = null;
     this.dataGrid = $("#studySchemeTable");
     this.formDlg = $("#studySchemeDlg");
     this.gridToolbar = $("#studySchemeToolbar");
     this.framework = new Framework();
     this.dataForm = {};
     this.listURL = CONTEXT_PATH + '/app/study_scheme_controller/list';
     this.deleteURL =  CONTEXT_PATH +'/app/study_scheme_controller/delete';
     this.saveURL = CONTEXT_PATH + '/app/study_scheme_controller/save';
     this.lovURL = CONTEXT_PATH + '/app/study_scheme_controller/refresh_page_lov';
     this.formURL = CONTEXT_PATH + '/screens/academics/scheme/study-scheme.edit.jsp';
     this.title = "Study Scheme";
     this.populateForm = function (data, lovMap) {
         if(data === null || data === undefined){
             data = {};
         }
         var self = this;
         $(this.dataForm.id).val((data.id === undefined || data.id === null )? null : data.id);
         if(lovMap == undefined ){
             $(this.dataForm.courseId).jqxDropDownList('clearSelection');
             $(this.dataForm.semesterId).jqxDropDownList('clearSelection');
             $(this.dataForm.status).jqxDropDownList('selectIndex', $(this.dataForm.status).jqxDropDownList('getItemByValue', 'A').index);
         }else{
             this.framework.GenerateDropDownList($(this.dataForm.courseId), lovMap.courseId);
             this.framework.GenerateDropDownList($(this.dataForm.semesterId), lovMap.semesterId);
             this.framework.GenerateDropDownList($(this.dataForm.status),lovMap.status);
         }

         if(data.courseId === undefined || data.courseId === null) {
             $(this.dataForm.courseId).jqxDropDownList('clearSelection');
         }else{
             $(this.dataForm.courseId).jqxDropDownList('selectIndex', $(this.dataForm.courseId).jqxDropDownList('getItemByValue', data.courseId).index);
         }
         $(this.dataForm.courseName).val((data.courseName === undefined || data.courseName === null )? null : data.courseName);
         if(data.semesterId=== undefined || data.semesterId === null) {
             $(this.dataForm.semesterId).jqxDropDownList('clearSelection');
         }else{

             $(this.dataForm.semesterId).jqxDropDownList('selectIndex', $(this.dataForm.semesterId).jqxDropDownList('getItemByValue', data.semesterId).index);
         }
         $(this.dataForm.semesterName).val((data.semesterName === undefined || data.semesterName === null )? null : data.semesterName);
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
         { name: 'batchId', type: 'int',gui:'hidden',label :'Batch Id' },
         { name: 'programId', type: 'int',gui:'hidden',label :'Program Id' },
         { name: 'courseId', type: 'int' ,label :'Course',gui:'list',labelAttribute:'courseName'},
         { name: 'courseName', type: 'string' ,label :'', gui:'skip'},
         { name: 'semesterId', type: 'int' ,label :'Semester',gui:'list',labelAttribute:'semesterName'},
         { name: 'semesterName', type: 'string' ,label :'', gui:'skip'},
         { name: 'status', type: 'string' ,label :'Status',gui:'list',labelAttribute : 'statusName'},
         { name: 'statusName', type: 'string' ,label :'Status', gui:'skip'},
         { name: 'statusName', type: 'string' ,label :'', gui:'skip'},
     ];

     /********************** Editable Popup Form Fields ******************************************/
     this.dataForm = this.framework.GenerateFormComponents(this);
 }

 /********************** Save Form Record ******************************************/
 StudySchemeService.prototype.save = function () {
     this.framework.SaveForm(this);
 };
 /********************** New Record******************************************/
 StudySchemeService.prototype.newRecord = function () {
     this.populateForm({});
 }
 /********************** Clear Form Fields For Update******************************************/
 StudySchemeService.prototype.clear = function () {
     this.populateForm({id: $(this.dataForm.id).val()});
 };

 /********************** Finding Record by Primary key ******************************************/
 StudySchemeService.prototype.getById = function (id) {
     var self = this;// getting class level reference inside ajax success
     $.get(this.formURL+"?batch="+$("#batchIdFilter").val()+"&program="+$("#programIdFilter").val()).done(function (data) {
         self.formDlg.find("span#dlgTitle").html("Study Scheme for  '" + $("#programIdFilter").jqxDropDownList('getSelectedItem').label+"' - '" + $("#batchIdFilter").jqxDropDownList('getSelectedItem').label+"'")+"";
         self.formDlg.find(".modal-body").html(data);
         self.formDlg.find(".dlg-content").html(data);
         self.formDlg.jqxWindow('open');
         // Populating the Form data
         if (id === undefined || id === null) {
             id = -1;
         }
         CommonService.sendAjaxRequest(CONTEXT_PATH + '/app/study_scheme_controller/find_by_id/' + id+"/"+$("#batchIdFilter").val(), 'get', null, $(".form-body")).done(function (data) {
             self.populateForm(data.data,data.lovMap);
         });
     });

 };

 /********************** Deleted Selected Rows from table ******************************************/
 StudySchemeService.prototype.deleteRows = function () {
     this.framework.DeleteSelectedRows(this);
 };

 /********************** Delete Single Record showing in Popup ******************************************/
 StudySchemeService.prototype.deleteRecord = function (id) {
     this.framework.DeleteRecord(this,id);
 };

 /********************** Load the table from Server ******************************************/
 StudySchemeService.prototype.loadTable = function () {
     var self = this;

     $.get(this.lovURL+"/-1").done(function (data) {
         self.lovMap = data.data;
         if(self.filterFields != undefined ){
             $.each(self.filterFields,function(index,item){
                 self.framework.GenerateDropDownList($("#"+item+"Filter"),self.lovMap[item]);
             });
             $('#programIdFilter').on('open', function (event) {

                 if($("#departmentIdFilter").val() > 0) {
                     $("#programIdFilter").jqxDropDownList('clear');

                     CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_programs/" + $("#departmentIdFilter").val(), 'get', null, $("#studySchemeTable")).then(function (data) {
                         $.each(data.data, function (item, department) {
                             $("#programIdFilter").jqxDropDownList('addItem', {
                                 label: department.label,
                                 value: department.value
                             });
                         });
                     })
                 }else{
                     $("#programIdFilter").jqxDropDownList('clear');

                 }
             });
             $('#batchIdFilter').on('open', function (event) {
                 if($("#programIdFilter").val() > 0) {
                     $("#batchIdFilter").jqxDropDownList('clear');
                     CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_batches/" + $("#programIdFilter").val(), 'get', null, $("#studySchemeTable")).then(function (data) {
                         $.each(data.data, function (item, lov) {
                             $("#batchIdFilter").jqxDropDownList('addItem', {
                                 label: lov.label,
                                 value: lov.value
                             });
                         });
                     })
                 }else{
                     $("#batchIdFilter").jqxDropDownList('clear');

                 }
             });
             $("#studySchemeFilter").on('click',function(){

                 if( $("#batchIdFilter").val() > 0 ) {

                         var filter =   new $.jqx.filter();
                         filter.addfilter(0, filter.createfilter('numericfilter', $("#batchIdFilter").val(), "EQUAL"));
                         self.dataGrid.jqxGrid('addfilter', "batchId", filter);


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
 StudySchemeService.prototype.refresh = function () {

     if(this.filterFields != undefined ) {
         $.each(this.filterFields, function (index, item) {
             $("#"+item+"Filter").jqxDropDownList('clearFilter');
             $("#"+item+"Filter").jqxDropDownList('clearSelection');
         });
     }

     this.framework.refreshGrid(this.dataGrid);
 };
 return StudySchemeService;
}());