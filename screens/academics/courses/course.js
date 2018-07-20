(function () {
    var service = new CourseService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var course = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    course.Initialize();
})(jQuery);