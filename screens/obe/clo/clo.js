(function () {
    var service = new CourseLearnObjectiveService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseLearnObjectiveToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseLearnObjective = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseLearnObjective.Initialize();
})(jQuery);