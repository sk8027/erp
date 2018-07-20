//var DateService = function () {
    var DateService =  {
        dateInput: function (colName) {
            $(colName).inputmask("d/m/y", {"placeholder": "00/00/0000", "clearIncomplete": true});
        },
        date: function (colName, option, yearRange) {
            //Normal Date
            if (option == "bind" || option == "icon" || option == undefined) {
                //Range
                if (yearRange == undefined) { yearRange = "-90:+10"; }
                //Icon
                var showOn = "focus", buttonText = "", buttonImage = "";
                if (option == "icon") {
                    showOn = "button";
                    buttonImage = "../../Content/Images/calendar.gif";
                    buttonText = "Select date";
                }
                $(colName).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    yearRange: yearRange,
                    dateFormat: 'dd/mm/yy',
                    showOn: showOn,
                    buttonImage: buttonImage,
                    buttonImageOnly: true,
                    buttonText: buttonText
                }).inputmask("d/m/y", { "placeholder": "00/00/0000", "clearIncomplete": true });
            }
            //Month
            else if (option == "month") {
                $(colName).datepicker({
                    changeMonth: true,
                    showButtonPanel: true,
                    dateFormat: 'm'
                }).focus(function () {
                    $(".ui-datepicker-year").hide();
                    $('.ui-datepicker-calendar').detach();
                    var thisCalendar = $(this);
                    $('.ui-datepicker-close').click(function () {
                        thisCalendar.datepicker('setDate', new Date("", $("#ui-datepicker-div .ui-datepicker-month :selected").val(), 1));
                    });
                });
            }
            //Year
            else if (option == "year") {
                if (yearRange == undefined) {
                    yearRange = "2000:+0";
                }
                $(colName).datepicker({
                    changeYear: true,
                    showButtonPanel: true,
                    dateFormat: 'yy',
                    yearRange: yearRange
                }).focus(function () {
                    $(".ui-datepicker-month").hide();
                    $('.ui-datepicker-calendar').detach();
                    var thisCalendar = $(this);
                    $('.ui-datepicker-close').click(function () {
                        thisCalendar.datepicker('setDate', new Date($("#ui-datepicker-div .ui-datepicker-year :selected").val(), 1));
                    });
                });
            }
            //Unbind/Remove
            else {
                //Remove still present related DOM objects
                //Remove datepicker object and detach events
                $(colName).removeClass('hasDatepicker').removeData('datepicker').unbind();
            }
        },
        parseDate: function (date) {
            if($.isNumeric(date)) {
                return $.datepicker.formatDate(DATE_FORMAT, new Date(date));
            }else {
                date = date.split('/');
                return new Date(date[2] + '/' + date[1] + '/' + date[0]);
            }
        },
        formatDate: function (date) {
            if($.isNumeric(date)) {
                return $.datepicker.formatDate(DATE_FORMAT, new Date(date));
            }else {
                date = new Date(date);
                function pad(s) {
                    return (s < 10) ? '0' + s : s;
                }

                return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/');
            }
        },
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        daysAfter: function (fromDate, toDate) {
            return (DateService.parseDate(toDate) - DateService.parseDate(fromDate)) / (1000 * 60 * 60 * 24);
        },
        relativeDate: function (option, date, addDays) {
            //Parse Date
            date = DateService.parseDate(date)
            switch (option) {
                //Daily
                case "D":
                    date.setDate(date.getDate() + 1);
                    break;
                //Weekly
                case "W":
                    date.setDate(date.getDate() + 6);
                    break;
                //Fortnightly
                case "F":
                    date.setDate(date.getDate() + 13);
                    break;
                //Monthly
                case "M":
                    date.setMonth(date.getMonth() + 1);
                    break;
                //Quarterly
                case "Q":
                    date.setMonth(date.getMonth() + 3);
                    break;
                //Half Yearly
                case "H":
                    date.setMonth(date.getMonth() + 6);
                    break;
                //Yearly
                case "Y":
                    date.setYear(date.getFullYear() + 1);
                    break;
                //Add Days
                case "A":
                    date.setDate(date.getDate() + parseInt(addDays));
                    break;
                default:
                    date = "";
                    break;
            }
            date = pad(date.getDate()) + '/' + pad(date.getMonth() + 1) + '/' + date.getFullYear();
            function pad(n) {
                return n < 10 ? "0" + n : n;
            }

            return date;
        },
        CompareDates: function (date_1, op, date_2) {
            var date1 = DateService.parseDate(date_1);
            var date2 = DateService.parseDate(date_2);

            //Date1 is smaller than Date2
            if (op == "<") {
                if (date1 < date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //Date1 is greater than Date2
            else if (op == ">") {
                if (date1 > date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //Date1 is exactly equal to Date2
            else if (op == "=") {
                if (+date1 == +date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //Date1 is not equal to Date2
            else if (op == "!=") {
                if (+date1 != +date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //Date1 is greater than equal to Date2
            else if (op == ">=") {
                if (date1 >= date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            //Date1 is less than equal to Date2
            else if (op == "<=") {
                if (date1 <= date2) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        StartEndDateValidation : function(target){

            if (target.attr("id").indexOf("startDate") >=0 ) {
                if(Date.parse(DateService.parseDate(target.val())) < CURRENT_USER.bankingDate){
                    target.focus();
                    target.datepicker("option", "defaultDate", DateService.formatDate(CURRENT_USER.bankingDate));

                    target.datepicker("option", "disabled", false);
                    CommonService.messageDialog('Start Date can not less than Banking Date', "E", 500, 100);
                }else {
                    var endDate = "#" + target.attr("id").replace("startDate", "endDate");
                    if (target.val() == "" || target.val() == null) {
                        $(endDate).datepicker("option", "disabled", true);
                    } else {
                        $(endDate).datepicker("option", "disabled", false);
                        $(endDate).datepicker("option", "minDate", target.val());
                        $(endDate).datepicker("option", "defaultDate", target.val());
                    }
                }
            }else if (target.attr("id").indexOf("endDate") >=0 ) {
                var endDateVal = Date.parse(DateService.parseDate(target.val()));
                var startDate = "#" + target.attr("id").replace("endDate", "startDate");
                startDateVal = Date.parse(DateService.parseDate(startDate));
                if (endDateVal< CURRENT_USER.bankingDate || endDateVal < startDateVal) {
                    target.focus();
                    target.datepicker("option", "defaultDate", DateService.formatDate(CURRENT_USER.bankingDate));

                    target.datepicker("option", "disabled", false);
                    CommonService.messageDialog('End Date can not less than Banking Date or Start Date', "E", 500, 100);
                }
            }
        }


    };
   // return services;
//}();