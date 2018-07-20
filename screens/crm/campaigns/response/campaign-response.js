(function () {
    var service = new CampaignResponseService();
    var toolbar = $("#campaignResponseToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "AddBtn"){
            service.getById(null);
        }else if(this.id === "DeleteBtn"){
            service.deleteRows();
        }else if(this.id === "RefreshBtn"){
            service.refresh();
        }
    });
    var campaignResponse = {
        Initialize : function(){
            service.loadTable();
        }
    };
    campaignResponse.Initialize();
})(jQuery);