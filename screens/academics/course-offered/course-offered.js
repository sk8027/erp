(function () {
    var service = new CourseOfferedService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseOfferedToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseOffered = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseOffered.Initialize();
})(jQuery);