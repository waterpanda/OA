$(function(){
    getAllSubContract();
    deleteSubContract();
    editorSubContract();
    backSubContract();
    backProjectDesign();
    saveSubContract();
    addSubContract();
});
function deleteSubContract(){
    $(document).on("click",".delect-subcontract",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "project/projectManagement/deleteSubContract/" + thisID,
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

function editorSubContract(){
    $(document).on("click",".editor-subcontract",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        //伪造数据
        var subcontract=[{
            "id": 1,
            "project_id": 2,
            "title": "幕墙工程",
            "contractor_id": 4,
            "process": 95,
            "dateStart": 2015-09-07,
            "dateEnd": 2015-09-08
        }]
        /*$.ajax({
                type: "GET",
                url: "project/projectManagement/getSubContractById/" + thisID, 
                success: function (data) {
                    if (data.status == 0) {
                        var subContractData=eval(data.body);*/
                        var subContractData=eval(subcontract);
                        $.each(subContractData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputProjectId").val(el.project_id);
                            $("#inputTitle").val(el.title);
                            $("#inputContractorId").val(el.contractor_id);
                            $("#inputProcess").val(el.process);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $(".editorSubContract").css("display","block");
    })
}

function saveSubContract(){
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
            title:$("#inputTitle").val(),
            contractor_id:$("#inputContractorId").val(),
            process:$("#inputProcess").val()

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
            url:"project/projectManagement/updateSubContract",
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
function addSubContract(){
    $(document).on("click","#addSubContract",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/addSubContract.html?"+thisID;
    })
}

function backSubContract(){
    $(document).on("click","#back",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/subcontract.html?"+thisID;
    })
}

function backProjectDesign(){
    $(document).on("click","#backprojectdesign",function(){
        var thisHref=window.location.href;
        var thisID=thisHref.substring(thisHref.indexOf("?")+1);
        location.href = "../../html/lyc/nav.html?"+thisID;
    })
}

function getAllSubContract(){
    $("th").addClass("text-center");
    var thisHref=window.location.href;
    var thisID=thisHref.substring(thisHref.indexOf("?")+1);
    //测试数据
    var subcontract =
        [{
            "id": 1,
            "project_id": 2,
            "title": "幕墙工程",
            "contractor_id": 4,
            "process": 95,
            "dateStart": 2015-09-07,
            "dateEnd": 2015-09-08
        }];
  // $.ajax({
  //     url:"project/projectManagement/getSubContractById/"+thisID,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var subContractData = eval(subcontract);
                $.each(subContractData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr>"+"<td style='display:none;' class='id'>"+ el.id +"</td>";
                    strHTML += "<td>" + el.project_id +"</td>";
                    strHTML += "<td>" + el.title+ "</td>";
                    strHTML += "<td>" + el.contractor_id + "</td>";
                    strHTML += "<td>" + el.process+ "</td>";
                    strHTML += "<td style='display:none;'>"+ format(el.dateStart, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td style='display:none;'>"+ format(el.dateEnd, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px;margin-left:8px;' class='editor-subcontract btn btn-warning btn-sm'>编辑</button><button style='margin-left:8px;' class='delect-subcontract btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}