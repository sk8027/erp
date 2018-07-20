(function () {
    var service = new CourseLectureAttendanceService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseLectureAttendanceToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AllPresent"){
            $.each(service.dataGrid.jqxGrid('getrows'),function(index,row){
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'present',true);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'absent',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'leave',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'attendance','P');
            });
        }else if(this.id === "AllAbsent"){
            $.each(service.dataGrid.jqxGrid('getrows'),function(index,row){
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'present',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'absent',true);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'leave',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'attendance','A');
            });
        }else if(this.id === "AllLeave"){
            $.each(service.dataGrid.jqxGrid('getrows'),function(index,row){
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'present',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'absent',false);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'leave',true);
                service.dataGrid.jqxGrid('setcellvalue',row.uid,'attendance','L');
            });
        }else if(this.id === "SaveBtn"){
            service.save();
        }
    });
    var courseLectureAttendance = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseLectureAttendance.Initialize();
})(jQuery);