(function () {
    var service = new CourseDownloadService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseDownloadToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseDownload = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseDownload.Initialize();
})(jQuery);