(function () {
    var service = new StudySchemeService();
    var filterService = new CampusFilterService();
    var toolbar = $("#studySchemeToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var studyScheme = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    studyScheme.Initialize();
})(jQuery);