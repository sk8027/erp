<div class="portlet box green" style="margin-top: 10px;">
    <div class="portlet-title">
        <div class="caption  ">
            <i class="icon-settings"></i>
            <span class="caption-subject bold"> Menu </span>
        </div>
        <div class="actions ">
            <a class="btn btn-circle btn-icon-only white" href="javascript:;" (click)="dataService.helpContent()">
                <i class="fa fa-question" style="color:#32c5d2"></i>
            </a>

        </div>
    </div>
    <div class="portlet-body form">

        <form class="horizontal-form" role="form" >
            <div id="roleAccessToolbar" class="form-actions top">
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button type="button" class="btn green" id="SaveBtn" disabled><i class="fa fa-save"></i> Save</button>

                    </div>
                </div>

            </div>
            <div class="form-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group" >
                            <label class="control-label ">Application Role </label>
                            <div class="" >
                                <div id="roleId" ></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row" style="margin-top:10px" >

                    <div class="col-md-12">
                        <div class="portlet light bordered" id="treeDiv">
                            <div class="portlet-title">
                                <div class="caption">
                                    <i class="icon-social-dribbble font-blue-sharp"></i>
                                    <span class="caption-subject font-blue-sharp bold uppercase">Role Access</span>
                                </div>

                            </div>
                            <div class="portlet-body">
                                <div id="menuTree" ></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </form>


    </div>
</div>

<script src="${pageContext.servletContext.contextPath}/screens/core/access/access.js" type="text/javascript"></script>
<script>
    $(document).ready(function(){
        var service = new AccessService();
        var framework = new Framework();
        var toolbar = $("#roleAccessToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "SaveBtn"){
                var saveBtn = this;
                var items = $('#menuTree').jqxTree('getCheckedItems');
                var ids = [];
                    var selectedItem = $("#roleId").jqxDropDownList('getSelectedItem');
                var roleId = selectedItem.originalItem.value;
                $.each(items,function(id,item){
                    if(item.value > 0) {
                        ids.push({"roleId": roleId, "menuHierarchyId": item.value, "status": "A"});
                    }
                });
                CommonService.sendAjaxRequest(service.saveURL+roleId,'post',JSON.stringify(ids),$("#treeDiv")).then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage(self.title, "Selected Roles assigned Successfully to Usre '"+selectedItem.originalItem.label+"'");
                        toolbar.find("#SaveBtn").attr("disabled","disabled");
                    }
                })
            }else if(this.id === "NewModuleBtn"){

            }else if(this.id === "DeleteBtn"){


            }else if(this.id === "NewBtn"){

            }else if(this.id === "CloseBtn"){
                $("#menuDlg").modal('hide');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
        $.get(service.lovURL).done(function (data) {

            var lovMap = data.data;
            framework.GenerateDropDownList($("#roleId"), lovMap.roleId);
        });
        $('#roleId').on('select', function (event) {
             var value = args.item.originalItem.value;
            CommonService.sendAjaxRequest(service.treeURL+value,'get',null,$("#treeDiv")).then(function( responseData ) {

                var treeData  = responseData.data;
                var treeSource = {
                    datatype: 'json',
                    datafields: [
                        { name: 'id' },
                        { name: 'parentId' },
                        { name: 'text' },
                        { name: 'value' },
                        { name: 'checked' }


                    ],
                    id: 'id',
                    localdata:  treeData


                };

                var dataAdapter = new jqx.dataAdapter(treeSource, { autoBind: true });

                var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'text', map: 'label' }]);
                $('#menuTree').jqxTree({ theme:JQXTHEME,source: records, width: '100%',hasThreeStates: true, checkboxes: true});
                toolbar.find("#SaveBtn").attr("disabled","disabled");
                $('#menuTree').on('checkChange', function (event)
                {
                    toolbar.find("#SaveBtn").removeAttr("disabled");
                });

            });
        });

    });
</script>