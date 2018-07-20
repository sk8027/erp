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
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="width=device-width, initial-scale=1" name="viewport" />
	<meta content="ERP@Cloud for " name="description" />
	<meta content="" name="author" />
	<!-- BEGIN GLOBAL MANDATORY STYLES -->


	<link href="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />

	<!-- END THEME GLOBAL STYLES -->
	<!-- BEGIN PAGE LEVEL STYLES -->
	<link href="${pageContext.servletContext.contextPath}/resources/assets/pages/css/login-5.min.css" rel="stylesheet" type="text/css" />
	<link href="${pageContext.servletContext.contextPath}/resources/assets/pages/css/login-text.css" rel="stylesheet" type="text/css" />
	<!-- END PAGE LEVEL STYLES -->
	<!-- BEGIN THEME LAYOUT STYLES -->
	<!-- END THEME LAYOUT STYLES -->


</head>
<!-- END HEAD -->

<body class=" login" id="loginPage">
<!-- BEGIN : LOGIN PAGE 5-1 -->
<div class="user-login-5">
	<div class="row bs-reset">
		<div class="col-md-6 bs-reset mt-login-5-bsfix">
			<div class="login-bg" >
				<div id="copy" class="panel info">




					<div class="content ">

						<div class="header ">
							<div class="title">

							</div>


						</div>

						<div class="body  ">


							<div id="welcome" class="row">
								<h1>
									<span class="logo" style="display:none" aria-label="TIBCO Jaspersoft"></span>
									<span class="text" style="display:block">Welcome to ERP@Cloud (Campus Management System) </span>


								</h1>
							</div>

							<div id="rotating" class="row">
								<div class="secondary">
									<h2 class="palette01">What's Inside</h2>
									<ul class="list decorated" role="application" js-itemplural="tutorials" tabindex="0">
										<li><a tabindex="-1" class="launcher" href="#"> Campus Management Solution</a></li>
										<li><a tabindex="-1" class="launcher" href="#">Integrated with Active Directory Credentials</a></li>
										<li><a tabindex="-1" class="launcher" href="#">Integrated Reporting and MIS Solution</a></li>
										<li><a tabindex="-1" class="launcher" href="#">In built Learning Management System</a></li>
										<li><a tabindex="-1" class="launcher" href="#">Dashboards</a></li>
									</ul>
								</div>
								<div class="primary">
									<h2 class="palette01">ERP@Cloud Advance Features</h2>
									<ul class="list decorated" role="application" js-itemplural="new features" tabindex="0">
										<li><span class="sellPoint">Financial</span> Powerful Financial Module which take care need of any financial managment of an Educational Institute</li>
										<li><span class="sellPoint">Human Resource </span> Comprehensive Human resource Managment System which fulfil the need of HR & Administration</li>
										<li><span class="sellPoint">Outcome Base Learning</span>
											Using learning outcome statements to make explicit what the student is expected to be able to know, understand or do.
											Providing learning activities which will help the student to reach these outcomes.
											Assessing the extent to which the student meets these outcomes through the use of explicit assessment criteria
										</li>
									</ul>
								</div>
							</div>


						</div>

					</div>
				</div>
				<img class="login-logo" style="display: none" src="${pageContext.servletContext.contextPath}/resources/assets/pages/img/login/logo.png" /> </div>
		</div>

		<div class="col-md-6 login-container bs-reset mt-login-5-bsfix" id="loginContent">

			<div class=" login-content" style="margin-top: 0px;">
				<div class="col-sm-12" style="margin-top: 0px;">
					<img class="mg-circle img-responsive" src="${pageContext.servletContext.contextPath}/resources/assets/global/img/divine.png"
						 style="    margin-left: auto;margin-right: auto ;margin-top: 50px"/>
				</div>

				<div class="col-sm-12 login-content" style="margin-top: 80px;">
					<c:if test="${param.accessDenied != null}">
						<div class="alert alert-danger display-show" id="serverError">
							<button class="close" data-close="alert"></button>
							<span><span><spring:message code="application.forbidden" javaScriptEscape="true"/></span></span>
						</div>
					</c:if>
					<c:if test="${param.error != null}">
						<div class="alert alert-danger display-show" id="serverError">
							<button class="close" data-close="alert"></button>
							<span><span><spring:message code="application.login.fail" javaScriptEscape="true"/></span></span>
						</div>
					</c:if>
					<c:if test="${param.logout != null}">
					<div class="alert alert-info display-show" >
						<button class="close" data-close="alert"></button>
						<span><span><spring:message code="application.logout.success" javaScriptEscape="true"/></span></span>

					</div>
					</c:if>
						<h1 style="padding-top:21px;text-align:center">ERP@Cloud Login</h1>

					<p> Provide User name and Password which has been shared with you by your organization to Signin <strong>ERP@Cloud ERP System </strong></p>
					<c:url var="loginUrl" value="/login" />
					<form action="${loginUrl}" method="post" class="login-form">
						<%--<form action="javascript:;" class="login-form" method="post" id="loginForm">--%>

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
							<p>Copyright &copy; Syntaxmatic Technologies</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<![endif]-->
<!-- BEGIN CORE PLUGINS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery.min.js" type="text/javascript"></script>


<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="${pageContext.servletContext.contextPath}/resources/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->

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