<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
	<title>Campus@Cloud | User Login</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta content="Campus@Cloud for " name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
	<!-- END GLOBAL MANDATORY STYLES -->
	<!-- BEGIN PAGE LEVEL PLUGINS -->
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
	<!-- END PAGE LEVEL PLUGINS -->
	<!-- BEGIN THEME GLOBAL STYLES -->
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/css/components-rounded.min.css" rel="stylesheet" id="style_components" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
	<!-- END THEME GLOBAL STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link href="${pageContext.servletContext.contextPath}/resources/assets/pages/css/login-5.min.css" rel="stylesheet" type="text/css" />
	<!-- END PAGE LEVEL STYLES -->
	<!-- BEGIN THEME LAYOUT STYLES -->
	<!-- END THEME LAYOUT STYLES -->

<!-- END HEAD -->

<body class=" login">
<!-- BEGIN : LOGIN PAGE 5-1 -->
<div class="user-login-5">
	<div class="row bs-reset">
		<div class="col-md-6 bs-reset mt-login-5-bsfix">
			<div class="login-bg" style="background-image:url('${pageContext.servletContext.contextPath}/resources/assets/pages/img/login/bg1.jpg')">
				<img class="login-logo" style="display: none" src="${pageContext.servletContext.contextPath}/resources/assets/pages/img/login/logo.png" /> </div>
		</div>

		<div class="col-md-6 login-container bs-reset mt-login-5-bsfix" id="loginContent">

			<div class=" login-content" style="margin-top: 0px;">
				<div class="col-sm-12" style="margin-top: 0px;">
					<img class="mg-circle img-responsive" src="${pageContext.servletContext.contextPath}/resources/assets/global/img/divine.png"
						 style="    width: 300px;height: 200px;margin-left: auto;margin-right: auto "/>
				</div>
					<div class="col-sm-12 login-content" style="margin-top: 80px;">
				<h1 style="padding-top:21px;text-align:center">Campus@Cloud Login</h1>

				<p> Provide User name and Password which has been shared with you by your organization to Signin <strong>Campus@Cloud ERP System </strong></p>
						<c:url var="loginUrl" value="/login" />
						<form action="${loginUrl}" method="post" class="login-form">
				<%--<form action="javascript:;" class="login-form" method="post" id="loginForm">--%>

					<div class="alert alert-danger display-hide" id="serverError">
						<button class="close" data-close="alert"></button>
						<span><spring:message code="application.login.fail" javaScriptEscape="true"/></span>
					</div>
					<div class="row">
						<div class="col-xs-6">
							<input class="form-control form-control-solid placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Username" id="username" name="username" required/> </div>
						<div class="col-xs-6">
							<input class="form-control form-control-solid placeholder-no-fix form-group" type="password" autocomplete="off" placeholder="Password" id="password" name="password" required/> </div>
					</div>
					<input type="hidden" name="${_csrf.parameterName}"  value="${_csrf.token}" />
					<div class="row">
						<div class="col-sm-4">
							<div class="rem-password">
								<label class="rememberme mt-checkbox mt-checkbox-outline">
									<input type="checkbox" name="remember" value="1" /> Remember me
									<span></span>
								</label>
							</div>
						</div>
						<div class="col-sm-8 text-right">
							<div class="forgot-password">
								<a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>
							</div>
							<button class="btn green" type="submit">Sign In</button>
						</div>
					</div>
				</form>
				<!-- BEGIN FORGOT PASSWORD FORM -->
				<form class="forget-form" action="javascript:;" method="post">
					<h3 class="font-green">Forgot Password ?</h3>
					<p> Enter your e-mail address below to reset your password. </p>
					<div class="form-group">
						<input class="form-control placeholder-no-fix form-group" type="text" autocomplete="off" placeholder="Email" name="email" /> </div>
					<div class="form-actions">
						<button type="button" id="back-btn" class="btn green btn-outline">Back</button>
						<button type="submit" class="btn btn-success uppercase pull-right">Submit</button>
					</div>
				</form>
				<!-- END FORGOT PASSWORD FORM -->
			</div>
			</div>
			<div class="login-footer">
				<div class="row bs-reset">
					<div class="col-xs-5 bs-reset">
						<ul class="login-social">
							<li>
								<a href="javascript:;">
									<i class="icon-social-facebook"></i>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<i class="icon-social-twitter"></i>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<i class="icon-social-dribbble"></i>
								</a>
							</li>
						</ul>
					</div>
					<div class="col-xs-7 bs-reset">
						<div class="login-copyright text-right">
							<p>Copyright &copy; Divine IT Consulting 2017</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- END : LOGIN PAGE 5-1 -->
<!--[if lt IE 9]>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/respond.min.js"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/excanvas.min.js"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/ie8.fix.min.js"></script>
<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="${pageContext.servletContext.contextPath}/screens/components/app.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/pages/scripts/login-5.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<!-- END THEME LAYOUT SCRIPTS -->
<script>

    $(document).ready(function()
    {
		$("#username").focus();
        $('#clickmewow').click(function()
        {
            $('#radio1003').attr('checked', 'checked');
        });
    })
</script>
</body>

</html>