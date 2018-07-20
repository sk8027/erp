<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="courseApproval">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Course Approval</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="courseApprovalFilter" class="btn btn-default green"><i class="fa fa-search"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="portlet-body">

                                <div id="screenFilterDiv" >
                                    <div class="row">
                                        <jsp:include page="/screens/shared/campus-filter.jsp"></jsp:include>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-4" style="padding-left:0px">
                                            <div class="form-group">
                                                <label for="sessionIdFilter" class="control-label">Session</label>
                                                <div id="sessionIdFilter">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4" style="padding-left:0px" id="courseIdFilterDiv">
                                            <div class="form-group">
                                                <label for="courseIdFilter" class="control-label">Course</label>
                                                <div id="courseIdFilter">

                                                </div>
                                            </div>
                                        </div>


                                    </div><!-- End Row -->

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="courseApprovalToolbar" >
                <div class="btn-group">
                    <button type="button" id="approveBtn" class="btn btn-default green" ><i class="fa fa-plus"></i>
                        Approve
                    </button>



                </div>
            </div>
        </div>
    </div>
    <div  >
        <div class="col-md-12">
            <div class="portlet box green bordered">
                <div class="portlet-title">
                    <div class="caption"> <i class="fa fa-cogs"></i>Courses Approval</div>

                </div>
                <div class="portlet-body grid-container" style="height: 100%;">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="courseApprovalTable"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>

    <div id="courseApprovalDlg" >
        <div ><span id="dlgTitle">Approve Student</span> </div>
        <div   class="dlg-content">
            <div class="page-message-area">
            </div>
            <div class="portlet box green" style="margin-top: 10px;">
                <div class="portlet-body form">
                    <form class="horizontal-form" role="form" novalidate >
                        <div id="approvalPopupToolbar" class="form-actions top" style="padding:5px" >
                            <div class="btn-set pull-left">
                                <div class="btn-group">
                                    <button id="approvePopupBtn" type="button" class="btn green" title="Approve"><i class="fa fa-check-circle"></i> Approve</button>
                                    <button id="rejectPopupBtn" type="button" class="btn btn-danger" title="Reject" style="margin-left:5px"><i class="fa fa-minus-circle"></i> Reject</button>
                                </div>
                            </div>

                        </div>
                        <div class="form-body">
                            <div class="row">

                                <div class="col-md-12">
                                    <div class="form-group" >
                                        <label class="control-label ">Remarks</label>
                                        <div class="" >
                                            <textarea id="remarks" class="form-control" style="width:100%"></textarea>
                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/academics/course-enrollment/course-approval-service.js" type="text/javascript"></script>
<script type="text/javascript">
    (function () {
        var service = new CourseApprovalService();
        var filterService = new CampusFilterService();
        var toolbar = $("#courseApprovalToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "approveBtn"){
                service.approve();
            }
        });
        var courseApproval = {
            Initialize : function(){
                filterService.initFilter();
                service.loadTable();
            }
        };
        courseApproval.Initialize();
    })(jQuery);
</script>
