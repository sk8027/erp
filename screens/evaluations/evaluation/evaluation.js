(function () {
    var service = new EvaluationRecordService();
    var filterService = new CampusFilterService();
    var toolbar = $("#evaluationRecordToolbar");
    toolbar.find("button").click(function () {
        if(this.id === "SaveBtn") {
            service.save();
        }
    });
    var evaluationRecord = {
        Initialize : function(){
            filterService.initFilter();
            service.loadTable();
        }
    };
    evaluationRecord.Initialize();
})(jQuery);