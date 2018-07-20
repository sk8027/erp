<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="courseLecture">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Course Lectures</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="courseLectureFilter" class="btn btn-default green"><i class="fa fa-search"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <div class="row">
                                    <jsp:include page="/screens/shared/campus-filter.jsp"></jsp:include>

                                </div>
                                <div class="row">
                                    <div class="col-md-4" style="padding-left:0px">
                                        <div class="form-group">
                                            <label for="resourceIdFilter" class="control-label">Resource</label>
                                            <div id="resourceIdFilter">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" style="padding-left:0px">
                                        <div class="form-group">
                                            <label for="sessionIdFilter" class="control-label">Session</label>
                                            <div id="sessionIdFilter">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4" style="padding-left:0px">
                                        <div class="form-group">
                                            <label for="courseSectionIdFilter" class="control-label">Section</label>
                                            <div id="courseSectionIdFilter">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="courseLectureToolbar">
                <div class="btn-group">
                    <button type="button" id="AddBtn" class="btn btn-default green" disabled><i class="fa fa-plus"></i>
                        Add New
                    </button>

                    <button type="button" id="DeleteBtn" class="btn btn-default green"
                            style="border-left-color:#2ab4c0" disabled><i class="fa fa-trash-o"></i> Delete
                    </button>
                    <button type="button" id="RefreshBtn" class="btn btn-default green"
                            style="border-left-color:#2ab4c0" disabled><i class="fa fa-refresh"></i> Refresh
                    </button>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="portlet box green bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>Course Lectures</div>

            </div>
            <div class="portlet-body grid-container" style="height: 450px;">

                <div id="courseLectureTable"></div>
            </div>
        </div>
    </div>
    <div id="courseLectureDlg">
        <div ><span id="dlgTitle">CourseLecture</span> </div>
        <div   class="dlg-content"></div>
    </div>
</div>
<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/lms/setup/lectures/basic/course-lecture-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/lms/setup/lectures/basic/course-lecture.js" type="text/javascript"></script>
