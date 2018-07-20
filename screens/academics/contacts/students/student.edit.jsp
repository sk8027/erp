
<div class="row">
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Enrollment #</label>
            <div class="" >
                <input   type="text" class="form-control"  data-inputmask-regex="^[0-9-a-za-zA-Z\s]{1,255}"  formControlName="enrollmentId"  required="false"/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Enrollment Date</label>
            <div class="" >
                <input   type="date" class="form-control"    formControlName="enrollmentDate"  required="false"/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Campus</label>
            <div class="" >
                <div formControlName="campusId"  required="true"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">School</label>
            <div class="" >
                <div formControlName="schoolId"  required="true"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Department</label>
            <div class="" >
                <div formControlName="departmentId"  required="true"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Program</label>
            <div class="" >
                <div formControlName="programId"  required="true"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">ProgramBatch</label>
            <div class="" >
                <div formControlName="batchId"  required="true"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Current Semester</label>
            <div class="" >
                <div formControlName="currentSemesterId"  required="false"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Category</label>
            <div class="" >
                <div formControlName="studentCategoryId"  required="true"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Status</label>
            <div class="" >
                <div formControlName="studentStatusId"  required="false"></div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Remarks</label>
            <div class="" >
                <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="statusChangeRemarks"  required="false"/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Payment Scheme</label>
            <div class="" >
                <div formControlName="paymentSchemeId"  required="false"></div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-4">
        <div class="form-group" >
            <label class="control-label ">Remarks</label>
            <div class="" >
                <input   type="text" class="form-control"  data-inputmask-regex="^[a-za-zA-Z\s]{1,255}"  formControlName="remarks"  required="false"/>
            </div>
        </div>
    </div>


</div>
