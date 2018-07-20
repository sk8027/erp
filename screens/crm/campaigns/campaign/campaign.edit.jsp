<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">
    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="campaignEditToolbar" class="form-actions top" style="padding:5px" >
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button id="SaveBtn" type="button" class="btn green" title="Save Current Record"><i class="fa fa-save"></i> Save</button>
                        <button type="button" id="ActivateBtn" class="btn btn-default green"
                                style="border-left-color:#2ab4c0" disabled><i class="fa fa-play-circle-o"></i> Activate
                        </button>
                        <button type="button" id="HoldBtn" class="btn btn-default green"
                                style="border-left-color:#2ab4c0" disabled><i class="fa fa-clock-o"></i> Hold
                        </button>
                        <button type="button" id="EndBtn" class="btn btn-default green"
                                style="border-left-color:#2ab4c0" disabled><i class="fa fa-stop"></i> End
                        </button>
                        <button id="ClearBtn" type="button" class="btn btn-default"   title="Clear Current Record For Update">
                            <i class="fa fa-close"></i> Clear </button>
                    </div>
                </div>
                <div class="btn-set pull-right">
                    <div class="btn-group">
                        <button id="NewBtn" type="button" class="btn btn-default"   title="New Record">
                            <i class="fa fa-plus"></i> New </button>
                        <button id="DeleteBtn" type="button" class="btn btn-default red"  disabled  title="Delete Current Record">
                            <i class="fa fa-trash-o "></i> Delete</button>
                        <button id="CloseBtn" type="button" class="btn btn-warning"  title="Close Popup">
                            <i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Title</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="title"  required="true"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Description</label>
                            <div class="" >
                                <textarea  class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,4096}"  formControlName="description"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Code</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,25}"  formControlName="campaignCode"  required="false"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Currency</label>
                            <div class="" >
                                <div formControlName="currencyId"  required="true"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Campaign Type</label>
                            <div class="" >
                                <div formControlName="campaignTypeId"  required="true"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Expected Response(%)</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,3}"  formControlName="expectedResponse"  required="false"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Proposed Start Date</label>
                            <div class="" >
                                <input   type="date" class="form-control"    formControlName="proposedStart"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Proposed End Date</label>
                            <div class="" >
                                <input   type="date" class="form-control"    formControlName="proposedEnd"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Actual Start Date</label>
                            <div class="" >
                                <input   type="date" class="form-control"    formControlName="actualStart"  required="false"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Actual End Date</label>
                            <div class="" >
                                <input   type="date" class="form-control"    formControlName="actualEnd"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Allocated Budget</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,12}"  formControlName="allocatedBudget"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Activity Cost</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,12}"  formControlName="activityCost"  required="false"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Misc. Cost</label>
                            <div class="" >
                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,12}"  formControlName="miscCost"  required="false"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group" >
                            <label class="control-label ">Misc. Cost</label>
                            <div class="" >
                                <div formControlName="campaignStatusId"  required="true"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <input type="hidden" formControlName="id">
            <div formControlName="ownerId"  required="false"></div>
        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new CampaignService();
        var toolbar = $("#campaignEditToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "SaveBtn"){
                service.save();
            }else if(this.id === "ClearBtn"){
                service.clear();
            }else if(this.id === "DeleteBtn"){

                service.deleteRecord($(service.dataForm.id).val());
            }else if(this.id === "NewBtn"){
                service.newRecord();
            }else if(this.id === "CloseBtn"){
                $("#campaignDlg").jqxWindow('close');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
    })
</script>