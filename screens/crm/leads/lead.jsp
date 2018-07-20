<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="lead">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >
            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">


            </div>
            <div class="table-toolbar" id="leadToolbar">
                <div class="btn-group">
                    <button type="button" id="AddBtn" class="btn btn-default green"><i class="fa fa-plus"></i>
                        Add New
                    </button>

                    <button type="button" id="DeleteBtn" class="btn btn-default green"
                            style="border-left-color:#2ab4c0" disabled><i class="fa fa-trash-o"></i> Delete
                    </button>
                    <button type="button" id="RefreshBtn" class="btn btn-default green"
                            style="border-left-color:#2ab4c0"><i class="fa fa-refresh"></i> Refresh
                    </button>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="portlet box green bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>Lead</div>

            </div>
            <div class="portlet-body grid-container" style="height: 450px;">

                <div id="leadTable"/>
            </div>
        </div>
    </div>
        <div id="leadDlg">
            <div >
                    <span>
                       Lead
                    </span>
            </div>
            <div   class="dlg-content">
            </div>
        </div>
    <div id="leadDisqualifyDlg">
        <div >
                    <span>
                       Disqualification Reason
                    </span>
        </div>
        <div   class="dlg-content">
            <div class="col-md-12">
                <div class="portlet box green" style="margin-top: 10px;">
                    <div class="portlet-body form">
                        <form class="horizontal-form" role="form" novalidate >
                            <div id="disqualifyToolbar" class="form-actions top" style="padding:5px" >
                                <div class="btn-set pull-left">
                                    <div class="btn-group">
                                        <button id="ProcessDisqualify" type="button" class="btn green" title="Save Current Record"><i class="fa fa-save"></i> Process</button>

                                    </div>
                                </div>

                            </div>
                            <div class="form-body">
                                <label class="control-label "> Reason</label>
                                <div formControlName="responseId"  ></div>
                            </div>

                        </form>
                    </div>
                </div>


            </div>
        </div>
    </div>

</div>
<script src="${pageContext.servletContext.contextPath}/screens/crm/leads/contact-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/crm/leads/lead-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/crm/leads/lead.js" type="text/javascript"></script>