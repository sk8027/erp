<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">

    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="userEditToolbar" class="form-actions top" style="padding:5px;margin-bottom:1px" >
                <div class="btn-set pull-left">
                    <div class="btn-group">
                        <button id="SaveBtn" type="button" class="btn green" title="Save Current Record"><i class="fa fa-save"></i> Save</button>

                    </div>
                </div>
                <div class="btn-set pull-right">
                    <div class="btn-group">
                        <button id="NewBtn" type="button" class="btn btn-default"   title="New Record">
                            <i class="fa fa-plus"></i> New </button>
                        <%--<button id="DeleteBtn" type="button" class="btn btn-default red"  disabled  title="Delete Current Record">
                            <i class="fa fa-trash-o "></i> Delete</button>--%>
                        <button id="CloseBtn" type="button" class="btn btn-warning"  title="Close Popup">
                            <i class="fa fa-close"></i> Close</button>
                    </div>
                </div>
            </div>
            <div class="form-body" style="padding-top:1px">
                <div class="row">
                    <div class="col-md-12">
                        <div class="profile-sidebar" id="profileLeft" style="display: none;" >

                            <!-- PORTLET MAIN -->
                            <div class="portlet light profile-sidebar-portlet ">
                                <!-- SIDEBAR USERPIC -->

                                <div class="profile-userpic">
                                    <img src="${pageContext.servletContext.contextPath}/resources/assets/pages/img/profile_user.jpg" class="img-responsive" alt=""> </div>

                                <div class="profile-usertitle">
                                    <div class="profile-usertitle-name" labelControlName="contactName"> </div>
                                    <div class="profile-usertitle-job" labelControlName="contactTypeName"> </div>
                                </div>
                                <!-- END SIDEBAR USER TITLE -->
                                <!-- SIDEBAR BUTTONS -->
                                <div class="profile-userbuttons">
                                    <button type="button" class="btn btn-circle green btn-sm" labelControlName="crNo"></button>

                                </div>
                                <!-- END SIDEBAR BUTTONS -->
                                <!-- SIDEBAR MENU -->
                                <div class="profile-usermenu">
                                    <ul class="nav">
                                        <li class="active">
                                            <a href="#">
                                                <i class="icon-home"></i> CNIC: <span labelControlName="cnic"></span></a>
                                        </li>
                                        <li class="active">
                                            <a href="#">
                                                <i class="icon-home"></i> Father: <span labelControlName="fatherName"></span></a>
                                        </li>

                                    </ul>
                                </div>
                                <!-- END MENU -->
                            </div>
                            <!-- END PORTLET MAIN -->
                            <!-- PORTLET MAIN -->

                            <!-- END PORTLET MAIN -->
                        </div>
                        <div class="profile-content">
                            <div class="row" id="filterRow" style="display: none;">
                                <div class="col-md-12">
                                    <div class="portlet light bg-inverse">
                                        <div class="portlet-title">
                                            <div class="caption ">
                                                <i class="icon-user"></i>
                                                <span class="caption-subject bold uppercase"> New</span>
                                                <span class="caption-helper">User Filter</span>
                                            </div>
                                            <div class="actions">
                                                <div class="btn-group btn-group-devided" data-toggle="buttons">

                                                    <button type="button" id="searchBtn" class="btn btn-default green"><i class="fa fa-search"></i>
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="portlet-body">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Contact Type</label>
                                                        <div class="" >
                                                            <div formControlName="contactTypeId"  ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Search By</label>
                                                        <div class="" >
                                                            <div formControlName="searchBy"  ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Value</label>
                                                        <div class="" >
                                                            <input   type="text" class="form-control"  formControlName="searchValue"  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div id="userDetail" style="display: none;">

                             <div class="row">
                                <div class="col-md-6">
                                    <div class="portlet light ">
                                        <!-- STAT -->
                                        <div class="row list-separated profile-stat">

                                            <h4 class="profile-desc-title" labelControlName="profileTitle">Academics</h4>
                                        </div>
                                        <!-- END STAT -->
                                        <div labelControlName="profileDetail">


                                        </div>
                                    </div>
                             </div>
                                 <div class="col-md-6">
                                     <div class="portlet light ">
                                         <!-- STAT -->
                                         <div class="row list-separated profile-stat">

                                             <h4 class="profile-desc-title">Contacts</h4>
                                         </div>
                                         <div labelControlName="profileCommunication">
                                         </div>

                                     </div>
                                 </div>

                             </div>
                                <div class="tabbable-custom nav-justified">
                                    <ul class="nav nav-tabs nav-justified">
                                        <li class="active">
                                            <a href="#userInfoTab" data-toggle="tab" aria-expanded="true"> User Information </a>
                                        </li>
                                        <li class="">
                                            <a href="#userDptTab" data-toggle="tab" aria-expanded="false"> Allowed Departments </a>
                                        </li>

                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="userInfoTab">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">User Type</label>
                                                        <div class="" >
                                                            <div formControlName="userTypeId"  required="true"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">User Level</label>
                                                        <div class="" >
                                                            <div formControlName="userLevelId"  required="true"></div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Login</label>
                                                        <div class="" >
                                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9a-za-zA-Z\s]{1,255}"  formControlName="loginId"  required="true"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">User Status</label>
                                                        <div class="" >
                                                            <div formControlName="userStatusId"  required="true"></div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Activation Date</label>
                                                        <div class="" >
                                                            <input   type="date" class="form-control"    formControlName="activationDate"  />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Password Expiry Date</label>
                                                        <div class="" >
                                                            <input   type="date" class="form-control"    formControlName="passwordExpiryDate"  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group" >
                                                        <label class="control-label ">Login Expiry Date</label>
                                                        <div class="" >
                                                            <input   type="date" class="form-control"    formControlName="loginExpiryDate"  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="userDptTab">

                                            <div class="row" style="margin-top:10px" >

                                                <div class="col-md-12">
                                                    <div class="portlet light bordered" id="treeDiv">
                                                        <div class="portlet-title">
                                                            <div class="caption">
                                                                <i class="icon-social-dribbble font-blue-sharp"></i>
                                                                <span class="caption-subject font-blue-sharp bold uppercase">Department Access</span>
                                                            </div>

                                                        </div>
                                                        <div class="portlet-body">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div id="userDtpAccess"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" formControlName="id">

            <input type="hidden" formControlName="contactId">

        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new UserService();
        var toolbar = $("#userEditToolbar");
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
                $("#userDlg").jqxWindow('close');
            }
        });
        $("#searchBtn").on("click", function () {
            service.getByContactId(7);
        })
        $("input[data-inputmask-regex]").inputmask('Regex');
    })
</script>