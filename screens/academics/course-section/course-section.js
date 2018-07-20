(function () {
    var service = new CourseSectionService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseSectionToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseSection = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseSection.Initialize();
})(jQuery);