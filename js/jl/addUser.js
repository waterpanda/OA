/**
 * Created by Administrator on 2015/9/26 0026.
 */
$(function(){
    checkNull();
    checkIsSame();
    firstRegister();//第一次注册事件
    secondRegister();
});

//init

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
    $("#first-commit-user form input").blur(function(){
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
            //$.ajax({
            //    url: "/user/regist",
            //    type: "POST",
            //    contentType: "application/json",
            //    data: JSON.stringify(user),
            //    success: function (data) {
            //        if (data.status == 0) {
            //            alert("注册成功");
            //            sessionStorage.userId = data.body.id;   //本地储存本次返回的userId
            //            $("#add-mes-li").trigger("secondActive");     //触发页面跳转事件

            //        }
            //    }
            //})
            $("#add-mes-li").trigger("secondActive");     //测试触发页面跳转事件
        }else{
            alert("请检查输入格式是否正确！")
        }
        console.log(user);
    });
}

//第二次注册按钮点击事件
function secondRegister(){


}