<%-- 
    Document   : add
    Created on : Mar 27, 2019, 3:26:01 AM
    Author     : admin
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>To do List</title>
        <c:set var="contextPath" value="${pageContext.request.contextPath}"/>
        <link rel="stylesheet" href="${contextPath}/css/bootstrap.min.css"/>
        
        <script src="${contextPath}/script/app.js"></script>
        <script src="${contextPath}/script/controller/add.controller.js"></script>
    </head>
    <body onload="new AddController()">
        <div class="container">
            <h1>Add new</h1>
            <button class="btn btn-primary" id="btnBack">Back</button>
            <div id="divForm"></div>
        </div>
    </body>
</html>
