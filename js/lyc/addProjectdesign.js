$(function(){
    //检查是否为空
    var inputBox=$(".form-group input");
    var textAreaBox=$(".form-group textarea");
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
            textAreaBox.eq(i).blur(function(){
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
        location.href = "projectdesign.html";
    })
    //注册提交事件
    $("#save").bind("click",function(){
        var user={
            id:$("#inputProjectId").val(),
            projectname:$("#inputProjectName").val(),
            buildingname:$("#inputBuildingName").val(),
            number:$("#inputNumbers").val(),
            isgong:$("#isGoing").val(),
            description:$("#inputDescription").val(),
            location:$("#inputLocation").val(),
            dateStart:$("#inputDateStart").val(),
            dateEnd:$("#inputDateEnd").val(),
            progress:$("#inputProgress").val(),
            promessage:$("#inputProMessage").val(),
            area:$("#inputArea").val(),
            scale:$("#inputScale").val(),
            image:$("#image").val(),
            effectpic:$("#effectPic").val(),
            effectvideo:$("#effectVideo").val(),
            creattime:$("#inputCreatTime").val(),
            lastModifyDate:$("#inputLastModifyDate").val()
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
            url:"/project/addproject",
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