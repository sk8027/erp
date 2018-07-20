<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c' %>
<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">
    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="courseLectureEditToolbar" class="form-actions top" style="padding:5px" >
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
                <div class="row">
                    <div class="col-md-8">
                         <div class="row">
                             <div class="col-md-6">
                                <div class="form-group" >
                                    <label class="control-label ">Lecture #</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[0-9]{1,2}"  formControlName="lectureNo"  required="true"/>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group" >
                                    <label class="control-label ">Lecture Date</label>
                                    <div class="" >
                                        <input   type="datetime-local" class="form-control"    formControlName="lectureDate"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group" >
                                    <label class="control-label ">Room #</label>
                                    <div class="" >
                                        <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="roomNo"  required="false"/>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-6">
                                <div class="form-group" >
                                    <label class="control-label ">Status</label>
                                    <div class="" >
                                        <div formControlName="status"  required="false"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">

                        <div class="form-group" >
                            <label class="control-label ">Lecture Contents</label>
                            <div class="" >

                                <div id="contents"/>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <input type="hidden" formControlName="id">

            <input type="hidden" value="${param.session}" formControlName="sessionId">
            <input type="hidden" value="${param.courseSection}" formControlName="courseSectionId">
        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new CourseLectureService();
        var toolbar = $("#courseLectureEditToolbar");
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
                $("#courseLectureDlg").jqxWindow('close');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');
    })
</script>