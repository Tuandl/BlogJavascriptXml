<%-- 
    Document   : index
    Created on : Mar 26, 2019, 11:46:11 PM
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
        <script src="${contextPath}/script/controller/index.controller.js"></script>
    </head>
    <body onload="new IndexController()">
        <div class="container">
            <h1>To Do List</h1>
            <button class="btn btn-primary" id="btnAdd">Add</button>
            <div id="divToDoListTable"></div>
        </div>
    </body>
</html>
