(function () {
    var service = new StudentService();
    var toolbar = $("#studentToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var student = {
        Initialize : function(){
            service.loadTable();

        }
    };
    student.Initialize();
})(jQuery);