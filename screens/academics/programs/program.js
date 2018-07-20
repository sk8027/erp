(function () {
    var service = new ProgramService();
    var filterService = new CampusFilterService();
    var toolbar = $("#programToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var program = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    program.Initialize();
})(jQuery);