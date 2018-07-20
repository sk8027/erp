var ActivityService = (function () {
    function ActivityService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#activityTable");
        this.gridToolbar = $("#activityToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/lead_controller/get_activity';
        this.lovURL = CONTEXT_PATH +'/app/lead_controller/refresh_activity_lov';

        this.title = "TITLE HERE";
        this.fields = [
            { name: 'id', type: 'int', required:false},
            { name: 'contactId', type: 'int', required:false},
            { name: 'contactName', type: 'string', required:false},
            { name: 'contactById', type: 'int', required:false},
            { name: 'contactByName', type: 'string', required:false},
            { name: 'activityTypeId', type: 'int', required:true, index:7},
            { name: 'activityTypeName', type: 'string', required:false},
            { name: 'subject', type: 'string', required:true, index:9},
            { name: 'description', type: 'string', required:false},
            { name: 'priorityId', type: 'int', required:true, index:10},
            { name: 'priorityName', type: 'string', required:false},
            { name: 'startDate', type: 'date', required:false},
            { name: 'dueDate', type: 'date', required:false},
            { name: 'location', type: 'string', required:false},
            { name: 'directionId', type: 'string', required:false},
            { name: 'directionName', type: 'string', required:false},
        ];
    }

    ActivityService.prototype.constructTable = function () {
        var self = this;
        var container = self.dataGrid;
        self.source = {
            datatype: 'json',
            datafields:  self.fields ,
            localdata : self.data,
            updaterow: function (rowid, rowdata, commit) {
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
                { text: '', datafield: 'id',hidden:true},
                {text: '<b style="color:#32c5d2">Contact</b>', datafield: 'contactId',width:'10%',hidden:true},
                {text: '<b style="color:#32c5d2">Contact</b>', datafield: 'contactName',width:'10%',hidden:true},
                {text: '<b style="color:#32c5d2">Contact By</b>', datafield: 'contactById',width:'10%' , hidden:true},
                {text: '<b style="color:#32c5d2">Contact By</b>', datafield: 'contactByName',width:'10%',editable:false,
                    cellsrenderer :function (row, column, value, defaultHtml) {

                            var element = $(defaultHtml);
                            element.css('color', '#999');
                            return element[0].outerHTML;

                    }},
                {text: '<b style="color:#32c5d2">Activity Type</b>', datafield: 'activityTypeId',
                    width:'10%',
                    displayfield: 'activityTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.activityTypeId);

                    },
                    cellbeginedit : function (row, datafield, columntype, value) {
                            if(container.jqxGrid('getcellvalue',row,'id') == null){
                                return true;
                            }else{
                                return false;
                            }
                    },
                    cellsrenderer :function (row, column, value, defaultHtml) {
                        if(container.jqxGrid('getcellvalue',row,'id') != null){
                            var element = $(defaultHtml);
                            element.css('color', '#999');
                            return element[0].outerHTML;
                        }
                        return defaultHtml;
                    }
                },
                { text: '<b style="color:#32c5d2">Subject</b>', datafield: 'subject'},
                { text: '<b style="color:#32c5d2">Description</b>', datafield: 'description'},
                {text: '<b style="color:#32c5d2">Priority</b>', datafield: 'priorityId',
                    width:'10%',
                    displayfield: 'priorityName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.priorityId);

                    }
                },
                { text: '<b style="color:#32c5d2">Start Date</b>', datafield: 'startDate',columntype: 'datetimeinput',cellsformat :'dd-MMMM-yyyy'},
                { text: '<b style="color:#32c5d2">Due Date</b>', datafield: 'dueDate',cellsformat :'dd-MMMM-yyyy'},
                { text: '<b style="color:#32c5d2">Location</b>', datafield: 'location'},
                {text: '<b style="color:#32c5d2">Direction</b>', datafield: 'directionId',
                    width:'10%',
                    displayfield: '', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.directionId);

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
                $("#activityToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#activityToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#activityToolbar #DeleteRowBtn").attr("disabled","disabled");
            }
        });
    }
    /********************** Load the table from Server ******************************************/
    ActivityService.prototype.loadTable = function (contactId) {
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

        $("#activityToolbar").find("button").click(function () {
            if(this.id === "AddRowBtn"){
                self.dataGrid.jqxGrid('addrow', null, {id:null,contactId : self.contactId, contactById:CURRENT_USER.contactId});
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

        ActivityService.prototype.GetData = function () {
            return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#activityTab']")));
        }
    };

    return ActivityService;
}());