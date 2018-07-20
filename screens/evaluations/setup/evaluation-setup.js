(function () {
    var service = new EvaluationSetupService();
    var filterService = new CampusFilterService();
    var toolbar = $("#evaluationSetupToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var evaluationSetup = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    evaluationSetup.Initialize();
})(jQuery);