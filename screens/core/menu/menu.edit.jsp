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
            <div id="menuEditToolbar" class="form-actions top">
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button type="button" class="btn green" id="SaveBtn"><i class="fa fa-save"></i> Save</button>

                    </div>
                </div>
                <div class="btn-set pull-right">
                    <div class="btn-group">

                        <button type="button" class="btn btn-default" id="NewBtn">
                            <i class="fa fa-puzzle-piece"></i> New </button>
                        <button type="button" class="btn btn-default red" id="DeleteBtn">
                            <i class="fa fa-trash-o "></i> Delete</button>
                        <button type="button" class="btn btn-warning" id="CloseBtn" >
                            <i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <div class="row">
                    <div class="col-md-4">
                        <div id="menuTree" ></div>
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Code</label>
                                    <div  >
                                        <input  #focusField type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,10}" required  formControlName="menuCode"/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Label</label>
                                    <div >
                                        <input   type="text" class="form-control"  formControlName="label" required/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Type</label>
                                    <div class="" >
                                        <div   formControlName="typeId"  required> </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Icon</label>
                                    <div >
                                        <input  type="text" class="form-control"  formControlName="icon"/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">URL</label>
                                    <div >
                                        <input   type="text" class="form-control"  formControlName="url"/>

                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Status</label>
                                    <div class="" [ngClass]="{'has-error': displayMessage.status}">
                                        <div   formControlName="status"  > </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <input type="hidden" formControlName="parentId">
                <input type="hidden" formControlName="id">
            </div>
        </form>


    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new MenuService();
        var toolbar = $("#menuEditToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "SaveBtn"){
                service.save();
            }else if(this.id === "NewModuleBtn"){
                service.clear();
            }else if(this.id === "DeleteBtn"){

                service.deleteRecord($(service.dataForm.id).val());
            }else if(this.id === "NewBtn"){
                service.newRecord();
            }else if(this.id === "CloseBtn"){
                $("#menuDlg").jqxWindow('close');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
        $.get(service.treeURL).done(function (data) {

            var treeData  = data.data;
            var formData = {};
            $.each(service.fields, function (i, field) {
                formData[field.name] = service.formDlg.find("[formControlName='" + field.name + "']").val();
            });
            console.log("Form data " + JSON.stringify(formData));
            //$("#menuTree").jqxTree('selectItem', $("li#1001")[0])
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
                localdata:  treeData,
                dragEnd: function(item, dropItem, args, dropPosition, tree) {
                    // if the item is dropped inside the "Community" item, disable the
                    // drop operation.

                    if (dropPosition == 'inside') {
                        if (dropItem.label == "Community") return false;
                    }
                },
                dragStart: function(item) {
                    // disable dragging of 'Community' item.

                    if (item.label == 'Community') {
                        return false;
                    }
                }

            };

            var dataAdapter = new jqx.dataAdapter(treeSource, { autoBind: true });

            var records = dataAdapter.getRecordsHierarchy('id', 'parentId', 'items', [{ name: 'text', map: 'label' }]);
            $('#menuTree').jqxTree({ source: records, width: '300'});
            $('#menuTree').on('select', function (event) {

                if($(service.dataForm.id).val() > 0) {
                    $.get('/app/menu_controller/find_by_id/' + event.args.owner.selectedItem.id).done(function (data) {

                        service.populateForm(data.data, data.lovMap);

                    });
                }
            })
        });
    });
</script>