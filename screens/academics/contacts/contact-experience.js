var ContactExperienceService = (function () {
    function ContactExperienceService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactExperienceTable");
        this.gridToolbar = $("#contactExperienceToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_experiences';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_experience_lov';
        this.title = "Experienc";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'contactName', type: 'string', required:false},
            { name: 'designation', type: 'string', required:true, index:0},
            { name: 'employer', type: 'string', required:true, index:0},
            { name: 'joiningDate', type: 'date', required:false},
            { name: 'leavingDate', type: 'date', required:false},
            { name: 'currencyId', type: 'int', required:true, index:0},
            { name: 'currencyName', type: 'string', required:false},
            { name: 'income', type: 'int', required:false},
            { name: 'otherInfo', type: 'string', required:false},
            { name: 'status', type: 'string', required:true, index:0},
            { name: 'statusName', type: 'string', required:false},
            {name: 'recordStatus',type:string}
        ];
    }

    ContactExperienceService.prototype.constructTable = function () {
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
                {text:'', datafield:'recordStatus', hidden:true},
                { text: '', datafield: 'id',hidden:true},
                { text: '', datafield: 'contactId',hidden:true},
                { text: '<b style="color:#32c5d2">Designation</b>', datafield: 'designation'},
                { text: '<b style="color:#32c5d2">Employer</b>', datafield: 'employer'},
                { text: '<b style="color:#32c5d2">Joining Date</b>', datafield: 'joiningDate'},
                { text: '<b style="color:#32c5d2">Leaving Date</b>', datafield: 'leavingDate'},
                {text: '<b style="color:#32c5d2">Currency</b>', datafield: 'currencyId',
                    width:'10%',
                    displayfield: 'currencyName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.currencyId);

                    }
                },
                { text: '<b style="color:#32c5d2">Income</b>', datafield: 'income'},
                { text: '<b style="color:#32c5d2">Other Info</b>', datafield: 'otherInfo'},
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
                $("#contactExperienceToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactExperienceToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactExperienceToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactExperienceService.prototype.loadTable = function (contactId) {
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

        $("#contactExperienceToolbar").find("button").click(function () {
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

        ContactExperienceService.prototype.GetData = function () {
            return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactExperienceTab']")));
        }
    };

    return ContactExperienceService;
}());