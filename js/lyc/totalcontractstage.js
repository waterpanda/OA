$(function(){
    getAllTotalContractStage();
    deleteTotalContractStage();
    editorTotalContractStage();
    backTotalContractStage();
    backProjectDesign();
    saveTotalContractStage();
    addTotalContractStage();
});
function deleteTotalContractStage(){
    $(document).on("click",".delect-totalcontractstage",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "project/projectManagement/deleteTotalContractStages/" + thisID,
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

function editorTotalContractStage(){
    $(document).on("click",".editor-totalcontractstage",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        //伪造数据
        var totalcontractstage=[{
            "id": 1,
            "project_id": 1,
            "totalcontract_id": 10,
            "stage": 1,
            "message": "申请资料整合",
            "is_finished": 2,
            "director_id": 17
        }]
        /*$.ajax({
                type: "GET",
                url: "project/projectManagement/getTotalContractSatge/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var totalContractStageData=eval(data.body);*/
                        var totalContractStageData=eval(totalcontractstage);
                        $.each(totalContractStageData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputProjectId").val(el.project_id);
                            $("#inputTotalContractId").val(el.totalcontract_id);
                            $("#inputStage").val(el.stage);
                            $("#inputMessage").val(el.message);
                            if(el.is_finished==1){
                                $(".no").attr("selected","selected");
                            }else if(el.is_finished==2){
                                $(".doing").attr("selected","selected");
                            }else{
                                $(".yes").attr("selected","selected");
                            }
                            $("#inputDirectorId").val(el.director_id);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorTotalContractStage").css("display","block");
    })
}

function saveTotalContractStage(){
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
    //注册提交事件
    $(document).on("click","#save",function(){
        var user={
            id:$("#inputId").val(),
            project_id:$("#inputProjectId").val(),
            status:$("#inputStatus").val(),
            totalcontract_id:$("#inputTotalContractId").val(),
            message:$("#inputMessage").val(),
            is_finished:$("#isFinished").val(),
            director_id:$("#inputDirectorId").val()

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
            url:"project/projectManagement/editTotalContractSatg",
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
function addTotalContractStage(){
    $(document).on("click","#addTotalContractStage",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/addTotalContractStage.html?"+thisID;
    })
}

function backTotalContractStage(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/totalcontractstage.html?"+thisID;
    })
}

function backProjectDesign(){
    $(document).on("click","#backprojectdesign",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/nav.html?"+thisID;
    })
}

function getAllTotalContractStage(){
    $("th").addClass("text-center");
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    //测试数据
    var totalcontractstage =
        [{
            "id": 1,
            "project_id": 1,
            "totalcontract_id": 10,
            "stage": 1,
            "message": "申请资料整合",
            "is_finished": 2,
            "director_id": 17
        }];
  // $.ajax({
  //     url:"project/projectManagement/getTotalContractSatge/"+thisID,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var totalContractStageData = eval(totalcontractstage);
                $.each(totalContractStageData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.project_id +"</td>";
                    strHTML += "<td>" + el.totalcontract_id+ "</td>";
                    strHTML += "<td>" + el.stage + "</td>";
                    strHTML += "<td>" + el.message+ "</td>";
                    if(el.is_finished==1){
                        var finish="未完成";
                    }else if(el.is_finished==2){
                        finish="正在进行";
                    }else{
                        finish="完成";
                    };
                    strHTML += "<td>" + finish+ "</td>";
                    strHTML += "<td>" + el.director_id+ "</td>";
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='editor-totalcontractstage btn btn-warning btn-sm'>编辑</button><button style='margin-left:8px;' class='delect-totalcontractstage btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}