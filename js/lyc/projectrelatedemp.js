$(function(){
    getAllProjectRelatedEmp();
    deleteProjectRelatedEmp();
    addProjectRelatedEmp();
    editorProjectRelatedEmp();
    backProjectRelatedEmp();
    saveProjectRelatedEmp();
});
function deleteProjectRelatedEmp(){
    $(document).on("click",".delect-projectRelatedEmp",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/projectRelated/deleteRelatedEmp/" + thisID,
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

function addProjectRelatedEmp(){
    $(document).on("click",".add-projectRelatedEmp",function(){
        location.href = "../../html/lyc/addProjectRelatedEmp.html";
    })
}

function editorProjectRelatedEmp(){
    $(document).on("click",".editor-projectRelatedEmp",function(){
        var thisID = $(this).parents("tr").children(".id").html();
        //伪造数据
        var projectRelatedEmp=[{
            "id": 6,
            "roleId": 3,
            "empId": 15,
            "projectId": 2,
            "createDate": 1440997074000,
            "lastModifyDate": 1440997082000
        }]
        /*$.ajax({
                type: "GET",
                url: "http://localhost:8080/OA/projectRelated/queryRelatedEmpsById/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var projectRelatedEmpData=eval(data.body);*/
                        var projectRelatedEmpData=eval(projectRelatedEmp);
                        $.each(projectRelatedEmpData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputRoleId").val(el.roleId);
                            $("#inputEmpId").val(el.empId);
                            $("#inputProjectId").val(el.projectId);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorProjectRelatedEmp").css("display","block");
    })
}

function saveProjectRelatedEmp(){
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
            empId:$("#inputEmpId").val(),
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
            url:"/projectRelated/editRelatedEmp",
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

function backProjectRelatedEmp(){
    $(document).on("click","#back",function(){
        location.href = "../../html/lyc/projectRelatedEmp.html";
    })
}

function getAllProjectRelatedEmp(){
    $("th").addClass("text-center");
    //测试数据
    var projectRelatedEmp =
        [{
            "id": 6,
            "roleId": 3,
            "empId": 15,
            "projectId": 2,
            "createDate": 1440997074000,
            "lastModifyDate": 1440997082000
        },{
            "id": 7,
            "roleId": 3,
            "empId": 14,
            "projectId": 2,
            "createDate": 1440997072000,
            "lastModifyDate": 1440997080000
        }];
  // $.ajax({
  //     url:"/projectRelated/queryRelatedEmp?pageSize=3&currentPage="+currentPage,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var projectRelatedEmpData = eval(projectRelatedEmp);
                $.each(projectRelatedEmpData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.roleId +"</td>";
                    strHTML += "<td>" + el.empId+ "</td>";
                    strHTML += "<td>" + el.projectId + "</td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='add-projectRelatedEmp btn btn-success btn-sm'>添加</button><button style='margin-bottom: 5px;margin-left:8px;' class='editor-projectRelatedEmp btn btn-warning btn-sm'>编辑</button><button style='margin-left:8px;' class='delect-projectRelatedEmp btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}