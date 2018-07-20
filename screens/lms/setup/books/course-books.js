(function () {
    var service = new CourseBookService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseBookToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseBook = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseBook.Initialize();
})(jQuery);