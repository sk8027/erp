(function () {
    var service = new ApplicationRoleService();
    var toolbar = $("#roleToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var role = {
        Initialize : function(){
            service.loadTable();
        }
    };
    role.Initialize();
})(jQuery);