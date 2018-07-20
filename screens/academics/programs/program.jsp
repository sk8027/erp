<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<div class="col-md-12" id="program">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >
            <div class="table-toolbar" style="padding-left:0px;margin-bottom: 10px;">
                <div class="row" id="filterRow" >
                    <div class="col-md-12">
                        <div class="portlet light bg-inverse">
                            <div class="portlet-title">
                                <div class="caption ">
                                    <i class="fa fa-filter"></i>
                                    <span class="caption-subject bold uppercase"> Program</span>
                                    <span class="caption-helper">Filter</span>
                                </div>
                                <div class="actions">
                                    <div class="btn-group btn-group-devided" data-toggle="buttons">

                                        <button type="button" id="programFilter" class="btn btn-default green"><i class="fa fa-search"></i>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <div class="row">
                                     <jsp:include page="/screens/shared/campus-filter.jsp"></jsp:include>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div class="table-toolbar" id="programToolbar">
                <div class="btn-set pull-left">
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
    </div>
    <div class="col-md-12">
        <div class="portlet box green bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="fa fa-cogs"></i>Program</div>

            </div>
            <div class="portlet-body grid-container" style="height: 450px;">

                <div id="programTable"></div>
            </div>
        </div>
    </div>
    <div id="programDlg">
        <div ><span id="dlgTitle">Program </span> </div>
        <div   class="dlg-content"></div>
    </div>
</div>

<script src="${pageContext.servletContext.contextPath}/screens/shared/campus-filter.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/academics/programs/program-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/academics/programs/program.js" type="text/javascript"></script>

