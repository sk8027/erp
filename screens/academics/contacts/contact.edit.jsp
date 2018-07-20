<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="page-message-area">
</div>
<div class="portlet box green" style="margin-top: 10px;">

    <div class="portlet-body form">
        <form class="horizontal-form" role="form" novalidate >
            <div id="studentEditToolbar" class="form-actions top" style="padding:5px" >
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
                    <ul class="nav nav-tabs nav-justified" id="contactInfo">
                        <li class="active">
                            <a href="#contactTab" data-toggle="tab" aria-expanded="true"> Contact</a>
                        </li>
                        <c:if test="${param.type == 'STD'}">
                            <li class="">
                                <a href="#studentTab" data-toggle="tab" aria-expanded="true"> Academics</a>
                            </li>
                        </c:if>
                        <c:if test="${param.type == 'EMP'}">
                            <li class="">
                                <a href="#employeeTab" data-toggle="tab" aria-expanded="true"> Employee </a>
                            </li>
                        </c:if>
                        <li class="">
                            <a href="#contactAddressTab" data-toggle="tab" aria-expanded="false"> Address</a>
                        </li>
                        <li class="">
                            <a href="#contactCommunicationTab" data-toggle="tab" aria-expanded="false"> Communication</a>
                        </li>
                        <li class="">
                            <a href="#contactIdentityTab" data-toggle="tab" aria-expanded="false"> Identities </a>
                        </li>
                        <li class="">
                            <a href="#contactQualificationTab" data-toggle="tab" aria-expanded="false"> Qualifications </a>
                        </li>
                        <c:if test="${param.type == 'EMP'}">
                            <li class="">
                                <a href="#contactSkillTab" data-toggle="tab" aria-expanded="false"> Skills</a>
                            </li>
                        </c:if>
                        <li class="">
                            <a href="#contactInterestTab" data-toggle="tab" aria-expanded="false"> Interests</a>
                        </li>
                        <c:if test="${param.type == 'EMP'}">
                            <li class="">
                                <a href="#contactExperienceTab" data-toggle="tab" aria-expanded="false"> Experience</a>
                            </li>
                        </c:if>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="contactTab">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="row">
                                        <div class="col-md-12" style="text-align: center">
                                            <img src="${pageContext.servletContext.contextPath}/resources/images/user.png" class="img-thumbnail"  formControlName="photo" />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                           <button class="btn green" style="width:100%"><i class="fa fa-upload"></i> Upload</button>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-10">


                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">CR #</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9-a-za-zA-Z\s]{1,255}"  formControlName="crNo"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">First Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="firstName"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Middle Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="middleName"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Last Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="lastName"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Contact Title</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="contactTitle"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Father Name</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="fatherName"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Father CNIC</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9-a-za-zA-Z\s]{1,255}"  formControlName="fatherCnic"  required="false"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Gender</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="gender"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Date of Birth</label>
                                        <div class="" >
                                            <input   type="date" class="form-control"    formControlName="dateOfBirth"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">CNIC</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[0-9-a-za-zA-Z\s]{1,255}"  formControlName="cnic"  required="true"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" >
                                        <label class="control-label ">Marital Status</label>
                                        <div class="" >
                                            <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="maritalStatus"  required="false"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" id="studentTab">
                            <jsp:include page="students/student.edit.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane" id="employeeTab">
                            <jsp:include page="employees/employee.edit.jsp"></jsp:include>
                        </div>
                        <div class="tab-pane" id="contactAddressTab"/>
                        <div class="tab-pane" id="contactCommunicationTab"/>
                        <div class="tab-pane" id="contactIdentityTab"/>
                        <div class="tab-pane" id="contactQualificationTab"/>
                        <div class="tab-pane" id="contactSkillTab"/>
                        <div class="tab-pane" id="contactInterestTab"/>
                        <div class="tab-pane" id="contactExperienceTab"/>

                    </div>
                </div>

            </div>
            <input type="hidden" formControlName="id">

            <input type="hidden" formControlName="contactCategoryId"  ></input>
        </form>
    </div>
</div>
<script>
    $(document).ready(function(){
        var service = new ContactService();
        var toolbar = $("#studentEditToolbar");
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
                $("#studentDlg").modal('hide');
            }
        });
        $("input[data-inputmask-regex]").inputmask('Regex');

    })
</script>