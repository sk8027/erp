(function () {
    var service = new LookupValueService();
    var toolbar = $("#lookupValueToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var lookupValue = {
        Initialize : function(){
            service.loadTable();
        }
    };
    lookupValue.Initialize();
})(jQuery);