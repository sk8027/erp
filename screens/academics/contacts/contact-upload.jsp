<div id="contactUploadToolbar" class="form-actions top" style="padding:5px" >
    <div class="btn-set pull-left">
        <div class="btn-group">
            <button id="AddRowBtn" type="button" class="btn green" title="Save Current Record"><i class="fa fa-plus"></i> Add</button>
            <button id="DeleteRowBtn" type="button" class="btn btn-default red"  disabled  title="Delete Current Record">
                <i class="fa fa-trash-o "></i> Delete</button>
            <button id="RefreshGridBtn" type="button" class="btn btn-default"   title="Refresh Data">
                <i class="fa fa-refresh"></i> Refresh </button>
        </div>
    </div>

</div>
<div id="contactUploadTable"/>
<div id="contentUploadWindow">
    <div ><span id="title">Upload Document</span></div>
    <div style="overflow: hidden;">
        <div class="col-sm-10">
            <input type="file" ngf-select id="docFile" name="file"
                   accept="image/*,pdf" ngf-max-size="2MB"
                   class="form-control"

            />
        </div>
        <div class="col-sm-2">
            <button >Upload</button>
        </div>
        <div class="col-sm-12" style="margin-top:50px" id="fileTable"/>
    </div>
</div>

<script src="${pageContext.servletContext.contextPath}/screens/academics/contacts/contact-upload.js" type="text/javascript"></script>

