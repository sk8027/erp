<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="courseEnrollment">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Course Enrollment</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="courseEnrollmentFilter" class="btn btn-default green"><i class="fa fa-search"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <div class="row">
                                    <div class="col-md-4" style="padding-left:0px">
                                        <div class="form-group">
                                            <label for="enrollmentTypeFilter" class="control-label">Enroll By</label>
                                            <div id="enrollmentTypeFilter">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="screenFilterDiv" style="display: none">
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

                                        <div class="col-md-4" style="padding-left:0px" id="enrollmentIdFilterDiv">
                                            <div class="form-group">
                                                <label for="enrollmentIdFilter" class="control-label">Enrollment #</label>
                                                <input type="text" id="enrollmentIdFilter">

                                                </input>
                                            </div>
                                        </div>

                                    </div><!-- End Row -->

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="courseEnrollmentToolbar" style="display: none;">
                <div class="btn-group">
                    <button type="button" id="enrollBtn" class="btn btn-default green" disabled><i class="fa fa-plus"></i>
                        Enroll
                    </button>



                </div>
            </div>
        </div>
    </div>
    <div id="studentEnrollmentDiv" >
        <div class="col-md-8">
            <div class="portlet box green bordered">
                <div class="portlet-title">
                    <div class="caption"> <i class="fa fa-cogs"></i>Courses to Enroll For Student</div>

                </div>
                <div class="portlet-body grid-container" style="height: 100%;">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="courseEnrollmentTable"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4" >
             <div class="portlet-body">
                    <div class="mt-element-list">
                        <div class="mt-list-head list-default ext-1 yellow-saffron" id="personalProfile">
                            <div class="list-head-title-container">
                                <h3 class="list-title uppercase sbold">Student Information</h3>

                            </div>
                        </div>
                        <div class="mt-list-container list-default ext-1">

                            <ul id="academicProfile">
                                <li class="mt-list-item done"> <div class="list-item-content" style="padding-left:10px"><h3 class="uppercase bold"><a href="javascript:;"></a></h3><p>No Data Available</p></div> </li>
                            </ul>
                        </div>
                    </div>
                </div>


        </div>
    </div>
    <div id="courseEnrollmentDiv" >
        <div class="col-md-12">
            <div class="portlet box green bordered">
                <div class="portlet-title">
                    <div class="caption"> <i class="fa fa-cogs"></i>Students to Enroll in Courses</div>

                </div>
                <div class="portlet-body grid-container" style="height: 100%;">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="bulkEnrollmentTable"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="courseEnrollmentDlg" >
        <div ><span id="dlgTitle">Select Student</span> </div>
        <div   class="dlg-content">
            <div id="studentGridFilter"></div>
        </div>
    </div>
</div>


<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/academics/course-enrollment/course-enrollment-service.js" type="text/javascript"></script>
<script type="text/javascript">
    (function () {
        var service = new CourseEnrollmentService();
        var filterService = new CampusFilterService();
        var toolbar = $("#courseEnrollmentToolbar");
        toolbar.find("button").click(function () {
            if(this.id === "enrollBtn"){
                service.enroll();
            }
        });
        var courseEnrollment = {
            Initialize : function(){
                filterService.initFilter();
                service.loadTable();
            }
        };
        courseEnrollment.Initialize();
    })(jQuery);
</script>
