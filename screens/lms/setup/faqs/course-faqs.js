(function () {
    var service = new CourseFaqService();
    var filterService = new CampusFilterService();
    var toolbar = $("#courseFaqToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var courseFaq = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    courseFaq.Initialize();
})(jQuery);