/**
 * Created by jiangli on 2015//9/26.
 */
$(function(){
    var array = [0,1];
    //检查输入框是否为空
    checkNull(array);
    function checkNull(array){
        for(var i=0;i<array.length;i++){
            $(".form-group input").eq(i).blur(function(){
                if($(this).val()==null || $.trim($(this).val())==""){
                    $(this).parents(".form-group").addClass("has-warning");
                    $(this).next().addClass("fa fa-warning").css("color","#8a6d3b");
                    $(this).parent().next().html("输入不能为空");
                }else{
                    $(this).parents(".form-group").addClass("has-success");
                    $(this).next().addClass("fa fa-check").css("color","#3c763d");
                }
            }).focus(function(){
                $(this).parents(".form-group").removeClass("has-success has-warning");
                $(this).next().removeClass("fa fa-check fa fa-warning");
                $(this).parent().next().html("");
            });
        }
    }

    //登陆的提交事件
    $(".loginSumbit").bind("click",function(){
        var number=0;
        var user = {
            name: $.trim($("#loginName").val()),
            password:$("#loginPassword").val()
        };

        if(user.name ){
            $("input").eq(0).parents(".form-group").addClass("has-success");
        }
        if(user.password){
            $("input").eq(1).parents(".form-group").addClass("has-success");
        }

        for(var i=0;i<array.length;i++){
            if($(".login-form .form-group").eq(i).hasClass("has-success")){
                number++;
            }
        }
        if(number != array.length){
            return false;
        }


        $.ajax({
            url:"/OA/user/adminlogin",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(user),
            success:function(data){
                if(data.status == 0){
                    var json = eval(data.body);
                    location.href="../jl/userAdd.html";
                }
                }
            })
        });

});