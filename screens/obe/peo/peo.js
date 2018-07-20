(function () {
    var filterService = new CampusFilterService();
    var service = new ProgramPeoService();
    var toolbar = $("#programPeoToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var programPeo = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    programPeo.Initialize();
})(jQuery);