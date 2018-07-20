var CampusFilterService = (function () {
    function CampusFilterService() {
     }
     CampusFilterService.prototype.initFilter = function () {
        var framework = new Framework();
        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_campuses",'get',null,$(".form-body")).then(function( data) {
                 framework.GenerateDropDownList($("#campusIdFilter"),data.data);
            framework.GenerateDropDownList($("#schoolIdFilter"),[]);
            framework.GenerateDropDownList($("#departmentIdFilter"),[]);
                $('#campusIdFilter').on('change', function (event) {
                    $("#schoolIdFilter").jqxDropDownList('clearSelection');
                    $("#departmentIdFilter").jqxDropDownList('clearSelection');
                    if($("#programIdFilter").length >0){
                        $("#programIdFilter").jqxDropDownList('clearSelection');
                    }

                });
                $('#schoolIdFilter').on('change', function (event) {
                    $("#departmentIdFilter").jqxDropDownList('clearSelection');
                    if($("#programIdFilter").length >0){
                        $("#programIdFilter").jqxDropDownList('clearSelection');
                    }
                });
                $('#departmentIdFilter').on('change', function (event) {

                    if($("#programIdFilter").length >0){
                        $("#programIdFilter").jqxDropDownList('clearSelection');
                    }
                });
                $('#schoolIdFilter').on('open', function (event) {
                    if($("#campusIdFilter").val() > 0) {

                        $("#schoolIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_schools/" + $("#campusIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {


                            $.each(data.data, function (item, school) {
                                $("#schoolIdFilter").jqxDropDownList('addItem', {
                                    label: school.label,
                                    value: school.value
                                });
                            });
                        })
                    }else{
                        $("#schoolIdFilter").jqxDropDownList('clear');
                    }
                });
                $('#departmentIdFilter').on('open', function (event) {

                    if($("#schoolIdFilter").val() > 0) {
                        $("#departmentIdFilter").jqxDropDownList('clear');

                        CommonService.sendAjaxRequest(CONTEXT_PATH + "/app/CommonController/get_departments/" + $("#schoolIdFilter").val(), 'get', null, $("#studentTable")).then(function (data) {
                            $.each(data.data, function (item, department) {
                                $("#departmentIdFilter").jqxDropDownList('addItem', {
                                    label: department.label,
                                    value: department.value
                                });
                            });
                        })
                    }else{
                        $("#departmentIdFilter").jqxDropDownList('clear');

                    }
                });




        });


    };

    return CampusFilterService;
}());
