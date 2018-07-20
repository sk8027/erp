(function () {
    var service = new CampaignService();
    var toolbar = $("#campaignToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var campaign = {
        Initialize : function(){
            service.loadTable();
        }
    };
    campaign.Initialize();
})(jQuery);