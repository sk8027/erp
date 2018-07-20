(function () {
    var service = new CourseOutlineService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseOutlineToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseOutline = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseOutline.Initialize();
})(jQuery);