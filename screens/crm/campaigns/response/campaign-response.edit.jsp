<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">
    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="campaignResponseEditToolbar" class="form-actions top" style="padding:5px" >
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button id="SaveBtn" type="button" class="btn green" title="Save Current Record"><i class="fa fa-save"></i> Save</button>
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
                <div class="tabbable-custom nav-justified" >
                    <ul class="nav nav-tabs nav-justified" id="campaignResponseTab">

                        <li class="active">
                            <a href="#responseTab" data-toggle="tab" aria-expanded="true"> Campaign Response</a>
                        </li>
                        <li class="">
                            <a href="#contactAddressTab" data-toggle="tab" aria-expanded="false"> Address</a>
                        </li>
                        <li class="">
                            <a href="#contactCommunicationTab" data-toggle="tab" aria-expanded="false"> Communication</a>
                        </li>

                    </ul>
                    <div class="tab-content">

                        <div class="tab-pane active" id="responseTab">
                            <div class="form-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label class="control-label ">Subject</label>
                                            <div class="" >
                                                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="subject"  required="false"/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group" >
                                            <label class="control-label ">Description</label>
                                            <div class="" >
                                                <textarea   class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,4096}"  formControlName="description"  required="false"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Response</label>
                                                <div class="" >
                                                    <div formControlName="campaignResponseId"  required="true"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Response Date</label>
                                                <div class="" >
                                                    <input   type="date" class="form-control"    formControlName="responseDate"  required="true"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Channel</label>
                                                <div class="" >
                                                    <div formControlName="campaignChannelId"  required="true"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Direction</label>
                                                <div class="" >
                                                    <div formControlName="directionId"  required="false"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">First Name</label>
                                                <div class="" >
                                                    <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="firstName"  required="true"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Last Name</label>
                                                <div class="" >
                                                    <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="lastName"  required="true"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" >
                                                <label class="control-label ">Gender</label>
                                                <div formControlName="genderId"  required="true"></div>
                                            </div>
                                        </div>
                                    </div>


                                </div>




                            </div>
                            <input type="hidden" formControlName="id">
                            <input type="hidden" formControlName="contactId">
                            <input type="hidden" value="${param.campaign}" formControlName="campaignId">
                        </div>
                        <div class="tab-pane" id="contactAddressTab"/>
                        <div class="tab-pane" id="contactCommunicationTab"/>

                    </div>
                </div>


            </div>

        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new CampaignResponseService();
        var toolbar = $("#campaignResponseEditToolbar");
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
                $("#campaignResponseDlg").jqxWindow('close');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
    })
</script>