 var ContactIdentityService = (function () {
    function ContactIdentityService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactIdentityTable");
        this.gridToolbar = $("#contactIdentityToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_identity';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_identity_lov';
        this.title = "Contact Identity";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'identityTypeId', type: 'int', required:true, index:3},
            { name: 'identityTypeName', type: 'string', required:false},
            { name: 'value', type: 'string', required:true, index:4},
            { name: 'issueDate', type: 'date'},
            { name: 'expireDate', type: 'date'},
            { name: 'issueCountryId', type: 'int'},
            { name: 'issueCountryName', type: 'string'},
            { name: 'issueAuthority', type: 'string'},
            { name: 'contactId', type: 'int'},
            { name: 'status', type: 'string', required:true, index:9},
            { name: 'statusName', type: 'string'},
            { name: 'contentPath', type: 'string'},
            {name : 'recordStatus', type:'string'}

        ];
    }
     ContactIdentityService.prototype.handleClick= function (event) {
        var self = this;
         var row = event.target.parentElement.id.split("-")[1];
         var buttonType  = event.target.parentElement.id.split("-")[0];
         $("#identityUploadWindow button").attr("data-row",row);
         var path = this.dataGrid.jqxGrid('getcellvalue',row,'contentPath');
         if(buttonType == "download"){
            window.open(path,'_blank');
         }else{
             $("#identityUploadWindow").jqxWindow('open');
             $("#identityUploadWindow button").on('click',function () {
                 var row = $("#identityUploadWindow button").attr("data-row");
                 debugger;
                 var contactId = $("#contactIdentityTable").jqxGrid('getcellvalue',row,"contactId");
                 var docId = $("#contactIdentityTable").jqxGrid('getcellvalue',row,"id");

                 var  url = CONTEXT_PATH+"/app/contact_controller/upload_document/identity/"+contactId+"/"+docId;
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
                         $("#identityUploadWindow").jqxWindow('close');
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
    ContactIdentityService.prototype.constructTable = function () {
        var self = this;
        var container = this.dataGrid;
        this.source = {
            datatype: 'json',
            datafields:  this.fields ,
            localdata : this.data,
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
                {text: '', datafield:'recordStatus', hidden:true},
                { text: '', datafield: 'id',hidden:true},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Identity</b></b>', datafield: 'identityTypeId',
                    width:'10%',
                    displayfield: 'identityTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.identityTypeId);

                    }
                },

                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Value</b></b>', datafield: 'value'},
                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Issue Date</b></b>', datafield: 'issueDate',columntype:'datetimeinput', cellsformat:DATE_FORMAT,
                    createeditor : function(row,value,editor){ editor.jqxDateTimeInput({theme: JQXTHEME }); }},
                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Expiry Date</b></b>', datafield: 'expireDate',columntype:'datetimeinput', cellsformat:DATE_FORMAT,
                createeditor : function(row,value,editor){ editor.jqxDateTimeInput({theme: JQXTHEME }); }},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Country</b></b>', datafield: 'issueCountryId',
                    width:'5%',
                    displayfield: 'issueCountryName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.issueCountryId);

                    }
                },
                 { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Issue Authority</b></b>', datafield: 'issueAuthority'},
                { text: '', datafield: 'contactId',hidden:true},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Status</b></b>', datafield: 'status',
                    width:'5%',
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
                             var buttons = '<button title="Upload Content" id="upload-' + row + '" type="button" class="btn red btn-xs" onclick="service = new ContactIdentityService(); service.handleClick(event)"><i class="fa fa-upload"></i></button>';
                              if(path != null && path.length > 0){
                                  buttons += ' <button title="Download Content" id="download-' + row + '" type="button" class="btn blue-hoki btn-xs" onclick="service = new ContactIdentityService(); service.handleClick(event)"><i class="fa fa-download"></i></button>';
                              }
                             return buttons;
                         }else{
                             return '<button id="upload-' + row + '" type="button" disabled class="btn red btn-xs" onclick="service = new ContactIdentityService(); service.handleClick(event)"><i class="fa fa-upload"></i></button>';

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
                $("#contactIdentityToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactIdentityToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactIdentityToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactIdentityService.prototype.loadTable = function (contactId) {
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

        $("#contactIdentityToolbar").find("button").click(function () {
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
        $("#identityUploadWindow").jqxWindow({
            showCollapseButton: true, height: '200px',width:'500px',
            isModal:true,
            theme : JQXTHEME,
            autoOpen: false
        });

    };
     ContactIdentityService.prototype.GetData = function () {
         return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactIdentityTab']")));
     }

    return ContactIdentityService;
}());
