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
        location.href = "partner.html";
    })
    //注册提交事件
    $("#save").bind("click",function(){
        var user={
            userId:$("#inputUserId").val(),
            name:$("#inputName").val(),
            adress:$("#inputAdress").val(),
            empnumber:$("#inputEmpumber").val(),
            sex:$("#sex").val(),
            email:$("#inputEmail").val(),
            birthday:$("#inputBirthday").val(),
            mobilephone:$("#inputMobilephone").val(),
            fixedphone:$("#inputFixedphone").val(),
            companyname:$("#inputCompanyName").val(),
            headimg:$("#inputHeadimg").val()
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
            url:"/partner/addPartners",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(user),
            success:function(data){
                if(data.status==0){
                    alert("保存成功！");
                }
            }
        });
    });
});