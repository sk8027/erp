<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">

    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="programEditToolbar" class="form-actions top" style="padding:5px" >
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button id="SaveBtn" type="button" class="btn green"  title="Save Current Record"><i class="fa fa-save"></i> Save</button>
                        <button id="ClearBtn" type="button" class="btn btn-default"   title="Clear Current Record For Update">
                            <i class="fa fa-close"></i> Clear </button>
                    </div>
                </div>
                <div class="btn-set pull-right">
                    <div class="btn-group">
                        <button id="NewBtn" type="button" class="btn btn-default"   title="New Record">
                            <i class="fa fa-plus"></i> New </button>
                        <button id="DeleteBtn" type="button" class="btn btn-default red"  disabled  title="Delete Record">
                            <i class="fa fa-trash-o "></i> Delete</button>
                        <button id="CloseBtn" type="button" class="btn btn-warning"  title="Save Current Record">
                            <i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
            <div class="form-body">
                <div class="row">

                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Program Name</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,100}"  formControlName="programName"  required="true"/>
                                     </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">ShortName</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,25}"  formControlName="shortName"  required="true"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Program Type</label>
                                    <div class="" >

                                        <div formControlName="programTypeId"  required="true">

                                        </div>
                                     </div>
                                </div>
                            </div>
                         </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Program Level</label>
                                    <div class="" >
                                        <div formControlName="programLevelSetupId"  required="true"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Semesters</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,2}"  formControlName="semesters"  required="true"/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Start Session</label>
                                    <div class="" >
                                        <div formControlName="startSessionId"  required="true">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Credit Hours</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,3}"  formControlName="creditHours"  required="true"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Shift</label>
                                    <div class="" >
                                        <div formControlName="programShiftId"  required="true">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Head</label>
                                    <div class="" >
                                        <div formControlName="programHeadId"  required="true">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">


                            <div class="col-md-4">
                                <div class="form-group" >
                                    <label class="control-label ">Status</label>
                                    <div class="" >
                                        <div formControlName="status"  required="true">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" formControlName="id">
            <input type="hidden" formControlName="departmentId" value="${param.department}">
            <input type="hidden" formControlName="campusId" value="${param.campus}">

        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new ProgramService();
        var toolbar = $("#programEditToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "SaveBtn"){
                service.save();
            }else if(this.id === "ClearBtn"){
                service.clear();
            }else if(this.id === "DeleteBtn"){

                service.deleteRecord($(service.dataForm.id).val());
            }else if(this.id === "NewBtn"){
                    service.clear();
            }else if(this.id === "CloseBtn"){
                $("#programDlg").jqxWindow('close');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
    })
</script>