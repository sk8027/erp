(function () {
    var service = new LeadService();
    var toolbar = $("#leadToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var lead = {
        Initialize : function(){
            service.loadTable();

        }
    };
    lead.Initialize();
})(jQuery);