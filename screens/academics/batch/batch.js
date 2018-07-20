(function () {
    var filterService = new CampusFilterService();
    var service = new ProgramBatchService();
    var toolbar = $("#programBatchToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var programBatch = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    programBatch.Initialize();
})(jQuery);