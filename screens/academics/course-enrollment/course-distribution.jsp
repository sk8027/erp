<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="courseDistribution">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Course Distribution</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="courseDistributionFilter" class="btn btn-default green"><i class="fa fa-search"></i>
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
                                        <div class="col-md-4" style="padding-left:0px" >
                                            <div class="form-group">
                                                <label for="sectionTypeIdFilter" class="control-label">Section Type</label>
                                                <div id="sectionTypeIdFilter">

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
            <div class="table-toolbar" id="courseDistributionToolbar" >
                <div class="btn-group">
                    <button type="button" id="distributeBtn" class="btn btn-default green" ><i class="fa fa-plus"></i>
                        Distribute
                    </button>



                </div>
            </div>
        </div>
    </div>
    <div  >
        <div class="col-md-12">
            <div class="portlet box green bordered">
                <div class="portlet-title">
                    <div class="caption"> <i class="fa fa-cogs"></i>Courses Distribution</div>

                </div>
                <div class="portlet-body grid-container" style="height: 100%;">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="courseDistributionTable"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>

    <div id="courseDistributionDlg" >
        <div ><span id="dlgTitle">Approve Student</span> </div>
        <div   class="dlg-content">
            <div class="page-message-area">
            </div>
            <div class="portlet box green" style="margin-top: 10px;">
                <div class="portlet-body form">
                    <form class="horizontal-form" role="form" novalidate >
                        <div id="distributionPopupToolbar" class="form-actions top" style="padding:5px" >
                            <div class="btn-set pull-left">
                                <div class="btn-group">
                                    <button id="placeBtn" type="button" class="btn green" title="Approve"><i class="fa fa-check-circle"></i> Place in Section </button>

                                </div>
                            </div>

                        </div>
                        <div class="form-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" >
                                        <label class="control-label ">Section</label>
                                        <div class="" >
                                            <div id="courseSectionFilter"  required="true"></div>
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
<script src="${pageContext.servletContext.contextPath}/screens/academics/course-enrollment/course-distribution-service.js" type="text/javascript"></script>
<script type="text/javascript">
    (function () {
        var service = new CourseDistributionService();
        var filterService = new CampusFilterService();
        var toolbar = $("#courseDistributionToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "distributeBtn"){
                service.distribute();
            }
        });
        var courseDistribution = {
            Initialize : function(){
                filterService.initFilter();
                service.loadTable();
            }
        };
        courseDistribution.Initialize();
    })(jQuery);
</script>
