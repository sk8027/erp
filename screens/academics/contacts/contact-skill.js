
var ContactSkillService = (function () {
    function ContactSkillService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactSkillTable");
        this.gridToolbar = $("#contactSkillToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_skills';
        this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_skill_lov';
        this.title = "TITLE HERE";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'contactName', type: 'string', required:false},
            { name: 'skillId', type: 'int', required:true, index:4},
            { name: 'skillName', type: 'string', required:false},
            { name: 'years', type: 'int', required:false},
            { name: 'months', type: 'int', required:false},
            { name: 'status', type: 'string', required:true, index:7},
            { name: 'statusName', type: 'string', required:false},
            { name: 'recordStatus', type: 'string', required:false}

        ];
    }

    ContactSkillService.prototype.constructTable = function () {
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
                 {text: '<b style="color:#32c5d2">Skill</b>', datafield: 'skillId',
                    width:'10%',
                    displayfield: 'skillName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.skillId);

                    }
                },

                { text: '<b style="color:#32c5d2">Years</b>', datafield: 'years'},
                { text: '<b style="color:#32c5d2">Months</b>', datafield: 'months'},
                {text: '<b style="color:#32c5d2">Status</b>', datafield: 'status',
                    width:'10%',
                    displayfield: 'statusName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);

                    }
                }


            ],
            editable: true,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactSkillToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactSkillToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactSkillToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactSkillService.prototype.loadTable = function (contactId) {
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

        $("#contactSkillToolbar").find("button").click(function () {
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

        ContactSkillService.prototype.GetData = function () {
            return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactSkillTab']")));
        }
    };

    return ContactSkillService;
}());