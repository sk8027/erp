(function () {
    var service = new ProgramLevelService();
    var toolbar = $("#programLevelToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var programLevel = {
        Initialize : function(){
            service.loadTable();
        }
    };
    programLevel.Initialize();
})(jQuery);