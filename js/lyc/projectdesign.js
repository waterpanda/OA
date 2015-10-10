$(function(){
    getAllProjectDesign();
    deleteProjectDesign();
    addProjectDesign();
    editorProjectDesign();
    seeProjectDesign();
    backProjectDesign();
    saveProjectDesign();
});
function deleteProjectDesign(){
    $(document).on("click",".delect-projectdesign",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/project/delete/" + thisID,
                success: function (data) {
                    if (data.status == 0) {
                        alert("删除成功！");
                        window.location.reload();//刷新当前页面
                    }
                }
            })
        });
    })
}

function addProjectDesign(){
    $(document).on("click",".add-projectdesign",function(){
        location.href = "../../html/lyc/addProjectDesign.html";
    })
}

function editorProjectDesign(){
    $(document).on("click",".editor-projectdesign",function(){
        var thisID = $(this).parents("tr").children(".id").html();
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
                            if(el.isGong=="1"){
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
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".seeProjectDesign").css("display","none");
        $(".editorProjectDesign").css("display","block");
    })
}

function seeProjectDesign(){
    $(document).on("click",".see-projectdesign",function(){
        var thisID = $(this).parents("tr").children(".id").html();
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
                url: "company/getCompany/" + thisID, //这个链接是错误的
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
        $(":input").attr("disabled","disabled");
        $("#back").attr("disabled",false);
        $(".main-content").css("display","none");
        $(".editorProjectDesign").css("display","none");
        $(".seeProjectDesign").css("display","block");
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
            scale:$("#inputScale").val(),
            image:$("#image").val(),
            effectpic:$("#effectPic").val(),
            effectvideo:$("#effectVideo").val()

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
    });
}

function backProjectDesign(){
    $(document).on("click","#back",function(){
        location.href = "../../html/lyc/projectDesign.html";
    })
}

function getAllProjectDesign(){
    $("th").addClass("text-center");
    //测试数据
    var projectdesign =
        [{
            "projectDesignId": 1,
            "projectName": "南京体院项目",
            "buildingName": "南京体院体育馆",
            "number": "A014-08-06-08",
            "isGoing": 0,
            "descriptions": "项目位于市中心热门地段，能够很好的实现项目规划是提出的实现要求",
            "locations": "南京",
            "area": "45676",
            "scale": "456745",
            "datestart": 1408809600000,
            "dateend": 1440345600000,
            "image": "../../image/image.jpg",
            "effectpic": "../../image/image.jpg",
            "effectvideo": "video.mp4",
            "progress": "39",
            "promessage": "现阶段负责人为工程部刘晓伟，规划等工作已经完成，",
            "grade": 3,
            "createDate": 1440430350000,
            "lastModifyDate": 1440430354000
        },{
            "projectDesignId": 2,
            "projectName": "安钢御水园项目",
            "buildingName": "安钢御水园综合体",
            "number": "A014-08-06-08",
            "isGoing": 1,
            "descriptions": "项目位于市中心热门地段，能够很好的实现项目规划是提出的实现要求",
            "locations": "北京",
            "area": "6800",
            "scale": "100",
            "datestart": 1440345600000,
            "dateend": 1471968000000,
            "image": "../../image/image.jpg",
            "effectpic": "../../image/image.jpg",
            "effectvideo": "video.mp4",
            "progress": "37",
            "promessage": "现阶段负责人为工程部刘晓伟，规划等工作已经完成，",
            "grade": 2,
            "createDate": 1440430356000,
            "lastModifyDate": 1440430358000
        },{
            "projectDesignId": 3,
            "projectName": "北京奥运会开幕式",
            "buildingName": "北京奥运会",
            "number": "165185496",
            "isGoing": 0,
            "descriptions": "在北京五棵松",
            "locations": "鸟巢",
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
        }];
  // $.ajax({
  //     url:"/projectdesign/query?pageSize=3&currentPage="+currentPage,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var projectDesignData = eval(projectdesign);
                $.each(projectDesignData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td>"+ el.projectDesignId +"</td>";
                    strHTML += "<td>" + el.projectName +"</td>";
                    strHTML += "<td>" + el.number+ "</td>";
                    strHTML += "<td>" + el.isGoing + "</td>";
                    strHTML += "<td><img class='image' src="+el.image+"></td>";
                    strHTML += "<td>" + el.progress+ "</td>";
                    strHTML += "<td>" + el.grade+ "</td>";
                    strHTML += "<td><button style='margin-bottom: 10px;margin-right:10px;' class='see-projectdesign btn btn-info btn-sm'>查看</button><button style='margin-bottom: 10px' class='add-projectdesign btn btn-success btn-sm'>添加</button><button style='margin-bottom: 10px;margin-right:10px;' class='editor-projectdesign btn btn-warning btn-sm'>编辑</button><button style='margin-top:-10px;' class='delect-projectdesign btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}