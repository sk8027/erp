(function () {
    var service = new UserService();
    var toolbar = $("#userToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });

    var user = {
        Initialize : function(){
            service.loadTable();
        }
    };
    user.Initialize();
})(jQuery);