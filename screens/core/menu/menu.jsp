<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<div class="col-md-12" id="menu">

    <div class="col-md-12">
        <div class="portlet-body grid-container" >
            <div class="table-toolbar" id="menuToolbar">
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
                    <i class="fa fa-cogs"></i>Menu</div>

            </div>
            <div class="portlet-body grid-container" style="height: 450px;">

                <div id="menuTable"></div>
            </div>
        </div>
    </div>
    <div id="menuDlg">
        <div ><span>Menu </span> </div>
        <div   class="dlg-content"></div>
    </div>
</div>
</div>

<script src="${pageContext.servletContext.contextPath}/screens/core/menu/menu-service.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/screens/core/menu/menu.js" type="text/javascript"></script>

