(function () {
    var service = new OpportunityService();
    var toolbar = $("#opportunityToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var opportunity = {
        Initialize : function(){
            service.loadTable();

        }
    };
    opportunity.Initialize();
})(jQuery);