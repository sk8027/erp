<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="courseLectureAttendance">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Lecture Attendance</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="courseLectureAttendanceFilter" class="btn btn-default green"><i class="fa fa-search"></i>
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
                                <div class="row">
                                    <div class="col-md-4" style="padding-left:0px">
                                        <div class="form-group">
                                            <label for="lectureIdFilter" class="control-label">Lecture</label>
                                            <div id="lectureIdFilter">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="courseLectureAttendanceToolbar">
                <div class="btn-group">
                    <button type="button" id="SaveBtn" class="btn btn-default green" disabled><i class="fa fa-save"></i>
                        Save
                    </button>
                    <button type="button" id="AllPresent" class="btn btn-default green" style="border-left-color:#2ab4c0" disabled><i class="fa fa-check"></i>
                        All Present
                    </button>

                    <button type="button" id="AllAbsent" class="btn btn-default green"
                            style="border-left-color:#2ab4c0" disabled><i class="fa fa-close"></i> All Absent
                    </button>
                    <button type="button" id="AllLeave" class="btn btn-default green"
                            style="border-left-color:#2ab4c0" disabled><i class="fa fa-exclamation"></i> All Leave
                    </button>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="portlet box green bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>Lecture Attendance</div>

            </div>
            <div class="portlet-body grid-container" style="height: 450px;">

                <div id="courseLectureAttendanceTable"></div>
            </div>
        </div>
    </div>
    <div id="courseLectureAttendanceDlg">
        <div ><span id="dlgTitle">Lecture Attendance</span> </div>
        <div   class="dlg-content"></div>
    </div>
</div>
<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/lms/setup/lectures/attendance/lecture-attendance-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/lms/setup/lectures/attendance/lecture-attendance.js" type="text/javascript"></script>
