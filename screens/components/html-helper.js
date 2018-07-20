var HtmlHelper = function() {
    var services = {
        // HTML Input Text Rendering
        TextBox : function (id,value,propertyJSON) {
            value = value == undefined ? '' : value;

            var control ='<input type="text"  class="form-control input-sm"';
            control += 'id="'+id+'" ';
            control += 'name="'+id+'" ';
            control += 'value="'+value+'" ';
            if(propertyJSON != undefined){
                $.each(propertyJSON, function(key,val){
                    if(key =="readonly" && val ==true){
                        control +=" readonly ";
                    }else if(key =="disabled" ){
                        if(val == true) {
                            control += " disabled ";
                        }
                    }else if(key =="datatype" ){
                        if(val=="numeric") {
                            //control += ' data-inputmask="\'mask\': \'9\', \'repeat\': 10, \'greedy\' : false" ';
                            control += ' data-inputmask-regex="^[0-9]{1,10}" ';

                        }else if(val=="decimal") {
                            control += ' data-inputmask-regex="^[0-9]{1,10}(\\\\.\\\\d{1,2})?$" ';
                        }else if(val=="email") {
                            control +='data-inputmask-regex="[a-za-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?"';
                        }else if(val=="string"){

                        }
                    }else {
                        control += ' ' + key + '="' + val + '" ';
                    }
                });
            }
            control +=' />';

            return control;
        },
        // HTML Input Radio Button Rendering
        RadioButton : function (id,value,propertyJSON) {

            var control = '<input type="radio"  ';
            control += 'id="' + id + '" ';
            control += 'name="' + id.split("-")[0] + '" ';
            control += 'value="' + value + '" ';
            if (propertyJSON != undefined) {
                $.each(propertyJSON, function (key, val) {
                    control += ' ' + key + '="' + val + '" ';

                });
            }
            control += ' />';
            return control;
        },
        // HTML Input Radio Button Rendering
        CheckBox : function (id,value,propertyJSON) {
            // if coming value is one of the following type
            if(value == undefined || value == null || value == "false") {
                value = false;
            } else if(value == 1 || value == "true") {
                value = true;
            }

            var control = '<input type="checkbox"  ';
            control += 'id="' + id + '" ';
            control += 'name="' + id + '" ';
            control += 'value="' + value + '" ';
            // if value is true
            if(value){
                control += 'checked';
            }
            if (propertyJSON != undefined) {
                $.each(propertyJSON, function (key, val) {
                    if(key =="readonly" && val == true ){
                        control +=" readonly ";
                    }else if(key =="disabled"){
                        if(val == true) {
                            control += " disabled ";
                        }
                    }else {
                        control += ' ' + key + '="' + val + '" ';
                    }
                });
            }
            control += ' />';
            return control;
        },
        // HTML Input Hidden Rendering
        HiddenField : function (id,value) {
            value = value == undefined ? '' : value;

            var control ='<input type="hidden" ';
            control += 'id="'+id+'" ';
            control += 'name="'+id+'" ';
            control += 'value="'+value+'" ';
            control +=' />';

            return control;
        },
        // HTML Input Date Rendering
        DateInput : function (id,value,propertyJSON) {
            value = value == undefined ? '' : value;
            var  datatype = 'datatype="date"';
            var control ='<input type="text"  ';
            control += 'id="'+id+'" ';
            control += 'name="'+id+'" ';
            control += 'value="'+value+'" ';
            control += datatype+  ' ';
            if(propertyJSON != undefined){
                $.each(propertyJSON, function(key,val){
                    if(key =="readonly" && val ==true){
                        control +=" readonly ";
                    }else if(key =="disabled"){
                        if(val == true) {
                            control += " disabled ";
                        }
                    }else {
                        control += ' ' + key + '="' + val + '" ';
                    }
                });
            }

            control +=' />';

            return control;
        },
        // HTML Select Rendering
        DropDownList : function (id , value, propertyJSON) {

            var DataList = propertyJSON.dataAdapter;

            var labelProperty ='label';
            if(propertyJSON.listConfig.label != undefined){
                labelProperty = propertyJSON.listConfig.label;
            }
            var valueProperty = 'value';
            if(propertyJSON.listConfig.value != undefined){
                valueProperty = propertyJSON.listConfig.value;
            }
            value = value == undefined ? '' : value;

            var control ='<select  class="form-control input-sm select2-multiple" style="width:100%" ';
            control += 'id="'+id+'" ';
            control += 'name="'+id+'" ';
            control += 'value="'+value+'" ';
            if(propertyJSON != undefined){
                $.each(propertyJSON, function(key,val){

                    if(key =="readonly" && val ==true){
                        control +=" readonly ";
                    }else if(key =="disabled" && val == true){
                        control +=" disabled ";
                    }
                    if(key !="dataAdapter" && key !="listConfig"  && key !="datalabel" && key !="datavalue" && key !="readonly" && key !="disabled"   ) {
                        control += ' ' + key + '="' + val + '" ';
                    }


                });
            }
            control +=  ' >';
            var options ='<option></option>';
            var selected ='';
            $.each(DataList , function(i,lov){

                if(lov[valueProperty] == value){
                    selected = 'selected';
                }else{
                    selected ='';
                }
                options += '<option value="'+lov[valueProperty]+'" '+selected+' >'+lov[labelProperty]+'</option>';
            });
            control += options +' <select/>';

            return control;
        },
        // Fill Drop Drop Down
        // Example HtmlHelper.FillDropDown($('#roleTypeId'), 43, {datalist : serverData.lovMap.roleType})
        FillDropDown : function (target , selectedValue, propertyJSON) {
            var DataList = propertyJSON.datalist;
            var labelProperty ='label';
            if(propertyJSON.datalabel != undefined){
                labelProperty = propertyJSON.datalabel;
            }
            var valueProperty = 'value';
            if(propertyJSON.datavalue != undefined){
                valueProperty = propertyJSON.datavalue;
            }
            selectedValue = selectedValue == undefined ? '' : selectedValue;

            var options ='<option value="-1"></option>';
            var selected ='';
            $.each(DataList , function(i,lov){

                if(lov[valueProperty] == selectedValue){
                    selected = 'selected';
                }else{
                    selected ='';
                }
                options += '<option value="'+lov[valueProperty]+'" '+selected+' >'+lov[labelProperty]+'</option>';
            });

            target.html(options);
            
        },
        // Fill Drop Drop Down
        // Example HtmlHelper.FillDropDown($('#roleTypeId'), 43, {datalist : serverData.lovMap.roleType})
        GenerateDropdownOptions : function (selectedValue, propertyJSON) {
            var DataList = propertyJSON.datalist;
            var labelProperty ='label';
            if(propertyJSON.datalabel != undefined){
                labelProperty = propertyJSON.datalabel;
            }
            var valueProperty = 'value';
            if(propertyJSON.datavalue != undefined){
                valueProperty = propertyJSON.datavalue;
            }
            selectedValue = selectedValue == undefined ? '' : selectedValue;

            var options ='';
            var selected ='';
            $.each(DataList , function(i,lov){

                if(lov[valueProperty] == selectedValue){
                    selected = 'selected';
                }else{
                    selected ='';
                }
                options += '<option value="'+lov[valueProperty]+'" '+selected+' >'+lov[labelProperty]+'</option>';
            });

            return options

        },
        // Private Function to Render Cell with Html Control
        _RenderCell : function (id,value,propertyJSON,HtmlHelper) {
            var rowspan = '';
            var colspan = '';
            var style = '';
            var cellclass = '';
            if(propertyJSON != undefined) {
                if (propertyJSON.rowspan != undefined) {
                    rowspan = ' rowspan = "' + propertyJSON.rowspan + '" ';
                    delete propertyJSON.rowspan;
                }
                if (propertyJSON.cellclass != undefined) {
                    cellclass = ' class = "' + propertyJSON.cellclass + '" ';
                    delete propertyJSON.cellclass;
                }
                if (propertyJSON.colspan != undefined) {
                    colspan = ' colspan = "' + propertyJSON.colspan + '" ';
                    delete propertyJSON.colspan;
                }
                if (propertyJSON.cellstyle != undefined) {
                    colspan = ' style = "' + propertyJSON.cellstyle + '" ';
                    delete propertyJSON.cellstyle;
                }
            }
            var cell = "<td "+rowspan+colspan+style + cellclass +">";
            cell += HtmlHelper;
            cell += "</td>";
            return cell;
        },
        // HTML Table Cell with Text Box
        TextBoxCell : function (id,value,propertyJSON) {
            var cell =HtmlHelper._RenderCell (id,value,propertyJSON,HtmlHelper.TextBox(id,value,propertyJSON));
            return cell;
        },
        // HTML Table Cell with Date Input
        DateInputCell : function (id,value,propertyJSON) {
            var cell =HtmlHelper._RenderCell (id,value,propertyJSON,HtmlHelper.DateInput(id,value,propertyJSON));
            return cell;
        },
        // HTML Table Cell with Radio Button
        RadioButtonCell : function (id,value,propertyJSON) {
            var cell =HtmlHelper._RenderCell (id,value,propertyJSON,HtmlHelper.RadioButton(id,value,propertyJSON));
            return cell;
        },
        // HTML Table Cell with Check Button
        CheckBoxCell : function (id,value,propertyJSON) {
            var cell =HtmlHelper._RenderCell (id,value,propertyJSON,HtmlHelper.CheckBox(id,value,propertyJSON));
            return cell;
        },
        // HTML Table Cell with Drop Down
        DropDownListCell : function (id,value,propertyJSON) {
            var cell =HtmlHelper._RenderCell (id,value,propertyJSON,HtmlHelper.DropDownList(id,value,propertyJSON));
            return cell;
        },
        // HTML Table Cell with Multiple Hidden Fields
        HiddenFieldCell : function (fields) {
            var hiddenHtml ='';
            if(fields != undefined ){
                $.each(fields,function(index,field){
                    hiddenHtml +=HtmlHelper.HiddenField(field.name,field.value);
                })
            }
            var cell = '<td style="display:none">' + hiddenHtml+'</td>';
            return cell;
        },
        ConfirmationDialog : function(name,title,message,type,callback){

            if(type=="D" || type=="d"){
                var icon = '<div class="col-sm-2"><i class="fa fa-close  " style="color:red;font-size:40px"></i></div>';
            }else if(type=="S" || type=="s"){
                var icon = '<div class="col-sm-2"><i class="fa fa-save  " style="color:#32c5d2;font-size:40px"></i></div>';
            }else if(type=="Q" || type=="q"){
                var icon = '<div class="col-sm-2"><i class="fa fa-question-circle  " style="color:#32c5d2;font-size:40px"></i></div>';
            }



            var dlg = '<div id="'+name+'" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">'+
                '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'+
                '<h4 class="modal-title">'+title+'</h4></div>'+
            '<div class="modal-body">'+
                '<div class="portlet-body form">'+
                '<form role="form">'+
                '<div style="padding: 20px;">'+icon +

                '<div class="col-sm-10">'+message+'</div>'+
            '</div>'+
            '</form>'+
            '</div>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn green" id="'+name+'YesBtn">Yes</button>'+
            '<button type="button" id="'+name+'NoBtn" class="btn btn-outline dark">No</button>'+
             '</div>'+
              '</div>';
            var option =  {remote: false, width: 400, toggle: "modal",focusOn:$("#"+name+"YesBtn")};
            $(dlg).modal(option);
            $("#"+name+" .modal-footer button").on("click",function(){

                if(this.id==name+'YesBtn'){
                    callback();
                    $("#"+name).modal('hide');
                }else if(this.id==name+'NoBtn'){
                    $("#"+name).modal('hide');

                }
            })
        }
    };
    return services;
}();