<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">
    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="OpportunityEditToolbar" class="form-actions top" style="padding:5px" >
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button id="SaveBtn" type="button" class="btn green" title="Save Current Record"><i class="fa fa-save"></i> Save</button>
                        <button id="QualifyBtn" type="button" class="btn green" title="Save Current Record" style="border-left-color:#2ab4c0"><i class="fa fa-thumbs-up" ></i> Qualify</button>
                        <button id="DisqualifyBtn" type="button" class="btn red" title="Save Current Record" style="border-left-color:#2ab4c0"><i class="fa fa-thumbs-down" ></i> Disqualify</button>
                        <button id="ClearBtn" type="button" class="btn btn-default"   title="Clear Current Record For Update" style="border-left-color:#2ab4c0">
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
             <div class="form-wizard" id="workflowProgress">
                 <div class="form-body">
                     <ul class="nav nav-pills nav-justified steps">
                         <li workflow="L">
                             <a href="#"   class="step" aria-expanded="true" >
                                 <span class="number"> 1 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Opportunity </span>
                             </a>
                         </li>
                         <li  workflow="Q">
                             <a href="#"   class="step" >
                                 <span class="number"> 2 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Qualify</span>
                             </a>
                         </li>
                         <li workflow="P">
                             <a href="#"    class="step">
                                 <span class="number"> 3 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Prospect </span>
                             </a>
                         </li>
                         <li workflow="T">
                             <a href="#"   class="step">
                                 <span class="number"> 4 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Submitted </span>
                             </a>
                         </li>
                         <li workflow="A">
                             <a href="#"  class="step">
                                 <span class="number"> 5 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Applied </span>
                             </a>
                         </li>
                         <li workflow="D">
                             <a href="#"  class="step">
                                 <span class="number"> 6 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Admitted </span>
                             </a>
                         </li>
                         <li workflow="E">
                             <a href="#"   class="step">
                                 <span class="number"> 7 </span>
                                 <span class="desc">
                                                                    <i class="fa fa-check"></i> Enrolled</span>
                             </a>
                         </li>
                     </ul>
                     <div id="bar" class="progress progress-striped" role="progressbar">
                         <div class="progress-bar progress-bar-success" > </div>
                     </div>

                 </div>
             </div>
            <div class="tabbable-custom nav-justified" >
                <ul class="nav nav-tabs nav-justified" id="contactInfo">
                    <li class="active">
                        <a href="#contactTab" data-toggle="tab" aria-expanded="true"> Contact</a>
                    </li>

                    <li class="">
                        <a href="#contactAddressTab" data-toggle="tab" aria-expanded="false"> Address</a>
                    </li>
                    <li class="">
                        <a href="#contactCommunicationTab" data-toggle="tab" aria-expanded="false"> Communication</a>
                    </li>
                    <li class="">
                        <a href="#activityTab" data-toggle="tab" aria-expanded="false"> Activities</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="contactTab">
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" >
                                        <label class="control-label ">Topic</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="topic"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">First Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="firstName"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Last Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="lastName"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Gender</label>
                                        <div formControlName="genderId"  required="true"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">

                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Currency</label>
                                        <div class="" >
                                            <div formControlName="currencyId"  required="false"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Opportunity Source</label>
                                        <div class="" >
                                            <div formControlName="OpportunitySourceId"  required="false"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Est. Budget</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,12}"  formControlName="estimatedBudget"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Purchase Process</label>
                                        <div class="" >
                                            <div formControlName="purchaseProcessId"  required="false"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Est. Purchase Time</label>
                                        <div class="" >
                                            <div formControlName="purchaseTimeId"  required="false"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Opportunity Status</label>
                                        <div class="" >
                                            <div formControlName="OpportunityStatusId"  required="false"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" >
                                        <label class="control-label ">Description</label>
                                        <div class="" >
                                            <textarea   class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,4096}"  formControlName="description"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input type="hidden" formControlName="id">
                        <input type="hidden" formControlName="contactId">
                    </div>
                    <div class="tab-pane" id="contactAddressTab"/>
                    <div class="tab-pane" id="contactCommunicationTab"/>
                    <div class="tab-pane" id="activityTab"/>
                </div>
            </div>

        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new OpportunityService();
        var toolbar = $("#OpportunityEditToolbar");
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
                $("#OpportunityDlg").jqxWindow('close');
            }else if(this.id === "QualifyBtn"){
                service.qualify();
            }else if(this.id === "DisqualifyBtn"){
                service.disqualify();
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');

    })
</script>