var CommonService = function() {
    var services = {
        clone: function (object) {
            function F() {
            }

            F.prototype = object;
            return new F;
        },
        currentActivityCode: function () {
           return $($("#tabs ul>li a").eq($("#tabs").tabs('option', 'active')).attr('href')).find("#activityCode").val();
        },
        getMainTab: function (scope) {
            var result;
            if (scope.$parent.mainTabSettings != undefined) {
                return scope.$parent.mainTabSettings.jqxTabs('getContentAt', scope.$parent.mainTabSettings.jqxTabs('selectedItem'));
            } else {
                result = services.getMainTab(scope.$parent);
            }
            return result;
        },
        getLoaderSettings: function (scope) {
            var result;
            if (scope.$parent.loaderSettings != undefined) {
                return scope.$parent.loaderSettings;
            } else {
                result = services.getLoaderSettings(scope.$parent);
            }
            return result;
        },
        compareDate: function (date1, date2, checkMiliseconds) {
            if (!checkMiliseconds) {
                if (date1 && date2) {
                    date1.setMinutes(0);
                    date1.setHours(0);
                    date1.setSeconds(0);
                    date1.setMilliseconds(0);
                    date2.setMinutes(0);
                    date2.setHours(0);
                    date2.setSeconds(0);
                    date2.setMilliseconds(0);
                }
            }
            var compare = 0;
            if (date1 && date2) {
                if (date1 > date2) {
                    compare = 1
                } else if (date1 < date2) {
                    compare = -1
                }
            }
            return compare;

        },
        /**
         * @author Khair Ali Naqvi
         * @summary return Time as String by passing  Date Object
         */
        convertToTime: function (date) {
            var time = "";
            var ampm = "";
            if (date != null) {
                date = new Date(date);
				/* if getting hour is greater then 12 */
                am = date.getHours() > 12 ? 'PM ' : 'AM ';
                time = (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ":" + date.getMinutes();
            }
            return date.getMonth() + ", " + services.getDayName(date.getDay()) + ", " + date.getFullYear() + " " + time + " " + am;
        },

        /**
         * @author Khair Ali Naqvi
         * @summary return Date by passing  time as String or Date
         */
        convertToDate: function (time) {
            var timeParts = [];
            if (time != null) {
				/* if type is  Date */
                if ($.type(time) == 'date') {
                    timeParts[0] = time.getHours();
                    timeParts[1] = time.getMinutes();
                } else {
                    timeParts = time.split(":");
                }
                timeParts[0] = parseInt(timeParts[0]);
                timeParts[1] = parseInt(timeParts[1]);
				/* saving time into date object*/
                var d = new Date();
                d.setHours(timeParts[0]);
                d.setMinutes(timeParts[1]);
                d.setSeconds(00);
                return d;
            } else {
                return null;
            }
        },

        /**
         * @author Khair Ali Naqvi
         * @summary this function will  return next  Date by   passing no of days
         */
        addDays: function (date, days) {
            days = parseInt(days);
            var newDate = null;
            if (date == null || date == undefined) {
                newDate = new Date(CURRENT_USER.bankingDate)
            } else {
                newDate = new Date(date)
            }
            newDate.setDate(newDate.getDate() + days);
            newDate = $.datepicker.formatDate("mm/dd/yy", newDate);
            return new Date(newDate);
        },

        /**
         * @author Khair Ali Naqvi
         */
        addYears: function (date, years) {
            var year = parseInt(years);
            var newDate = null;
            if (date == null || date == undefined) {
                newDate = new Date(CURRENT_USER.bankingDate)
            } else {
                newDate = new Date(date)
            }
            newDate.setFullYear(newDate.getFullYear() + year);
            newDate = $.datepicker.formatDate("mm/dd/yy", newDate);
            return new Date(newDate);
        },


        /**
         * @author Khair Ali Naqvi
         * @summary this function will  return previous Date by passing no of days
         */
        subtractDays: function (date, days) {
            days = parseInt(days);
            var newDate = null;
            if (date == null || date == undefined) {
                newDate = new Date(CURRENT_USER.bankingDate)
            } else {
                newDate = new Date(date)
            }
            newDate.setDate(newDate.getDate() - days);
            newDate = $.datepicker.formatDate("mm/dd/yy", newDate);
            return new Date(newDate);
        },

        /**
         * @author Khair Ali Naqvi
         */
        subtractYears: function (date, years) {
            var year = parseInt(years);
            var newDate = null;
            if (date == null || date == undefined) {
                newDate = new Date(CURRENT_USER.bankingDate)
            } else {
                newDate = new Date(date)
            }
            newDate.setFullYear(newDate.getFullYear() - year);
            newDate = $.datepicker.formatDate("mm/dd/yy", newDate);
            return new Date(newDate);
        },


        /**
         * @author Khair Ali Naqvi
         * @summary return name of day by passing the interger
         */
        getDayName: function (day) {
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            return weekday[day];
        },


        getXMLValue: function (xmlString, attribute) {
            var xmlAttrubute = $.parseXML(xmlString);
            var value = $(xmlAttrubute).find("control[property='" + attribute + "']").attr("value");
            return value;
        },
        sendAjaxRequest: function (url,method, paramData, target) {

            if (method != 'post' && method != 'get') {
                method = 'post';
            }
            if(target !== undefined && target !== null){
                App.blockUI({
                    target: target,
                    message : 'Processing at Server Please Wait...'
                });

            }
            return $.ajax({
                url: url,
                method: method,
                data: paramData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                complete : function(response){
                    if(target !== undefined && target !== null){
                        App.unblockUI(target);
                    }
                    if(response.responseJSON != undefined){
                        var dataHeader = response.responseJSON.dataHeader;
                        if (dataHeader != undefined && dataHeader.messageType == 'ERROR') {

                            services.notificationError("Application Error",dataHeader["message"]);
                        }
                    }

                },
                error : function(e){
                    services.notificationError("Application Error",e.responseText);
                    /*toastr.options = {
                        "closeButton": true,
                        "debug": false,
                        "positionClass": "toast-top-full-width",
                        "onclick": null,
                        "showDuration": "1000",
                        "hideDuration": "5000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };

                    toastr['error'](e.responseText, "Application Error");
*/


                }

            });

        },
        clone: function (obj) {
			/* if(obj == null || typeof(obj) != 'object')
			 return obj;

			 var temp = new obj.constructor();
			 for(var key in obj)
			 temp[key] = services.clone(obj[key]);

			 return temp;*/
            return obj;
        },
        BUTTON: {NEW: 0, SAVE: 1, DELETE: 2, REFRESH: 3},
        disableButton: function (buttonId, flag) {
            var toolBar = $('#fortuneMainTab').jqxTabs('getContentAt', $('#fortuneMainTab').jqxTabs('selectedItem')).find("div[id=pageToolbar]");
            $(toolBar.find("button:eq(" + buttonId + ")")).jqxButton({disabled: flag});
        },
        confirmationDialog: function (title_msg, output_msg, callbackFunction, entity) {

            var yesBtnDiv = "<button type='button' id='yesBtn' > Yes </button>";
            var noBtnDiv = "<button type='button' id='noBtn' > No </button>";
            var messageDiv = "<div>";
            messageDiv += "<div>" + output_msg + "</div>";
            messageDiv += "<div style=margin-left:315px>" + yesBtnDiv + noBtnDiv + "</div>";
            messageDiv += "</div>";

            $("#window").append("<div id='deleteDialog'><div></div></div>");

            $("#deleteDialog").append(messageDiv);

            $('#deleteDialog').jqxWindow({
                theme: JQXTHEME,
                height: 100,
                width: 500,
                autoOpen: true,
                title: "<b>" + title_msg + "</b>",
                isModal: true
            });
            $("#deleteDialog").find("#yesBtn").focus();
            $("#deleteDialog").find("*[type='button']").jqxButton({
                theme: JQXTHEME,
                width: '65px'
            });
            // @WaqarAshraf
            //If the user will press escape key after getting MessageDialog then this code will run
            $("#deleteDialog").find("*[type='button']").on('keydown', function (event) {
                if (event.keyCode == 27) {
                    $("#deleteDialog").jqxWindow('destroy');
                }
            });
            // if the user click on cross button on dialog then this event would be called.
            $("#deleteDialog").on('close', function (event) {
                $("#deleteDialog").jqxWindow("destroy");
            });

            $("#deleteDialog").find("*[type='button']").on('click', function (event) {
                if (event.target.innerText.trim().toLowerCase() == 'yes') {
                    $("#deleteDialog").jqxWindow('destroy');
                    callbackFunction(true, entity);


                } else {
                    $("#deleteDialog").jqxWindow('destroy');

                }

            });
        },
        errorMessage: function(title,message){
            if(title === undefined || title === null){
                title = "Error";
            }
            $(".page-message-area").html('<div style="border-left-color:#f0868e;border-left:5px solid" class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><strong>'+title+' : </strong>'+message+'</div>');
        },
        notificationError: function(title,message,detail){
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "5000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            toastr['error'](message, title);
            if(title === undefined || title === null){
                title = "Error!";
            }
        //    $(".page-message-area").html('<div style="border-left-color:#f0868e;border-left:5px solid" class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><strong>'+title+' </strong>'+message+'</div>');
        },
        toastError: function(title,message){
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "5000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            toastr['error'](message, title);

        },
        toastMessage : function(title,message){
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "5000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
             toastr['success'](message, title);

        },
        notificationMessage : function(title,message,skipToastr){
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-full-width",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "5000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            if(skipToastr === false) {
                toastr['success'](message, title);
            }
            if(title === undefined || title === null){
                title = "Success!";
            }

            if($(".page-message-area").is(":visible")){
                $(".page-message-area").html('<div style="border-left-color:#58d0da;border-left:5px solid" class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button><strong>'+title+' </strong>'+message+'</div>');
            }else{
                toastr['success'](message, title);
            }


        },
        messageDialog: function (message, errType, width, height) {
            var errorType, icon;
            if (errType == "I") {
                errorType = "Information";
                icon = "ui-icon ui-icon-info";
            }
            else {
                errorType = "Error";
                icon = "ui-icon ui-icon-alert Red";
            }
            var messageDialog = $('<div><br/><span class="' + icon + '" style="float:left; margin:10px 7px 50px 0;"></span><div style="margin-left: 23px;max-height:200px"><p>' + message + '</p></div></div>');
            messageDialog.dialog({
                autoOpen: true,
                resizable: true,
                closeOnEscape: false,
                minHeight: height,
                width: width,
                title: errorType,
                modal: true,
                show: 'fade',
                open: function () {
                    //Hide title close button
                    $('.ui-dialog-titlebar-close').hide();
                },
                buttons: [{
                    //OK button
                    text: "OK",
                    icons: {
                        primary: "ui-icon-circle-check"
                    },
                    click: function () {
                        $(this).dialog("close");
                    }
                }],
                close: function () {
                    $(this).dialog("destroy").remove();
                }
            });
            return false;

        },
        confirmDialog: function (message, okButtonText, cancelButtonText, title) {
            okButtonText = okButtonText || "Yes";
            cancelButtonText = cancelButtonText || "No";
            title = title || "Confirmation";

            var deferred = $.Deferred();
            $('<div><br/><span class="ui-icon ui-icon-alert" style="float:left; margin:10px 7px 50px 0;"></span><p>' + message + '</p></div>')
                .dialog({
                    autoOpen: true,
                    closeOnEscape: false,
                    width: 500,
                    modal: true,
                    show: 'fade',
                    title: title,
                    open: function () {
                        //Hide title close button
                        $('.ui-dialog-titlebar-close').hide();
                    },
                    buttons: [{
                        //OK button
                        text: okButtonText,
                        icons: {
                            primary: "ui-icon-circle-check"
                        },
                        click: function () {
                            deferred.resolve(true);
                            $(this).dialog("close");
                        }
                    }, {
                        //Cancel button
                        text: cancelButtonText,
                        icons: {
                            primary: "ui-icon-cancel"
                        },
                        click: function () {
                            deferred.resolve(false);
                            $(this).dialog("close");
                        }
                    }],
                    close: function () {
                        $(this).dialog("destroy").remove();
                    }
                });
            return deferred.promise();
        },
        populateAuditLogDataForGrid: function (gridHandler, item, pageMetaData, gridDatabk, i, auditData) {
            var currentItem = item;
            $.each(item, function (ind, value) {
                var oldIndex = ind;
                var dateFlag = false;
                var meta;
                var newIndex;
                if (ind != "uid") {
                    var n = ind.indexOf("Id");
                    if (n > 0) {
                        newIndex = ind.substring(0, n);
                    }
                    var isFKey = currentItem[newIndex + "Name"];
                    if (isFKey != undefined) {
                        meta = pageMetaData[newIndex];
                    } else {
                        meta = pageMetaData[ind];
                    }
                }
                if (meta != undefined && meta.auditable == 1) {
                    var obj = gridDatabk[i];
                    var dataObject = new Object();
                    var oldValue = null;
                    if (obj != undefined) {
                        oldValue = obj[oldIndex];
                    }
                    if ($.type(value) == 'date') {
                        if (oldValue != null) {
                            oldValue = new Date(oldValue).toDateString();
                            value = value.toDateString();
                        }
                        dateFlag = true;
                    }
                    if ($.type(oldValue) == "object") {
                        oldValue = JSON.stringify(oldValue);
                    }
                    if (gridHandler.jqxGrid('getcolumn', ind) != null && gridHandler.jqxGrid('getcolumn', ind).columntype == "datetimeinput" && value == null) {
                        if (oldValue != null) {
                            oldValue = new Date(oldValue).toString();
                        }
                    }
                    if ((oldValue == null && value != null) || oldValue != value) {
                        dataObject.appMetaDataId = meta.id;
                        if (dateFlag) {
                            if (oldValue != null) {
                                dataObject.oldValue = new Date(oldValue).toString();
                            }
                            if (value != null) {
                                dataObject.newValue = new Date(value).toString();
                            }
                        } else {
                            dataObject.oldValue = oldValue;
                            dataObject.newValue = value;
                        }
                        dataObject.operationDate = new Date();
                        dataObject.bankingDate = CURRENT_USER.bankingDate;
                        dataObject.tableFieldValue = item.id;
                        dataObject.tableKeyCol = meta.keyField;
                        dataObject.userInfoId = CURRENT_USER.userId;
                        dataObject.sessionNo = CURRENT_USER.userSessionId;

                        if (currentItem.recordStatus == "UPDATED") {
                            dataObject.changeType = 'U';
                        } else {
                            dataObject.changeType = 'I';
                        }
                        auditData.push(dataObject);
                    }
                }
            });
        },
        populateAuditLogData: function (data, dataBackup, pageMetaData) {
            var auditData = new Array();
            $.each(data, function (index, value) {
                if ($.type(value) == "array") {
                    $.each(value, function (index1, value1) {
                        $.each(value1, function (index2, value2) {
                            var oldValue = null;
                            if (!jQuery.isEmptyObject(dataBackup)) {
                                var list = dataBackup[index];
                                var object = list[index1];
                                if (object != undefined) {
                                    oldValue = object[index2];
                                }
                            }
                            services.fillAuditDataObject(value1, index2, value2, oldValue, pageMetaData, auditData);
                        });

                    });
                } else if ($.type(value) == "object") {
                    $.each(value, function (index1, value1) {
                        var oldValue = null;
                        if (!jQuery.isEmptyObject(dataBackup)) {
                            var object = dataBackup[index];
                            oldValue = object[index1];
                        }
                        services.fillAuditDataObject(value, index1, value1, oldValue, pageMetaData, auditData);
                    });
                } else {
                    var oldValue = null;
                    if (!jQuery.isEmptyObject(dataBackup)) {
                        oldValue = dataBackup[index];
                    }
                    services.fillAuditDataObject(data, index, value, oldValue, pageMetaData, auditData);
                }
            });
            return auditData;
        },
        fillAuditDataObject: function (element, ind, val, oldValue, pageMetaData, auditData) {
            var newIndex;
            var metaList = new Array();
            if ((oldValue == null || oldValue != val) && (val != null && val != "" && val != undefined)) {
                var n = ind.indexOf("Id");
                if (n > 0) {
                    newIndex = ind.substring(0, n);
                }
                var isFKey = element[newIndex + "Name"];
                if (isFKey != undefined) {
                    //meta = pageMetaData[newIndex];
                    metaList = services.getAttributeClass(newIndex, pageMetaData);
                } else {
                    //meta = pageMetaData[ind];
                    metaList = services.getAttributeClass(ind, pageMetaData);
                    if (metaList.length <= 0 && newIndex != undefined) {
                        //meta = pageMetaData[newIndex];
                        metaList = services.getAttributeClass(newIndex, pageMetaData);
                    }
                }
                for (var i = 0; i < metaList.length; i++) {
                    var dataObject = new Object();
                    var isFound = services.findAuditAbleData(metaList[i].columnName, metaList[i].keyField, auditData);
                    if (metaList[i] != undefined && metaList[i].auditable == 1 && !isFound) {
                        var dateFlag = false;
                        if (oldValue == undefined)
                            oldValue = null;
                        if ($.type(val) == 'date') {
                            if (oldValue != null) {
                                oldValue = new Date(oldValue).toDateString();
                                val = val.toDateString();
                                dateFlag = true;
                            }
                        }
                        dataObject.appMetaDataId = metaList[i].id;
                        if (dateFlag) {
                            dataObject.oldValue = new Date(oldValue);
                            dataObject.newValue = new Date(val);
                        } else {
                            dataObject.oldValue = oldValue;
                            dataObject.newValue = val;
                        }

                        dataObject.operationDate = new Date();
                        dataObject.bankingDate = CURRENT_USER.bankingDate;
						/* primary key of table */
                        dataObject.tableFieldValue = element.id
                        dataObject.tableKeyCol = metaList[i].keyField;
                        dataObject.userInfoId = CURRENT_USER.userId;
                        dataObject.sessionNo = CURRENT_USER.userSessionId;
                        if (oldValue == null)
                            dataObject.changeType = 'I';
                        else
                            dataObject.changeType = 'U';
                        auditData.push(dataObject);
                    }
                }
            }

        },
        getAttributeClass: function (attribute, pageMetaData) {
            var array = new Array();
            var k = 0;
            $.each(pageMetaData, function (index, value) {
                var res = index.split(":");
                if (res[1] == attribute) {
                    array.push(value);
                }
            });
            return array;
        },
        findAuditAbleData: function (colName, keyField, auditData) {
            for (var j = 0; j < auditData.length; j++) {
                if (auditData[j].tableFieldValue == colName && auditData[j].tableKeyCol == keyField)
                    return true;
            }
            return false;
        },
		/*getCurrentTab : function(){
		 var mainTabObject = scope.$parent.mainTabSettings.jqxTabs('getContentAt',scope.$parent.mainTabSettings.jqxTabs('selectedItem'));
		 return mainTabObject;
		 },*/
        getPageMeta: function () {
            var mainTabObject = $("#fortuneMainTab").jqxTabs('getContentAt', $("#fortuneMainTab").jqxTabs('selectedItem'));
            var meta = null;
            if (mainTabObject.find("#pageMetaData") != undefined && mainTabObject.find("#pageMetaData").length > 0) {
                var mdata = jQuery.parseJSON(mainTabObject.find("#pageMetaData").val());
                meta = {};
                $.each(mdata, function (index, value) {
                    var ind = index.split(":");
                    meta[ind[1]] = value;
                    if (value.required == 1) {
                        value.required = true;
                    } else {
                        value.required = false;
                    }
                });
            }
            return meta;
        },
        validateForm: function (form, title) { // function will check the form is in valid state or not
            var currentTab = $("#fortuneMainTab").jqxTabs('getContentAt', $("#fortuneMainTab").jqxTabs('selectedItem'));
            $.each(form, function (index, element) {
                if (index.indexOf("$") == -1) {
                    if (element.$error.required != undefined) {
                        $($(currentTab).find("#" + element.$name)).addClass("markElement");
                        $($(currentTab).find("#" + element.$name)).on('change', function () {
                            $(this).removeClass("markElement");
                        });
                    }

                }
            });
            var valid = false;
            if (form.$valid) {
                valid = true;
            } else {
                services.MessageDialog(title, "Required Fields are missing.", 100, 500, 'error');
            }
            return valid;
        },
        resetValidation: function (form) { // function will check the form is in valid state or not
            var currentTab = $("#fortuneMainTab").jqxTabs('getContentAt', $("#fortuneMainTab").jqxTabs('selectedItem'));
            $.each(form, function (index, element) {
                if (index.indexOf("$") == -1) {
                    $($(currentTab).find("#" + element.$name)).removeClass("markElement");
                }
            });

        },

        /**
         * @author Khair Ali Naqvi
         * @summary  this function will validate the formate of CNIC,NTN,Passport etc
         */

        validateFormate: function (type, value) {
            var reg = /^/;
            if (type.toLocaleLowerCase() == 'ntn') {
                reg = /^[0-9]{7}(-[0-9]{1})?$/;
            }
            return reg.test(value);
        }


    };
    return services;
}();