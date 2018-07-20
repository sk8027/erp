(function () {
    var service = new CourseLectureService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseLectureToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseLecture = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseLecture.Initialize();
})(jQuery);