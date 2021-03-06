$(function(){
    getAllProjectStage();
    deleteProjectStage();
    editorProjectStage();
    backProjectStage();
    backProjectDesign();
    saveProjectStage();
    addProjectStage();
});
function deleteProjectStage(){
    $(document).on("click",".delect-projectStage",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/projectStage/deleteStageInfo/" + thisID,
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

function editorProjectStage(){
    $(document).on("click",".editor-projectStage",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        //伪造数据
        var projectStage=[{
            "id": 1,
            "projectId": 1,
            "stage": 1,
            "message": "项目策划及审批",
            "isFinished": 2,
            "directorId": 17,
            "createDate": 1440863963000,
            "lastModifyDate": 1440863966000
        }]
        /*$.ajax({
                type: "GET",
                url: "http://localhost:8080/OA/projectStage/queryStageInfoById/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var projectStageData=eval(data.body);*/
                        var projectStageData=eval(projectStage);
                        $.each(projectStageData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputProjectId").val(el.projectId);
                            $("#inputStage").val(el.stage);
                            $("#inputMessage").val(el.message);
                            if(el.isFinished=="1"){
                                $(".yes").attr("selected","selected");
                            }else{
                                $(".no").attr("selected","selected");
                            }
                            $("#inputDirectorId").val(el.directorId);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorProjectStage").css("display","block");
    })
}

function saveProjectStage(){
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
            id:$("#inputId").val(),
            projectId:$("#inputProjectId").val(),
            stage:$("#inputStage").val(),
            isFinished:$("#isFinished").val(),
            message:$("#inputMessage").val(),
            directorId:$("#inputDirectorId").val()

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
            url:"/projectStage/editStageInfo",
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
function addProjectStage(){
    $(document).on("click","#addprojectstage",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/addProjectStage.html?"+thisID;
    })
}

function backProjectStage(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/projectstage.html?"+thisID;
    })
}

function backProjectDesign(){
    $(document).on("click","#backprojectdesign",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/nav.html?"+thisID;
    })
}

function getAllProjectStage(){
    $("th").addClass("text-center");
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    //测试数据
    var projectStage =
        [{
            "id": 1,
            "projectId": 1,
            "stage": 1,
            "message": "项目策划及审批",
            "isFinished": 2,
            "directorId": 17,
            "createDate": 1440863963000,
            "lastModifyDate": 1440863966000
        },{
            "id": 2,
            "projectId": 1,
            "stage": 2,
            "message": "方案设计及施工图纸设计",
            "isFinished": 2,
            "directorId": 13,
            "createDate": 1440863968000,
            "lastModifyDate": 1440863971000
        }];
  // $.ajax({
  //     url:"http://localhost:8080/OA/projectStage/queryStageInfoById/"+thisID,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var projectStageData = eval(projectStage);
                $.each(projectStageData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.projectId +"</td>";
                    if(el.isFinished==1){
                        var finish="是";
                    }else{
                        finish="否";
                    }
                    strHTML += "<td>" + el.stage+ "</td>";
                    strHTML += "<td>" + el.message + "</td>";
                    strHTML += "<td>" + finish+ "</td>";
                    strHTML += "<td>" + el.directorId+ "</td>";
                    strHTML += "<td style='display:none;'>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td style='display:none;'>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='editor-projectStage btn btn-warning btn-sm'>编辑</button><button style='margin-left:8px;' class='delect-projectStage btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}