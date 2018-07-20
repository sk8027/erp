(function () {
    var service = new CoursePolicyService();
    var filterService = new CampusFilterService();
    var toolbar = $("#coursePolicyToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var coursePolicy = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    coursePolicy.Initialize();
})(jQuery);