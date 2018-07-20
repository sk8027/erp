(function () {
    var service = new CourseInfoService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseInfoToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseInfo = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseInfo.Initialize();
})(jQuery);