$(function(){
    getAllCompany();
    deleteCompany();
    addCompany();
    editorCompany();
    saveCompany();
    backCompany();
}); 
function deleteCompany(){
    $(document).on("click",".delect-company",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "company/delete/" + thisID,
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

function addCompany(){
    $(document).on("click",".add-company",function(){
        location.href = "../../html/lyc/addCompany.html";
    })
}

function editorCompany(){
    $(document).on("click",".editor-company",function(){
        var thisID = $(this).parents("tr").children(".id").html();
        var company=[{
            "id": 6,
            "companyname": "宝钢集团",
            "address": "天津市",
            "createDate": 1440429857000,
            "lastModifyDate": 1440429860000
        }]
        /*$.ajax({
                type: "GET",
                url: "company/getCompany/" + thisID,
                success: function (data) {
                    if (data.status == 0) {
                        var companyData=eval(data.body);*/
                        var companyData=eval(company);
                        $.each(companyData,function(index,el){
                            $("#inputCompanyId").val(el.id);
                            $("#inputCompanyName").val(el.companyname);
                            $("#inputCompanyAdress").val(el.address);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $("#editorCompany").css("display","block");
    })
}

function backCompany(){
    $(document).on("click","#back",function(){
        location.href = "../../html/lyc/company.html";
    })
}

function saveCompany(){
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
        location.href = "company.html";
    })
    //注册提交事件
    $(document).on("click","#save",function(){
        var user={
            companyId:$("#inputCompanyId").val(),
            companyName:$("#inputCompanyName").val(),
            companyAdress:$("#inputCompanyAdress").val()
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
            url:"/company/update",
            type:"POST",
            contentType:"application/json",
            data:JSON.stringify(user),
            success:function(data){
                if(data.status==0){
                    alert(data.message);
                }
            }
        });
    });
}

function getAllCompany(){
    $("th").addClass("text-center");
    //测试数据
    var company =
        [{
            "id": 4,
            "companyname": "河南省安阳市政府",
            "address": "河南安阳",
            "createDate": 1440429806000,
            "lastModifyDate": 1440429810000
        },{
            "id": 5,
            "companyname": "中国建筑工程总公司",
            "address": "北京建筑路",
            "createDate": 1440429838000,
            "lastModifyDate": 1440429840000
        },{
            "id": 6,
            "companyname": "宝钢集团",
            "address": "天津市",
            "createDate": 1440429857000,
            "lastModifyDate": 1440429860000
        }];
  // $.ajax({
  //     url:"/company/query?pageSize=3&currentPage="+currentPage,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var partnerData = eval(company);
                console.log(company);
                $.each(partnerData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr><td class='id' style='display: none'>+el.id +</td>";
                    strHTML += "<td>" + el.companyname + "</td>";
                    strHTML += "<td>"+el.address+"</td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button class='add-company btn btn-success btn-sm'>添加</button><button class='editor-company btn btn-warning btn-sm'>编辑</button><button class='delect-company btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
//              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}