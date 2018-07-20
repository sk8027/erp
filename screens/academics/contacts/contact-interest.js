
var ContactInterestService = (function () {
    function ContactInterestService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactInterestTable");
        this.gridToolbar = $("#contactInterestToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_interest';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_interest_lov';
        this.title = "Contact Interest";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'contactName', type: 'string', required:false},
            { name: 'interestTypeId', type: 'int', required:true, index:4},
            { name: 'interestTypeName', type: 'string', required:false},
            { name: 'detail', type: 'string', required:false},
            { name: 'status', type: 'string', required:true, index:6},
            { name: 'statusName', type: 'string', required:false},
            { name: 'recordStatus', type: 'string', required:false}

        ];
    }

    ContactInterestService.prototype.constructTable = function () {
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
                {text: '', datafield:'recordStatus', hidden:true},
                { text: '', datafield: 'id',hidden:true},
                { text: '', datafield: 'contactId',hidden:true},
                {text: '<b style="color:#32c5d2">Interest Type</b>', datafield: 'interestTypeId',
                    width:'10%',
                    displayfield: 'interestTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.interestTypeId);

                    }
                },
                { text: '<b style="color:#32c5d2">Detail</b>', datafield: 'detail',width:'78%',},
                {text: '<b style="color:#32c5d2">Status</b>', datafield: 'status',
                    width:'10%',
                    displayfield: 'statusName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);

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
                $("#contactInterestToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactInterestToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactInterestToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactInterestService.prototype.loadTable = function (contactId) {
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

        $("#contactInterestToolbar").find("button").click(function () {
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

        ContactInterestService.prototype.GetData = function () {
            return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactInterestTab']")));
        }
    };

    return ContactInterestService;
}());