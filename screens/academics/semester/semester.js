(function () {
    var service = new SemesterService();
    var filterService = new CampusFilterService();
    var toolbar = $("#semesterToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var semester = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    semester.Initialize();
})(jQuery);