(function () {
    var service = new CourseLinkService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseLinkToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseLink = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseLink.Initialize();
})(jQuery);