"use strict";require(["config"],function(){require(["jquery","footer","header","jquerycookie"],function(t,n,a){new Promise(function(e,o){t("header").load("/html/component/header.html",function(){a.head(),e()}),t("footer").load("/html/component/footer.html",function(){n.ft()})}).then(function(){t("form").submit(function(e){var o={username:t("#name").val(),password:t("#pwd").val()};t.ajax({method:"post",data:o,dataType:"json",url:"http://localhost/FILAserver/api/login.php",success:function(e){console.log(e),1===e.code?(t.cookie("username",o.username,{path:"/"}),alert("登录成功！！"),location.href="http://localhost:3001/index.html"):alert("用户名或者密码错误")}}),e.preventDefault()})})})});