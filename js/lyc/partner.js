$(function(){
    getAllPartner();
    deletePartner();
    addPartner();
    editorPartner();
    backPartner();
    savePartner();
});
function deletePartner(){
    $(document).on("click",".delect-partner",function(){
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/partner/deletePartners/" + thisID,
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

function addPartner(){
    $(document).on("click",".add-partner",function(){
        location.href = "../../html/lyc/addPartner.html";
    })
}

function editorPartner(){
    $(document).on("click",".editor-partner",function(){
        var thisID = $(this).parents("tr").children(".id").html();
        var partner=[{
             "id": 2,
            "userId": 23,
            "realname": "王铭",
            "address": "河南",
            "sex": "女",
            "birthday": -410256000000,
            "mobilephone": "34534",
            "fixedphone": "3453",
            "email": "234@qq.com",
            "grade": 6,
            "position": "总经理",
            "companyId": 2,
            "note": "河南建工的总经理",
            "headimg": "../../image/image.jpg",
            "createDate": 1440864856000,
            "lastModifyDate": 1440864859000
        }]
        /*$.ajax({
                type: "GET",
                url: "company/getCompany/" + thisID,
                success: function (data) {
                    if (data.status == 0) {
                        var partnerData=eval(data.body);*/
                        var partnerData=eval(partner);
                        $.each(partnerData,function(index,el){
                            $("#inputId").val(el.id);
                            $("#inputUserId").val(el.userId);
                            $("#inputRealName").val(el.realname);
                            $("#inputAdress").val(el.address);
                            $("#inputEmpumber").val(el.empumber);
                            if(el.sex=="男"){
                                $(".man").attr("selected","selected");
                            }else{
                                $(".woman").attr("selected","selected");
                            }
                            $("#inputEmail").val(el.email);
                            $("#inputBirthday").val(el.birthday);
                            $("#inputMobilephone").val(el.mobilephone);
                            $("#inputFixedphone").val(el.fixedphone);
                            $("#headimg").attr("src",el.headimg);
                        })
           /*         }
                }
        })*/
        $(".main-content").css("display","none");
        $("#editorPartner").css("display","block");
    })
}

function backPartner(){
    $(document).on("click","#back",function(){
        location.href = "../../html/lyc/partner.html";
    })
}

function savePartner(){
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
            Id:$("#inputId").val(),
            userId:$("#inputUserId").val(),
            name:$("#inputName").val(),
            adress:$("#inputAdress").val(),
            empnumber:$("#inputEmpumber").val(),
            sex:$("#sex").val(),
            email:$("#inputEmail").val(),
            birthday:$("#inputBirthday").val(),
            mobilephone:$("#inputMobilephone").val(),
            fixedphone:$("#inputFixedphone").val(),
            companyname:$("#inputCompanyName").val()
        };
        for(var i=0;i<inputBox.length;i++){
            if($(".form-group").eq(i).hasClass("has-error")){
                check=1;
            };
        };
        if(check==1){
            return false;
        };
        //上传头像
        var thisID =$("#inputId").val();
        $.ajaxFileUpload({
            url:"/partner/addheadimg/"+thisID,
            secureuri: false,
            fileElementId: "inputHeadimg",
            dataType:"JSON",
            success:function(data){
                $("#headimg").attr("src",data);
            }
        })
        //提交表单
        $.ajax({
            url:"/partner/editPartners",
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

function getAllPartner(){
    $("th").addClass("text-center");
    //测试数据
    var partner =
        [{
            "id": 1,
            "userId": 22,
            "realname": "王健林",
            "address": "北京",
            "sex": "男",
            "birthday": -410256000000,
            "mobilephone": "235235",
            "fixedphone": "234234",
            "email": "234@qq.com",
            "grade": 10,
            "position": "董事长",
            "companyId": 1,
            "note": "合作愉快",
            "headimg": "../../image/image.jpg",
            "createDate": 1440864700000,
            "lastModifyDate": 1440864702000
        },{
            "id": 2,
            "userId": 23,
            "realname": "王铭",
            "address": "河南",
            "sex": "男",
            "birthday": -410256000000,
            "mobilephone": "34534",
            "fixedphone": "3453",
            "email": "234@qq.com",
            "grade": 6,
            "position": "总经理",
            "companyId": 2,
            "note": "河南建工的总经理",
            "headimg": "../../image/image.jpg",
            "createDate": 1440864856000,
            "lastModifyDate": 1440864859000
        },{
            "id": 3,
            "userId": 24,
            "realname": "张萌",
            "address": "河南",
            "sex": "男",
            "birthday": -410256000000,
            "mobilephone": "3563465",
            "fixedphone": "346456",
            "email": "234@qq.com",
            "grade": 8,
            "position": "办公室主任",
            "companyId": 3,
            "note": "政府要求保障施工要全",
            "headimg": "../../image/image.jpg",
            "createDate": 1440864973000,
            "lastModifyDate": 1440864976000
        }];
  // $.ajax({
  //     url:"/partner/query?pageSize=3&currentPage="+currentPage,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var partnerData = eval(data.body);
                var strHTML="";
                var partnerData = eval(partner);
                console.log(partner);
                $.each(partnerData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr><td class='id' style='display: none'>+el.id +</td>";
                    strHTML += "<td class=userId' style='display: none'>" + el.userId+ "</td>";
                    strHTML += "<td>" + el.realname + "</td>";
                    strHTML += "<td>"+el.address+"</td>";
                    strHTML += "<td>" + el.sex + "</td>";
                    strHTML += "<td>" + format(el.birthday, 'yyyy-MM-dd ') + "</td>";
                    strHTML += "<td>" + el.mobilephone + "</td>";
                    strHTML += "<td>" + el.fixedphone + "</td>";
                    strHTML += "<td>" + el.email + "</td>";
                    strHTML += "<td>" + el.grade + "</td>";
                    strHTML += "<td>"+el.position +"</td>";
                    strHTML += "<td>" + el.companyId+ "</td>";
                    strHTML += "<td>" + el.note+ "</td>";
                    strHTML += "<td><img class='headImg' src="+el.headimg+"></td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px' class='add-partner btn btn-success btn-sm'>添加</button><button style='margin-bottom: 5px' class='editor-partner btn btn-warning btn-sm'>编辑</button><button class='delect-partner btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
  //              addPagination(data.body.totalPage,data.body.currentPage);

  //          }
//
  //      }
  //  })
}