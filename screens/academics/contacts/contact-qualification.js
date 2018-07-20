var ContactQualificationService = (function () {
    function ContactQualificationService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactQualificationTable");
        this.gridToolbar = $("#contactQualificationToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_qualifications';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_qualification_lov';
        this.title = "Contact Qualification";
        this.fields = [
             { name: 'recordStats', type: 'string', required:false},
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'contactName', type: 'string', required:false},
            { name: 'qualificationTypeId', type: 'int', required:true, index:4},
            { name: 'qualificationTypeName', type: 'string', required:false},
            { name: 'description', type: 'string', required:false},
            { name: 'obtainMarks', type: 'int', required:true, index:6},
            { name: 'totalMarks', type: 'int', required:true, index:7},
            { name: 'institute', type: 'string', required:true, index:8},
            { name: 'yearOfCompletion', type: 'int', required:true, index : 9},
            { name: 'status', type: 'string', required:true, index:10},
            { name: 'statusName', type: 'string', required:false},
            { name: 'contentPath', type: 'string'}
        ];
    }
    ContactQualificationService.prototype.handleClick= function (event) {
        var self = this;
        var row = event.target.parentElement.id.split("-")[1];
        var buttonType  = event.target.parentElement.id.split("-")[0];
        $("#qualificationUploadWindow button").attr("data-row",row);
        var path = this.dataGrid.jqxGrid('getcellvalue',row,'contentPath');
        if(buttonType == "download"){
            window.open(path,'_blank');
        }else{
            $("#qualificationUploadWindow").jqxWindow('open');
            $("#qualificationUploadWindow button").on('click',function () {

                var row = $("#qualificationUploadWindow button").attr("data-row");
                var contactId = $("#contactQualificationTable").jqxGrid('getcellvalue',row,"contactId");
                var docId = $("#contactQualificationTable").jqxGrid('getcellvalue',row,"id");
                var  url = CONTEXT_PATH+"/app/contact_controller/upload_document/qualification/"+contactId+"/"+docId;
                var file = $( '#docFile' ).get( 0 ).files[0];
                formData = new FormData();
                formData.append( 'file', file );
                $.ajax( {
                    url        : url,
                    type       : 'POST',
                    contentType: false,
                    cache      : false,
                    processData: false,
                    data       : formData,

                    complete : function(response){
                        $("#qualificationUploadWindow").jqxWindow('close');

                        CommonService.notificationMessage('Content Upload',"Content Uploaded Successfully ! ",true);

                        if(contactId > 0) {
                            self.framework.RefreshJsonGrid(self,self.listURL + "/" + contactId);

                        }
                    },
                    error : function(e){
                        alert(e);

                    }

                });
            });

        }

    }
    ContactQualificationService.prototype.constructTable = function () {
        var self = this;
        var container = self.dataGrid;
        self.source = {
            datatype: 'json',
            datafields:  self.fields ,
            localdata : self.data,
            updaterow: function (rowid, rowdata, commit) {
                if(rowdata.id > 0){
                    rowdata.recordStatus = "U";
                }else{
                    rowdata.recordStatus = "N";
                }
                commit(true);
            },
            deleterow: function (rowid, commit) {
                commit(true);
            }
        };
        var container = self.dataGrid;
        var toolbar = self.gridToolbar;
        container.jqxGrid({
            width: '100%',
            source: new $.jqx.dataAdapter(self.source),

            columns: [
                { text: '', datafield: 'recordStatus',hidden:true},
                { text: '', datafield: 'id',hidden:true},
                { text: '', datafield: 'contactId',hidden:true},

                {text: '<b style="color:#32c5d2">Qualification</b>', datafield: 'qualificationTypeId',
                    width:'10%',
                    displayfield: 'qualificationTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.qualificationTypeId);

                    }
                },

                { text: '<b style="color:#32c5d2">Description</b>', datafield: 'description'},
                { text: '<b style="color:#32c5d2">Marks Obtained</b>', datafield: 'obtainMarks'},
                { text: '<b style="color:#32c5d2">Marks Total</b>', datafield: 'totalMarks'},
                { text: '<b style="color:#32c5d2">Institute</b>', datafield: 'institute'},
                { text: '<b style="color:#32c5d2">Completion Year</b>', datafield: 'yearOfCompletion'},
                {text: '<b style="color:#32c5d2">Status</b></b>', datafield: 'status',
                    width:'10%',
                    displayfield: 'statusName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);

                    }
                },
                {
                    text: '<b style="color:#32c5d2">Attachments</b>',
                    datafield: 'Download',
                    columntype: 'button',
                    width:'5%',

                    cellsrenderer: function (row, column, value) {

                        var pk = self.dataGrid.jqxGrid('getcellvalue',row,'id');
                        var path = self.dataGrid.jqxGrid('getcellvalue',row,'contentPath');
                        if(pk > 0) {
                            var buttons = '<button title="Upload Content" id="upload-' + row + '" type="button" class="btn red btn-xs" onclick="service = new ContactQualificationService(); service.handleClick(event)"><i class="fa fa-upload"></i></button>';
                            if(path != null && path.length > 0){
                                buttons += ' <button title="Download Content" id="download-' + row + '" type="button" class="btn blue-hoki btn-xs" onclick="service = new ContactQualificationService(); service.handleClick(event)"><i class="fa fa-download"></i></button>';
                            }
                            return buttons;
                        }else{
                            return '<button id="upload-' + row + '" type="button" disabled class="btn red btn-xs" ><i class="fa fa-upload"></i></button>';

                        }


                    }
                },
                { text: '', datafield: 'contentPath',hidden:true}

            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactQualificationToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactQualificationToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactQualificationToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactQualificationService.prototype.loadTable = function (contactId) {
        var self = this;
        if(contactId > 0) {
            self.contactId = contactId;
            CommonService.sendAjaxRequest(this.listURL + "/" + contactId, 'get', null, $(".form-body")).then(function (data) {
                self.lovMap = data.lovMap;
                self.data = data.data;
                self.constructTable();

            });
        }else{
            CommonService.sendAjaxRequest(this.lovURL , 'get', null, $(".form-body")).then(function (data) {
                self.lovMap = data.data;
                self.data = [];
                self.constructTable();

            });
        }

        $("#contactQualificationToolbar").find("button").click(function () {
            if(this.id === "AddRowBtn"){
                self.dataGrid.jqxGrid('addrow', null, {contactId : self.contactId});
            }else if(this.id === "DeleteRowBtn"){
                self.framework.DeleteSelectedRows(self,true);
            }else if(this.id === "RefreshGridBtn"){
                if(self.contactId > 0) {
                    self.framework.RefreshJsonGrid(self, self.listURL + "/" + self.contactId);
                }else {
                    self.framework.ClearJsonGrid(self);
                }
            }
        });
        $("#qualificationUploadWindow").jqxWindow({
            showCollapseButton: true, height: '200px',width:'500px',
            isModal:true,
            theme : JQXTHEME,
            autoOpen: false
        });

    };
    ContactQualificationService.prototype.GetData = function () {
        return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactQualificationTab']")));
    };
    return ContactQualificationService;
}());
