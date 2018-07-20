var Framework = /** @class */ (function () {
    function Framework() {
     }
    Framework.prototype.GenerateFormComponents = function (service) {
        var fields = service.fields;

        var components = {};
         $.each(fields,function(index,field){

            components[field.name] =  "#"+service.formDlg.attr("id") +" [formControlName='"+field.name+"']";
         });
         return components;
     };
    Framework.prototype.GenerateDropDownAdapter = function (data,labelAttribute,valueAttribute) {
        if(labelAttribute === undefined){
            labelAttribute = 'label';
        }
        if(valueAttribute === undefined){
            valueAttribute = 'value';
        }
        var adapter = new $.jqx.dataAdapter({
            datatype: 'json',
            datafields: [
                { name: labelAttribute, type: 'string' },
                { name: valueAttribute, type: 'string' },
                {name:'code',type:'string'}
            ],
            localdata: data
        });
        return adapter;
    };
    Framework.prototype.GenerateDropDownList = function (container,data,labelAttribute,valueAttribute) {
        if(labelAttribute === undefined){
            labelAttribute = 'label';
        }
        if(valueAttribute === undefined){
            valueAttribute = 'value';
        }

        container.jqxDropDownList({
            theme: JQXTHEME,
            source: this.GenerateDropDownAdapter(data,labelAttribute,valueAttribute),
            displayMember: labelAttribute,
            valueMember: valueAttribute,
            width: '100%',
            height: '34px',
            filterable: 'true',
            searchMode : 'containsignorecase',

        });
    };
    Framework.prototype.GenerateGridDropDownList = function (container,data,labelAttribute,valueAttribute) {
        if(labelAttribute === undefined){
            labelAttribute = 'label';
        }
        if(valueAttribute === undefined){
            valueAttribute = 'value';
        }

        container.jqxDropDownList({
            theme: JQXTHEME,
            source: this.GenerateDropDownAdapter(data,labelAttribute,valueAttribute),
            displayMember: labelAttribute,
            valueMember: valueAttribute,
             filterable: 'true',
            searchMode : 'containsignorecase',

        });
    };
    Framework.prototype.GenerateListBox = function (container,data,labelAttribute,valueAttribute) {
        if(labelAttribute === undefined){
            labelAttribute = 'label';
        }
        if(valueAttribute === undefined){
            valueAttribute = 'value';
        }
        container.jqxListBox({
            theme: JQXTHEME,
            source: this.GenerateDropDownAdapter(data,labelAttribute,valueAttribute),
            displayMember: labelAttribute,
            valueMember: valueAttribute,
            width: '100%',
            height: '100%',
            filterable: 'true',
            searchMode : 'containsignorecase',

        });
    };
    Framework.prototype.refreshGrid = function (container) {
        container.jqxGrid('clearfilters');
        container.jqxGrid('clearselection');
        container.jqxGrid('updatebounddata','filter');
    };

    Framework.prototype.validateForm = function(target){
        var valid = true;
        var validationValue = null;
        var isJqx = false;
        
        $.each($(target).find("*[required='true']"), function (index, element) {

            if($(element).hasClass("jqx-widget") && $(element).attr("role") === 'combobox'){
                isJqx = true;
                validationValue = $(element).jqxDropDownList('getSelectedIndex');
            }else{
                isJqx = false;
                validationValue = $(element).val();
            }
            if ($(element).val() === -1 || $(element).val() === null || $(element).val().trim().length === 0) {
                if(isJqx){
                    $(element).css('border-color','red');
                }else {
                    $(element).parent().addClass('has-error');
                }
                valid = false;
            } else {
                if(isJqx){
                    $(element).css('border-color','');
                }else{
                    $(element).parent().removeClass('has-error');
                }

            }
        });
        if(!valid){
            toastr.clear();

            CommonService.errorMessage("Validation Error","Required Fields Are Missing");
        }
        return valid;
    };
    Framework.prototype.PopulateGrid = function (service) {

        var columns =  this.GenerateTableColumns (service);
        var source = this.GenerateSource(service);
        var container = service.dataGrid;
        var toolbar = service.gridToolbar;

        container.jqxGrid({
            width: '100%',
            source: new $.jqx.dataAdapter(source),
            columns: columns,
            pageable: true,
            filterable: true,
            virtualmode:true,
            rendergridrows: function (obj) {
                return obj.data;
            },
            theme: JQXTHEME,
            selectionmode: 'checkbox'
        });
        container.on('rowselect', function ()
        {
            var btn = toolbar.find("#DeleteBtn");
            if($(this).jqxGrid('getselectedrowindexes').length === 0){
                 if(btn !== undefined && btn !== null) {
                    btn.attr("disabled", "disabled");
                }
            }else{
                 if(btn !== undefined && btn !== null) {
                    btn.removeAttr("disabled");
                }
            }


        });
        container.on('rowunselect', function ()
        {

            if($(this).jqxGrid('getselectedrowindexes').length === 0){
                if(toolbar !== undefined && toolbar !== null) {
                    var btn = toolbar.find("#DeleteBtn");
                    if(btn !== undefined && btn !== null) {
                        btn.attr("disabled", "disabled");
                    }
                }
            }

        });
    };

    Framework.prototype.GenerateSource = function(service){
        var container = service.dataGrid;
        var fields = service.fields;
        var url = service.listURL;
        return {
            datatype: 'json',
            datafields: fields,
            root: 'data',
            cache: false,
            id: 'id',
            url: url,
            /*data: {
                CURRENT_USER:  sessionStorage.getItem("CURRENT_USER")
            },*/
            beforeprocessing: function (data) {

                this.totalrecords = data.data === undefined || data.data === null || data.data.length === 0 ? 0 : data.data[0]["totalRows"];
            },
            deleterow: function (rowid, commit) {
                commit(true);
            },
            filter: function()
            {
                 container.jqxGrid('updatebounddata', 'filter');
            }
        };


    };

    Framework.prototype.GenerateTableColumns = function(service){
        var tableColumn = [];
        var self = this;

        $.each(service.fields,function(index,col){
            if(col.filterable === undefined || col.filterable === null){
                col.filterable = true;
            }
            var colMeta = {};
            colMeta.text = '<b style="color:#32c5d2">'+col.label+'</b>';
            colMeta.datafield = col.name;
            colMeta.filterable = col.filterable;

            if(col.gui === 'datetime') {

                colMeta.cellsformat = 'dd-MMMM-yyyy hh:mm:ss tt';
            }else if(col.gui === 'date') {
                colMeta.cellsformat = 'dd-MMMM-yyyy';
            }else if(col.gui === undefined || col.gui === null){
                 //tableColumn.push({ text: '<b style="color:#32c5d2">'+col.label+'</b>', datafield: col.name });

            }else if(col.gui === 'hidden'){
                //tableColumn.push({ text: '<b style="color:#32c5d2">'+col.label+'</b>', datafield: col.name , hidden:true});
                colMeta.hidden = true;

            }else if(col.gui === 'list'){


                if(col.filterable === true) {
                    colMeta.filtertype = 'list';
                    colMeta.filteritems = self.GenerateDropDownAdapter(service.lovMap[col.name]);
                    colMeta.createfilterwidget = function (column, htmlElement, editor) {
                        editor.jqxDropDownList({filterable:true, displayMember: 'label', valueMember: 'value' });
                    };
                }
                colMeta.displayfield = col.labelAttribute;



            }
            if(col.gui !== 'skip') {
                tableColumn.push(colMeta);
            }
        });
        tableColumn.push({
            text: '<b style="color:#32c5d2">Action</b>',
            datafield: 'Edit',
            columntype: 'button',
            filterable: false,
            sortable: false,
            'width': '50px',
            cellsrenderer: function () {
                return 'Edit';
            },
            buttonclick: function (row) {
                service.getById(service.dataGrid.jqxGrid('getrowdata', row).id);
            }
        });
        return tableColumn;
    }
    Framework.prototype.GetFormData = function(service){
        var formData = {};
        $.each(service.fields, function (i, field) {

            formData[field.name] = service.formDlg.find("[formControlName='" + field.name + "']").val();
            var controlType =service.formDlg.find("[formControlName='" + field.name + "']").attr("type");
            if(controlType === "date" || controlType === "datetime-local"){

                if(formData[field.name] !== null && formData[field.name].length > 0){
                    formData[field.name] = new Date(formData[field.name]);
                }
            }
        });
        return formData;
    }

    Framework.prototype.aggregateValue = function(container, columnName){
        var aggregate = 0;
        var colVal = 0;

        $.each(container.jqxGrid('getrows'),function(index,row){

            var colVal =row[columnName];

            if(isNaN(colVal)){
                colVal = 0;
            }
            aggregate += colVal;

        });

        return parseInt(aggregate);
    }

    Framework.prototype.GetData = function(area){
        var formData = {};
        var field = null;
        $.each(area.find("*[formControlName]"), function (i, control) {
             field =$(control).attr("formControlName");
            if(!$(control).is('img')) {
                formData[$(control).attr("formControlName")] = $(control).val();
                if ($(control).attr("type") === "date") {//if it is date input then convert to Date Object
                    if (formData[field] !== null && formData[field].length > 0) {
                        formData[field] = new Date(formData[field]);
                    }
                }
            }
        });
        return formData;
    }
    Framework.prototype.SaveForm = function(service, isValid){
        if(isValid == undefined){
            isValid = this.validateForm(service.formDlg);
        }

        var formData = {};
        if(isValid) {
            formData = this.GetFormData(service);
             CommonService.sendAjaxRequest(service.saveURL,'post',JSON.stringify(formData),service.formDlg)
                .then(function( responseData ) {
                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        service.formDlg.jqxWindow('close');
                        CommonService.toastMessage(self.title,"Record Saved Successfully");


                        if(formData.id > 0){
                            service.dataGrid.jqxGrid('gotopage', service.dataGrid.jqxGrid('getpaginginformation').pagenum);

                        }else{
                            service.dataGrid.jqxGrid('gotopage', service.dataGrid.jqxGrid('getpaginginformation').pagescount -1);
                        }

                        service.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        }
    };
    Framework.prototype.DeleteSelectedRows = function(service,localDelete){
        if ( localDelete === undefined || localDelete === null){
            localDelete = false;
        }
        HtmlHelper.ConfirmationDialog("rowsDeleteDlg", service.title, "Are You sure you want to Delete?", "D", function () {
            var ids = [];
            $.each(service.dataGrid.jqxGrid('getselectedrowindexes'),function(index,row){
                ids.push(service.dataGrid.jqxGrid('getrowid', row));
            });
            if ( localDelete ) {
                if(ids.length > 0) {
                    service.dataGrid.jqxGrid('clearselection');
                    service.dataGrid.jqxGrid('deleterow', ids);
                }
            } else {
                CommonService.sendAjaxRequest(service.deleteURL, 'post', JSON.stringify(ids), service.formDlg)
                    .then(function (responseData) {

                        if (responseData["dataHeader"].messageType === 'SUCCESS') {
                            CommonService.notificationMessage(self.title, "Record Deleted Successfully");
                            service.dataGrid.jqxGrid('deleterow', ids);
                             service.dataGrid.jqxGrid('clearselection');
                            service.dataGrid.jqxGrid('updatebounddata','cell');
                        }
                    });
            }
        });

    };
    Framework.prototype.DeleteRecord = function(service,id){
        HtmlHelper.ConfirmationDialog("recordDeleteDlg", service.title, "Are You sure you want to Delete?", "D", function () {

            CommonService.sendAjaxRequest(service.deleteURL,'post',"["+id+"]",service.formDlg)
                .then(function( responseData ) {

                    if (responseData["dataHeader"].messageType === 'SUCCESS') {
                        CommonService.notificationMessage(service.title,"Record Deleted Successfully");
                        service.formDlg.jqxWindow('close');
                        service.dataGrid.jqxGrid('clearselection');
                        service.dataGrid.jqxGrid('updatebounddata','cell');
                    }
                });
        });

    };
    Framework.prototype.FormatDate = function(date){
         var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);

        var formattedDate = date.getFullYear()+"-"+(month)+"-"+(day) ;
        return formattedDate;
    }
    Framework.prototype.FormatDateTime = function(date){
        debugger;
        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var min = date.getMinutes();
        var hr = date.getHours();
        var formattedDate = date.getFullYear()+"-"+(month)+"-"+(day)+"T"+hr+":"+min;
        return formattedDate;
    }
    Framework.prototype.RefreshJsonGrid = function(service,url,target){
        CommonService.sendAjaxRequest(url, 'get', null, $(".form-body")).then(function (data) {
            if(target = undefined){
                target = service.dataGrid;
            }
            target.jqxGrid('clearselection');

            target.jqxGrid('source')._source.localdata = data.data;
            target.jqxGrid('updatebounddata', 'cells');
            target.jqxGrid('refresh');

        });
    }
    Framework.prototype.ClearGrid = function(target){

            target.jqxGrid('clearselection');

            target.jqxGrid('source')._source.localdata = [];
            target.jqxGrid('updatebounddata', 'cells');
            target.jqxGrid('refresh');


    }
    Framework.prototype.ClearJsonGrid = function(service){

            service.dataGrid.jqxGrid('clearselection');
            service.source.localdata = [];
            service.dataGrid.jqxGrid('updatebounddata', 'cells');


    }
    Framework.prototype.GetGridData = function (service, gridMandatory, validationTab) {
         var hasError = false;
         var gridName = service.dataGrid.attr("id");
        var rows = service.dataGrid.jqxGrid('getrows');
        var gridData = [];
        if(rows.length > 0) {
            $.each(rows, function (rowIndex, row) {
                var rowData = {};

                $.each(service.fields, function (index, field) {
                    if (field.required === true) {
                        if (row[field.name] == null || row[field.name] == undefined && (row[field.name].length === 0 || (row[field.name].length === undefined && row[field.name] < 1))) {
                            debugger;
                            hasError = true;
                            $("#row" + rowIndex + gridName + " div:nth-child(" + field.index + ")").css("background", "#e7505a")
                        } else {
                            $("#row" + rowIndex + gridName + " div:nth-child(" + field.index + ")").css("background", "")
                        }
                    }

                    rowData[field.name] = row[field.name];

                });
                gridData.push(rowData);
            });
            if (gridMandatory !== undefined && gridMandatory === true && !hasError) {
                if (gridData.length === 0) {
                    hasError = true;
                }
            }
            if (hasError) {
                if (validationTab !== undefined) {
                    validationTab.parent().css("border-top", "3px solid red");
                }
                gridData = {};
                gridData = {validation: false};
            } else {
                if (validationTab !== undefined) {
                    validationTab.parent().css("border-top", "");
                }
            }
        }else{
            gridData = [];
        }
        return gridData;
    }

    return Framework;
}());
