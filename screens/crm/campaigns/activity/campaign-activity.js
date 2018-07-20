(function () {
    var service = new CampaignActivityService();
    var toolbar = $("#campaignActivityToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var campaignActivity = {
        Initialize : function(){
            service.loadTable();
        }
    };
    campaignActivity.Initialize();
})(jQuery);