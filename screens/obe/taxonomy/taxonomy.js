(function () {
    var service = new BloomTaxonomyService();
    var toolbar = $("#bloomTaxonomyToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var bloomTaxonomy = {
        Initialize : function(){
            service.loadTable();
        }
    };
    bloomTaxonomy.Initialize();
})(jQuery);