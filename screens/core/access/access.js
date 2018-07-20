var AccessService = (function () {
    function AccessService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.dataGrid = $("#menuTable");
        this.menuTree = $("#menuTree");
        this.formDlg = $("#menuDlg");
        this.gridToolbar = $("#menuToolbar");
        this.framework = new Framework();
        this.dataForm = {};

         this.lovURL = CONTEXT_PATH + '/app/AccessController/refreshPageLOV';
        this.saveURL = CONTEXT_PATH + '/app/AccessController/save/';
        this.treeURL = CONTEXT_PATH +'/app/AccessController/getMenuTree/';
        this.title = "Application Access";

        }

    return AccessService;
}());
