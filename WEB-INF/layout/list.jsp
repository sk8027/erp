<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c' %>
<html>
  <head>
    <title>$Title$</title>
      <script
              src="https://code.jquery.com/jquery-1.12.4.min.js"
              integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
              crossorigin="anonymous"></script>
  </head>
  <body>
 <h1> Welcome to Application <sec:authentication property="name"/>!</h1>
  <c:forEach items="${MODEL}" var="apd">
    ${apd.roleCode}-${apd.narrative}<BR>
  </c:forEach>
  </body>
</html>
