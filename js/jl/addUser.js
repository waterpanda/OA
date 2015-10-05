/**
 * Created by Administrator on 2015/9/26 0026.
 */
$(function(){
    init();
    checkIsSame();
    checkNull();
    firstRegister();//第一次注册事件
});

//init
function init(){
    $("#commit-li").click(function(){
        $("#commit-li").addClass("status-active");
        $("#add-mes-li").removeClass("status-active");
        $("#first-commit-user").show();
        $("#second-add-mes").hide();
    });
    $("#add-mes-li").click(function(){
        $("#commit-li").removeClass("status-active");
        $("#add-mes-li").addClass("status-active");
        $("#first-commit-user").hide();
        $("#second-add-mes").show();
    });
}

//检查两次输入密码是否相同
function checkIsSame() {
    $("#first-commit-user #confirmPassword").blur(function () {
        if ($(this).val() != "") {
            var val1 = $("#first-commit-user #inputPassword").val();
            var val2 = $(this).val();
            if (val1 != val2) {
                $(".confirmPassword-status").html("*两次输入密码不一致！");
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
        }
    })
}

//注册按钮点击事件
function firstRegister(){
    $("#first-submit").click(function(){
        
    });
}