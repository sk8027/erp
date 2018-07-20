(function () {
    var filterService = new CampusFilterService();
    var service = new ProgramPloService();
    var toolbar = $("#programPloToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var programPlo = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    programPlo.Initialize();
})(jQuery);