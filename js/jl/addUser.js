/**
 * Created by Administrator on 2015/9/26 0026.
 */
$(function(){
    checkNull();
    checkIsSame();
    getAllDepartment();//下拉框获取所有部门内容
    getAllposition();//获取所有职位信息
    firstRegister();//第一次注册事件
    secondRegister();//第二次注册事件
});

//init
//下拉框获取所有部门内容
function getAllDepartment(){
    $.ajax({
        url:"/OA/department/getDepartmentname",
        type:"POST",
        contentType:"application/json",
        success:function(data) {
            if (data.status == 0) {
                var Data = eval(data.body);
                var strHTML = "";
                $.each(Data, function (index, el) {
                    strHTML += "<option value="+el.name+">" + el.name + "</<option>";
                })
                $("#deptname").html(strHTML);
            }
        }
    })
}
//获取所有职位信息
function getAllposition(){
    $.ajax({
        url:"/OA/position/getpositionname",
        type:"POST",
        contentType:"application/json",
        success:function(data) {
            if (data.status == 0) {
                var Data = eval(data.body);
                var strHTML = "";
                $.each(Data, function (index, el) {
                    strHTML += "<option value="+el.name+">" + el.name + "</<option>";
                })
                $("#positionname").html(strHTML);
            }
        }
    })
}
//第一次激活状态
$("#commit-li").bind("firstActive",function(){
    $("#commit-li").addClass("status-active");
    $("#add-mes-li").removeClass("status-active");
    $("#first-commit-user").show();
    $("#second-add-mes").hide();
});
//第二次激活状态
$("#add-mes-li").bind("secondActive",function(){
    $("#commit-li").removeClass("status-active");
    $("#add-mes-li").addClass("status-active");
    $("#first-commit-user").hide();
    $("#second-add-mes").show();
});


//检查两次输入密码是否相同
function checkIsSame() {
    $("#first-commit-user #confirmPassword").blur(function () {
        if ($(this).val() != "") {
            var val1 = $("#first-commit-user #inputPassword").val();
            var val2 = $(this).val();
            if (val1 != val2) {
                $(".confirmPassword-status").html("*两次输入密码不一致");
            }else{
                $(".confirmPassword-status").html("");
            }
        }
    });
}

//输入框为空的检查函数
function checkNull(){
    $("#first-commit-user form input,#second-add-mes form input[type!='file']").blur(function(){
        var value = $(this).val();
        if(isNull(value)){
            $(this).parent().children("p").html("*输入不能为空！");
        }else{
            $(this).parent().children("p").html("");
        }
    })
}

//第一次注册按钮点击事件
function firstRegister(){
    $("#first-submit").click(function(e){
        e.preventDefault();//阻止默认事件
        e.stopPropagation();//组织冒泡

        //自动触发校验事件
        $("#first-commit-user #confirmPassword").trigger("blur")
        $("#first-commit-user form input").trigger("blur");

        var tips = "";
        $("#first-commit-user .status").each(function(){
            tips += $(this).html();
        });
        console.log(tips)
        var user = {
            charactar:$("#user-type").val(),
            name: $.trim($("#username").val()),
            password:$("#inputPassword").val()
        }
        if(!tips){
            $.ajax({
                url: "/user/regist",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(user),
                success: function (data) {
                    if (data.status == 0) {
                        alert("注册成功");
                        sessionStorage.userId = data.body.id;   //本地储存本次返回的userId
                        $("#add-mes-li").trigger("secondActive");     //触发页面跳转事件
                    }
                }
            })
        }else{
            alert("请检查输入格式是否正确！")
        }
        console.log(user);
    });
}

//第二次注册按钮点击事件
function secondRegister(){
    $("#second-submit").click(function(e){
        e.preventDefault();//阻止默认事件
        e.stopPropagation();//组织冒泡

        //自动触发校验事件
        $("#second-add-mes form input").trigger("blur");

        $("#second-add-mes form input[type='file']").bind("checkNull",function(){
            var value = $(this).val();
            if(isNull(value)){
                $(this).parent().children("p").html("*输入不能为空！");
            }else{
                $(this).parent().children("p").html("");
            }
        });
        $("#second-add-mes form input[type='file']").trigger("checkNull");
        //检验格式并发送请求
        var tips = "";
        $("#second-add-mes .status").each(function(){
            tips += $(this).html();
        });
        console.log(tips)
        var json = {
            charactar:$("#user-type").val(),
            name: $.trim($("#username").val()),
            password:$("#inputPassword").val()
        }
        if(!tips){
            $.ajax({
                url: "/OA/employee/addemployee",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(json),
                success: function (data) {
                    if (data.status == 0) {

                    }
                }
            })
        }else{
            alert("请检查输入格式是否正确！")
        }
    });

}