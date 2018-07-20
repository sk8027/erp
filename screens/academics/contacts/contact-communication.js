var ContactCommunicationService = (function () {
    function ContactCommunicationService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactCommunicationTable");
        this.gridToolbar = $("#contactCommunicationToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_communications';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_communication_lov';

        this.title = "Contact Communication";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'commTypeId', type: 'int', required:true, index:4},
            { name: 'commTypeName', type: 'string'},
            { name: 'value', type: 'string', required:true, index:5},
            { name: 'remarks', type: 'string', required:false},
            { name: 'status', type: 'string', required:true, index:7},
            { name: 'statusName', type: 'string'},
            { name: 'recordStatus', type: 'string'}
        ];
    }

    ContactCommunicationService.prototype.constructTable = function (editable) {
        if(editable == undefined){
            editable = true;
        }
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
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Type</b></b>', datafield: 'commTypeId',
                    width:'10%',
                    displayfield: 'commTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.commTypeId);

                    }
                },

                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Value</b></b>', datafield: 'value'},
                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Remarks</b></b>', datafield: 'remarks'},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Status</b></b>', datafield: 'status',
                    width:'10%',
                    displayfield: 'statusName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);

                    }
                },

            ],
            editable: editable,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactCommunicationToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactCommunicationToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactCommunicationToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactCommunicationService.prototype.loadTable = function (contactId,editable) {
        var self = this;
        if(contactId > 0) {
            self.contactId = contactId;
            CommonService.sendAjaxRequest(this.listURL + "/" + contactId, 'get', null, $(".form-body")).then(function (data) {
                self.lovMap = data.lovMap;
                self.data = data.data;
                self.constructTable(editable);

            });
        }else{
            CommonService.sendAjaxRequest(this.lovURL , 'get', null, $(".form-body")).then(function (data) {
                self.lovMap = data.data;
                self.data = [];
                self.constructTable(editable);

            });
        }

        $("#contactCommunicationToolbar").find("button").click(function () {
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

        ContactCommunicationService.prototype.GetData = function () {
            return this.framework.GetGridData(this,false, $($("#contactInfo li a[href='#contactCommunicationTab']")));
        }
    };

    return ContactCommunicationService;
}());