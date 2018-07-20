<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>

<!--
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7
Version: 4.7.5
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
Renew Support: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->
<!-- BEGIN HEAD -->

<head>
	<script  type="text/javascript">
        const CONTEXT_PATH = "${pageContext.servletContext.contextPath}";
	</script>
	<meta charset="utf-8" />
	<title>ERP@Cloud | User Login</title>

	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

</head>
<!-- END HEAD -->

<body >
<!-- BEGIN : LOGIN PAGE 5-1 -->
<div class="container"  id="exam">
	<div class="row">
 		<label class="col-md-3 control-label">Name</label>
		<div class="col-md-3">
 			<input type="text" class="form-control" id="studentName" style="width:100%">
 		</div>
		<label class="col-md-3 control-label">Questions</label>
		<div class="col-md-3">
			<input type="text" class="form-control" id="totalQues" maxlength="2" style="width:100%">
		</div>

	</div>
	<div class="row">
		<div class="col-sm-12">
			<button id="processBtn" class="btn-info btn-lg">Start</button>
		</div>
	</div>
</div>
<div class="container" style="display: none;" id="ques">
<div class="row">
	<div class="col-sm-12">
		<button id="finalBtn" class="btn-info btn-lg">Result</button>
	</div>
</div>
	<div id="quiz" class="row">
	</div>
</div>

<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery.min.js" type="text/javascript"></script>


<script>

    $(document).ready(function()
    {
        $("#processBtn").on("click",function(){
            var randomMax = 10;
            if($("#studentName").val()=="adan"){
                randomMax = 100000;
			}
			$("#ques").show();
			$("#exam").hide();

            var row = '';
            var count =1;
            var html = '';
			var totalQues = $("#totalQues").val();
			if(isNaN(totalQues)){
			    totalQues = 10;
			}
            for(j=0;j<totalQues;j++){

                $("#quiz").append('\t\t<div class="col-md-2" id="c'+j+'" style="border:1px solid #c2cad8;padding:0px;margin:20px;background:yellow">\n' +
                    '\n Question # ' + count++ +
                    '\t\t\t\t<input type="text" class="form-control" value="'+Math.floor(Math.random() * randomMax)+'" readonly style="text-align: right">\n' +
                    '\t\t\t\t<input type="text" class="form-control" value="'+Math.floor(Math.random() * randomMax)+'" readonly style="text-align: right">\n' +
                    '\t\t\t <input id="c'+j+'answer" type="text" class="form-control" style="text-align: right;" placeholder="Answer">\n' +
                    '\n' +
                    '\t\t</div>\n');

            }
        })
		$("#finalBtn").on("click",function(){
            var totalQues = $("#totalQues").val();
                 for (j = 0; j < totalQues ; j++) {
                    total = 0;
                    $("#c"+j+" input[readonly]").each(function(){
                        total += parseInt($(this).val());
                    });
                    if($("#c"+j+"answer").val() == total){
                        $("#c"+j+"answer").css("background","#98d898");
 					}else{
                        if($("#c"+j+"answer").val().length > 0) {
                            $("#c" + j + "answer").css("background", "red");
                        }
					}
                    //$("#r"+i+j+"answer").val(total);
                }


		});
    });
</script>
</body>

</html>