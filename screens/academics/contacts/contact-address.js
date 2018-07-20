var ContactAddressService = (function () {
    function ContactAddressService() {
        /********************** Private Variables ******************************************/
        this.lovMap = null;
        this.contactId = null;
        this.dataGrid = $("#contactAddressTable");
        this.gridToolbar = $("#contactAddressToolbar");
        this.framework = new Framework();
        this.listURL = CONTEXT_PATH + '/app/contact_controller/get_address';
         this.lovURL = CONTEXT_PATH +'/app/contact_controller/refresh_address_lov';

        this.title = "Contact Address";
        this.fields = [
            { name: 'id', type: 'int'},
            { name: 'contactId', type: 'int'  },
            { name: 'contactName', type: 'string' },
            { name: 'addressTypeId', type: 'int',required:true,index:4 },
            { name: 'addressTypeName', type: 'string' },
            { name: 'addressLine', type: 'string',required:true,index:5 },
            { name: 'cityId', type: 'int',required:true,index:6 },
            { name: 'cityName', type: 'string' },
            { name: 'countryId', type: 'int',required:true,index:7 },
            { name: 'countryName', type: 'string' },
            { name: 'status', type: 'string',required:true,index:8 },
            { name: 'statusName', type: 'string' },
            { name: 'recordStatus', type: 'string' }
        ];
    }

    ContactAddressService.prototype.constructTable = function (editable) {
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
                { text: 'Record Status', datafield: 'recordStatus',hidden:true},
                { text: 'Id', datafield: 'id',hidden:true},
                { text: 'Contact Id', datafield: 'contactId',hidden:true},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Address Type</b></b>', datafield: 'addressTypeId',
                    width:'10%',
                    displayfield: 'addressTypeName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.addressTypeId);

                    }
                },
                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Address Line</b></b>', datafield: 'addressLine',width:'48%'},
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Country</b></b>', datafield: 'countryId',
                    width:'10%',
                    displayfield: 'countryName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.countryId);
                     }
                },
                { text: '<b style="color:#32c5d2"><b style="color:#32c5d2">City</b></b>', datafield: 'cityId',
                    width:'20%',
                    displayfield: 'cityName', columntype: 'dropdownlist',
                    initeditor: function (row, celltext, editor, cellvalue, pressedChar) {

                        var countryId = self.dataGrid.jqxGrid('getcellvalue',row,'countryId');
                        if(countryId > 0) {
                        self.dataGrid.jqxGrid('hidevalidationpopups');
                            CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/contact_controller/get_city_list/" + countryId, 'get', null, $(".form-body")).then(function (data) {
                                self.framework.GenerateGridDropDownList(editor, data.data);
                                 if (cellvalue > 0) {
                                    editor.jqxDropDownList('selectIndex', editor.jqxDropDownList('getItemByValue', cellvalue).index);
                                }

                            });
                        }else{
                            self.dataGrid.jqxGrid('showvalidationpopup', row, "countryId", "Select a country to choose City");
                        }
                    }
                },
                {text: '<b style="color:#32c5d2"><b style="color:#32c5d2">Active</b></b>', datafield: 'status',
                    width:'10%',
                    displayfield: 'statusName', columntype: 'dropdownlist',
                    createeditor: function (row, value, editor) {
                        self.framework.GenerateGridDropDownList(editor, self.lovMap.status);
                    }
                }

            ],
            editable: editable,
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function (event)
        {
            if(container.jqxGrid('getselectedrowindexes').length === 0) {
                $("#contactAddressToolbar #DeleteRowBtn").attr("disabled","disabled");
            }else {
                $("#contactAddressToolbar #DeleteRowBtn").removeAttr("disabled");
            }
        });
        container.on('rowunselect', function (event)
        {
          if(container.jqxGrid('getselectedrowindexes').length === 0) {
              $("#contactAddressToolbar #DeleteRowBtn").attr("disabled","disabled");
          }
        });
    }
    /********************** Load the table from Server ******************************************/
    ContactAddressService.prototype.loadTable = function (contactId,editable) {
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

        $("#contactAddressToolbar").find("button").click(function () {
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

        ContactAddressService.prototype.GetData = function () {
             return this.framework.GetGridData(this,true, $($("#contactInfo li a[href='#contactAddressTab']")));
        }
    };

    return ContactAddressService;
}());