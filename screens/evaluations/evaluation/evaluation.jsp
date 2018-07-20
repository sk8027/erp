<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="evaluationRecord">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >

            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Evaluation Setup</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="evaluationRecordFilter" class="btn btn-default green"><i class="fa fa-search"></i>
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
                                            <label for="evaluationIdFilter" class="control-label">Evaluation</label>
                                            <div id="evaluationIdFilter">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="evaluationRecordToolbar" style="display: none;">
                <div class="btn-group">
                    <button type="button" id="SaveBtn" class="btn btn-default green" disabled><i class="fa fa-save"></i>
                        Save
                    </button>


                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12" id="evaluationRecordTableDiv" style="display: none">
        <div class="portlet box green bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>Student Evaluation </div>

            </div>
            <div class="portlet-body grid-container" style="height: 650px;">

                <div id="evaluationRecordTable"></div>
            </div>
        </div>
    </div>

</div>
<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/evaluations/evaluation/evaluation-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/evaluations/evaluation/evaluation.js" type="text/javascript"></script>
