
var ContactUploadService = (function () {
    function ContactUploadService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactUploadTable");
        this.gridToolbar = $("#contactUploadToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_uploads';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_upload_lov';
        this.title = "Content Uploads";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int'},
            { name: 'contactName', type: 'string'},
            { name: 'contentId', type: 'int', required:true, index:4},
            { name: 'contentName', type: 'string', required:false},
            { name: 'remarks', type: 'string', required:false},
            { name: 'status', type: 'string', required:true, index:6},
            { name: 'statusName', type: 'string', required:false},
            { name: 'recordStatus', type: 'string', required:false}

        ];
    }

    ContactUploadService.prototype.showUploadPopup = function (row) {

        var contactId = $("#contactUploadTable").jqxGrid('getcellvalue',row,"contactId");
        var docId = $("#contactUploadTable").jqxGrid('getcellvalue',row,"id");
        var docName = $("#contactUploadTable").jqxGrid('getcellvalue',row,"contentName");
        var url = CONTEXT_PATH + "/app/contact_controller/get_document_file/"+contactId+"/"+docId  ;
        CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (serverData) {



                var tr = "";
                if(serverData.data.length>0) {
                    $.each(serverData.data, function (index, file) {

                        tr += "<tr><td><a href='" + file.attribute + "$" + file.label + "' target='_blank'>" + docName + "</a></td></tr>";
                    });

                    $("#contentUploadWindow #title").html("Upload / Download " + docName);
                    var tr = '<table><tr>Download Files</tr>' + tr + "</table>";
                    $("#fileTable").html(tr);
                    $("#contentUploadWindow").jqxWindow('open');
                }else{
                    $("#contentUploadWindow #title").html("Upload / Download " + docName);
                    $("#fileTable").html('No <span style="color:red;font-weight:bold">'+docName+'</span> Uploaded');
                    $("#contentUploadWindow").jqxWindow('open');
                }
            });
        $("#contentUploadWindow button").on('click',function () {
            var contactId = $("#contactUploadTable").jqxGrid('getcellvalue',row,"contactId");
            var docId = $("#contactUploadTable").jqxGrid('getcellvalue',row,"id");

            var  url = CONTEXT_PATH+"/app/contact_controller/upload_document/"+contactId+"/"+docId;
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
                    alert(response);

                },
                error : function(e){
                    alert(e);

                }

            });
        });

    }
    ContactUploadService.prototype.constructTable = function () {
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

                {text: '<b style="color:#32c5d2">Content Type</b>', datafield: 'contentId',
                    width:'20%',
                    displayfield: 'contentName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.contentId);

                    }
                },
                { text: '<b style="color:#32c5d2">Remarks</b>', datafield: 'remarks',width:'50%'},
                {text: '<b style="color:#32c5d2">Status</b>', datafield: 'status',
                    width:'18%',
                    displayfield: '', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);

                    }
                },
                {
                    text: '<b style="color:#32c5d2">Document</b>',
                    datafield: 'Download',
                    columntype: 'button',
                    width:'10%',
                    cellsrenderer: function () {
                        return 'Download';
                    },
                    buttonclick: function (row) {

                        self.showUploadPopup(row);
                    }
                },

            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactUploadToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactUploadToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactUploadToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactUploadService.prototype.loadTable = function (contactId) {
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

        $("#contactUploadToolbar").find("button").click(function () {
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
        $("#contentUploadWindow").jqxWindow({
            showCollapseButton: true, height: '400px',width:'500px',
            isModal:true,
            theme : JQXTHEME,
            autoOpen: false
        });

    };
    ContactUploadService.prototype.GetData = function () {
        return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactUploadTab']")));
    };
    return ContactUploadService;
}());
