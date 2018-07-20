(function () {
    var service = new MenuService();
    var toolbar = $("#menuToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var menu = {
        Initialize : function(){
            service.loadTable();
        }
    };
    menu.Initialize();
})(jQuery);