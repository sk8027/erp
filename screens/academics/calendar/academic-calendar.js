(function () {
    var service = new AcademicCalendarService();
    var toolbar = $("#academicCalendarToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var academicCalendar = {
        Initialize : function(){
            service.loadTable();
        }
    };
    academicCalendar.Initialize();
})(jQuery);