(function () {
    var service = new CourseGlossaryService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseGlossaryToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseGlossary = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseGlossary.Initialize();
})(jQuery);