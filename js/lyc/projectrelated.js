$(function(){
    getAllProjectRelated();
    deleteProjectRelated();
    addProjectRelated();
    editorProjectRelated();
    backProjectRelated();
    backSeeProjectDesign();
    saveProjectRelated();
});
function deleteProjectRelated(){
    $(document).on("click",".delect-projectRelated",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/projectRelated/deleteRelatedPartner/" + thisID,
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

function addProjectRelated(){
    $(document).on("click","#addProjectRelated",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/addProjectRelated.html?"+thisID;
    })
}

function editorProjectRelated(){
    $(document).on("click",".editor-projectRelated",function(){
        var thisID = $(this).parents("tr").children(".id").html();
        //伪造数据
        var projectRelated=[{
            "id": 5,
            "roleId": 2,
            "partnerId": 1,
            "projectId": 2,
            "createDate": 1440997774000,
            "lastModifyDate": 1440997870000
        }]
        /*$.ajax({
                type: "GET",
                url: "http://localhost:8080/OA/projectRelated/queryRelatedPartnersById/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var projectRelatedData=eval(data.body);*/
                        var projectRelatedData=eval(projectRelated);
                        $.each(projectRelatedData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputRoleId").val(el.roleId);
                            $("#inputPartnerId").val(el.partnerId);
                            $("#inputProjectId").val(el.projectId);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorProjectRelated").css("display","block");
    })
}

function saveProjectRelated(){
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
            roleId:$("#inputRoleId").val(),
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
            url:"/projectRelated/editRelatedPartners",
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

function backProjectRelated(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/projectRelated.html?"+thisID;
    })
}

function backSeeProjectDesign(){
    $(document).on("click","#backSeeProjectDesign",function(){
        var thisHref=window.location.href;
        var myId=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/nav.html?"+myId;
    })
}

function getAllProjectRelated(){
    $("th").addClass("text-center");
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    //测试数据
    var projectRelated =
        [{
            "id": 5,
            "roleId": 2,
            "partnerId": 1,
            "projectId": 2,
            "createDate": 1440997774000,
            "lastModifyDate": 1440997870000
        }];
  // $.ajax({
  //     url:"http://localhost:8080/OA/projectRelated/queryRelatedPartnersById/"+thisID,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var projectRelatedData = eval(projectRelated);
                $.each(projectRelatedData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.roleId +"</td>";
                    strHTML += "<td>" + el.partnerId+ "</td>";
                    strHTML += "<td>" + el.projectId + "</td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='editor-projectRelated btn btn-warning btn-sm'>编辑</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);

  //          }
//
  //      }
  //  })
}