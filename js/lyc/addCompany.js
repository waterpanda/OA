$(function(){
    //检查是否为空
    var inputBox=$(".form-group input");
    var check=0;
    for(var i=0;i<inputBox.length;i++){
            inputBox.eq(i).blur(function(){
                if($(this).val()==""){
                    $(this).parents(".form-group").addClass("has-error");
                }else{
                    $(this).parents(".form-group").removeClass("has-error").addClass("has-success");
                }
            }).focus(function(){
                $(this).parents(".form-group").removeClass("has-success has-error");
            });
        }
    //返回上一级
    $("#back").bind("click",function(){
        location.href = "company.html";
    })
    //注册提交事件
    $("#save").bind("click",function(){
        var user={
            companyId:$("#inputCompanyId").val(),
            companyName:$("#inputCompanyName").val(),
            companyAdress:$("#inputCompanyAdress").val()
        };
        for(var i=0;i<inputBox.length;i++){
            if($(".form-group").eq(i).hasClass("has-error")){
                check=1;
            };
        };
        if(check==1){
            return false;
        };
        $.ajax({
            url:"/company/add",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(user),
            success:function(data){
                if(data.status==0){
                    alert(data.message);
                }
            }
        });
    });
});