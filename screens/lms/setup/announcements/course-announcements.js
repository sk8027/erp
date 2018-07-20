(function () {
    var service = new CourseAnnouncementService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseAnnouncementToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseAnnouncement = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseAnnouncement.Initialize();
})(jQuery);