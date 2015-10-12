$(function(){
    //默认填入项目ID
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    $("#inputProjectId").val(thisID);
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
        var thisHref=window.location.href;
        var myID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "projectrelated.html?"+myID;
    })
    //注册提交事件
    $("#save").bind("click",function(){
        var user={
            roleId:$("#inputStage").val(),
            partnerId:$("#inputPartnerId").val(),
            projectId:$("#inputProjectId").val()
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
            url:"/projectRelated/addRelatedPartners",
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