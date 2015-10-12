$(function(){
    getAllTotalContract();
    deleteTotalContract();
    editorTotalContract();
    backTotalContract();
    backProjectDesign();
    saveTotalContract();
    addTotalContract();
});
function deleteTotalContract(){
    $(document).on("click",".delect-totalcontract",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "project/projectManagement/deleteTotalContract/" + thisID,
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

function editorTotalContract(){
    $(document).on("click",".editor-totalcontract",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        //伪造数据
        var totalcontract=[{
            "id": 1,
            "project_id": 2,
            "status": 4,
            "sequence": 2,
            "title": "项目建议书",
            "level": 1,
            "parent_id": 1,
            "dateStart": 2015-08-07,
            "dateEnd": 2015-09-06
        }]
        /*$.ajax({
                type: "GET",
                url: "project/projectManagement/getTotalContractId/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var totalContractData=eval(data.body);*/
                        var totalContractData=eval(totalcontract);
                        $.each(totalContractData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputProjectId").val(el.project_id);
                            $("#inputStatus").val(el.status);
                            $("#inputSequence").val(el.sequence);
                            $("#inputTitle").val(el.title);
                            $("#inputLevel").val(el.level);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorTotalContract").css("display","block");
    })
}

function saveTotalContract(){
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
            project_id:$("#inputProjectId").val(),
            status:$("#inputStatus").val(),
            sequence:$("#inputSequence").val(),
            title:$("#inputTitle").val(),
            level:$("#inputLevel").val()

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
            url:"project/projectManagement/editTotalContract",
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
function addTotalContract(){
    $(document).on("click","#addTotalContract",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/addTotalContract.html?"+thisID;
    })
}

function backTotalContract(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/nav.html?"+thisID;
    })
}

function backProjectDesign(){
    $(document).on("click","#backprojectdesign",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/seeProjectDesign.html?"+thisID;
    })
}

function getAllTotalContract(){
    $("th").addClass("text-center");
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    //测试数据
    var totalcontract =
        [{
            "id": 1,
            "project_id": 2,
            "status": 4,
            "sequence": 2,
            "title": "项目建议书",
            "level": 1,
            "parent_id": 1,
            "dateStart": 2015-08-07,
            "dateEnd": 2015-09-06
        }];
  // $.ajax({
  //     url:"project/projectManagement/getTotalContractId/"+thisID,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var totalContractData = eval(totalcontract);
                $.each(totalContractData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.project_id +"</td>";
                    strHTML += "<td>" + el.status+ "</td>";
                    strHTML += "<td>" + el.sequence + "</td>";
                    strHTML += "<td>" + el.title+ "</td>";
                    strHTML += "<td>" + el.level+ "</td>";
                    strHTML += "<td style='display:none;'>" + el.parent_id+ "</td>";
                    strHTML += "<td style='display:none;'>"+ format(el.dateStart, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td style='display:none;'>"+ format(el.dateEnd, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='editor-totalcontract btn btn-warning btn-sm'>编辑</button><button style='margin-left:8px;' class='delect-totalcontract btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}