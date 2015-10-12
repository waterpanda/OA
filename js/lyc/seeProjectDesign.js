$(function(){
    getAllEditorProjectDesign();
    saveProjectDesign();
    backProjectDesign();
    seeNav();
});

function seeNav(){
    $(document).on("click","#tips",function(){
        var myId=$("#inputProjectId").val();
        location.href = "../../html/lyc/nav.html?"+myId;
    })
}

function backProjectDesign(){
    $(document).on("click","#back",function(){
        location.href = "../../html/lyc/projectDesign.html";
    })
}
function saveProjectDesign(){
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
    //注册提交事件
    $(document).on("click","#save",function(){
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
            scale:$("#inputScale").val()
        };
        for(var i=0;i<inputBox.length;i++){
            if($(".form-group").eq(i).hasClass("has-error")){
                check=1;
            };
        };
        if(check==1){
            return false;
        };
        var state=0;
        //上传项目图片
        var thisID =$("#inputProjectId").val();
        $.ajaxFileUpload({
            url:"/partner/addimage/"+thisID,
            secureuri: false,
            fileElementId: "image",
            dataType:"JSON",
            success:function(data){
                state+=1;
            }
        })
        //提交项目效果图
        $.ajaxFileUpload({
            url:"/partner/addeffectPic/"+thisID,
            secureuri: false,
            fileElementId: "effectPic",
            dataType:"JSON",
            success:function(data){
                state+=1;
            }
        })
        //提交效果视频
        $.ajaxFileUpload({
            url:"/partner/addVieo/"+thisID,
            secureuri: false,
            fileElementId: "effectVideo",
            dataType:"JSON",
            success:function(data){
                state+=1;
            }
        })
        //提交表单
        if(state==3){
            $.ajax({
                url:"/project/updateproject",
                type:"POST",
                contentType:"application/json",
                data:JSON.stringify(user),
                success:function(data){
                    if(data.status==0){
                        alert("保存成功！");
                    }
                }
            });
        }
    });
}
function getAllEditorProjectDesign(){
    $(":input").attr("disabled","disabled");
    $("#back").attr("disabled",false);
    $("#subcontract").attr("disabled",false);
    $("#tips").attr("disabled",false);
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        //伪造数据
        var projectDesign=[{
            "id": 3,
            "projectName": "北京奥运会开幕式",
            "buildingName": "北京奥运会",
            "number": "165185496",
            "isGoing": 0,
            "description": "在北京五棵松",
            "location": "鸟巢",
            "area": "5464",
            "scale": "4564346",
            "datestart": 1407427200000,
            "dateend": 1220112000000,
            "image": "../../image/image.jpg",
            "effectpic": "../../image/image.jpg",
            "effectvideo": "/mp4/2015_09_28_14_59_17effectvideo爱情公寓 - 我的未来式.mp3",
            "progress": "100",
            "promessage": "现阶段是周成全权负责",
            "grade": 4,
            "createDate": 1440952400000,
            "lastModifyDate": 1443423557000
        }]
        /*$.ajax({
                type: "GET",
                url: "/projectdesign/queryproject/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var projectDesignData=eval(data.body);*/
                        var projectDesignData=eval(projectDesign);
                        $.each(projectDesignData,function(index,el){
                            $("#inputProjectId").val(el.id);
                            $("#inputProjectName").val(el.projectName);
                            $("#inputBuildingName").val(el.buildingName);
                            $("#inputNumbers").val(el.number);
                            if(el.isgong=="1"){
                                $(".yes").attr("selected","selected");
                            }else{
                                $(".no").attr("selected","selected");
                            }
                            $("#inputDescription").val(el.description);
                            $("#inputLocation").val(el.location);
                            $("#inputDateStart").val(el.datestart);
                            $("#inputDateEnd").val(el.dateend);
                            $("#inputProgress").val(el.progress);
                            $("#inputProMessage").val(el.promessage);
                            $("#inputArea").val(el.area);
                            $("#inputScale").val(el.scale);
                            $("#image").attr("src",el.image);
                            $("#effectPic").attr("src",el.effectpic);
                            $("#effectVideo").attr("src",el.effectvideo);
                            $("#inputCreatTime").val(el.createDate);
                            $("#inputLastModifyDate").val(el.lastModifyDate);
                        })
           /*         }
                }
        })*/
}