/**
 * Created by Administrator on 2015/9/30 0030.
 */
$(function(){
    getAlluser();
    deleteUser();
    modifyUser();

    //分页的点击
    $(document).on("click",".pagination-number",function(){
        currentPage = parseInt($(this).find("a").html());
        getAlluser(currentPage);
    });
    $(document).on("click",".pre",function(){
        currentPage--;
        getAlluser(currentPage);
    });
    $(document).on("click",".next",function(){
        currentPage++;
        getAlluser(currentPage);
    });
});
function getAlluser(currentPage){
    //伪造数据
    var user =
        [{
            "id": 11,
            "userId": 13,
            "realname": "孟琦",
            "empnumber": "2354",
            "address": "公司总部",
            "sex": "女",
            "birthday": 791913600000,
            "mobilephone": "345",
            "fixedphone": "235434",
            "email": "2452106414@qq.com",
            "positionId": 1,
            "departmentId": 3,
            "grade": 5,
            "headimg": "../../image/image.jpg",
            "note": "工作认真负责",
            "createDate": 1440430495000,
            "lastModifyDate": 1440430498000
        },{
            "id": 11,
            "userId": 13,
            "realname": "孟琦",
            "empnumber": "2354",
            "address": "公司总部",
            "sex": "女",
            "birthday": 791913600000,
            "mobilephone": "345",
            "fixedphone": "235434",
            "email": "2452106414@qq.com",
            "positionId": 1,
            "departmentId": 3,
            "grade": 5,
            "headimg": "../../image/image.jpg",
            "note": "工作认真负责",
            "createDate": 1440430495000,
            "lastModifyDate": 1440430498000
        }];
  // $.ajax({
  //     url:"/employee/query?pageSize=3&currentPage="+currentPage,
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var userData = eval(user);
                $.each(userData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr><td class='id' style='display: none'>"+ el.id +"</td>";
                    strHTML += "<td class=userId' style='display: none'>" + el.userId+ "</td>";
                    strHTML += "<td><img class='headImg' src="+el.headimg+"></td>";
                    strHTML += "<td class='realname'>" + el.realname + "</td>";
                    strHTML += "<td class='sex'>" + el.sex + "</td>";
                    strHTML += "<td class='empnumber'>" + el.empnumber + "</td>";
                    strHTML += "<td class='birthday'>" + format(el.birthday, 'yyyy-MM-dd ') + "</td>";
                    strHTML += "<td class='mobilephone'>" + el.mobilephone + "</td>";
                    strHTML += "<td class='fixedphone'>" + el.fixedphone + "</td>";
                    strHTML += "<td class='email'>" + el.email + "</td>";
                    strHTML += "<td class='adress'>"+el.address+"</td>";
                    strHTML += "<td class='positionId' style='display: none'>"+el.positionId +"</td>";
                    strHTML += "<td class='departmentId' style='display: none'>"+el.departmentId +"</td>";
                    strHTML += "<td>" + el.grade + "</td>";
                    strHTML += "<td>" + el.note+ "</td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px' class='modify-user btn btn-warning btn-sm'>修改</button><button class='delect-user btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);
  //              addPagination(data.body.totalPage,data.body.currentPage);
  //          }
  //
  //      }
  //  })
}
//删除用户
function deleteUser(){
    $(document).on("click",".delect-user",function(){
        $('#myModal1').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/employee/delete/" + thisID,
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
//修改员工信息
function modifyUser(){
    //修改按钮绑定事件
    $(document).on("click",".modify-user",function(){
        //储存当前选中员工的信息
        //页面变化
        var userId =  $(this).parents("tr").children(".id").html();
        console.log(userId);
        $(".first-wrapper").hide();
        $(".second-wrap").show();
        modifyImage();
        modifyMessage();
        //修改头像
        function modifyImage(){
            $(".headImage-li").click(function(){
                $(".headImage-li").addClass("status-active");
                $(".message-li").removeClass("status-active");
                $("#headImage-change").show();
                $("#message-change").hide();

            });
        }
        //修改基本信息
        function modifyMessage(){
            $(".message-li").click(function(){
                $(".message-li").addClass("status-active");
                $(".headImage-li").removeClass("status-active");
                $("#headImage-change").hide();
                $("#message-change").show();

            });
        }
    })
}

//分页UI的添加
function addPagination(totalPage,currentPage){
    var content ="";
    if(currentPage == 1){
        content += '<nav style="float:right;margin-right:100px;" class="pagination-nav"><ul class="pagination pagination-sm">'+
            '<li class="disabled"><a href="javascript:;" aria-label="Previous">'+
            '<span aria-hidden="true">&laquo;</span>'+
            '</a></li>';
    }else{
        content += '<nav style="float:right;margin-right:100px;" class="pagination-nav"><ul class="pagination pagination-sm">'+
            '<li class="pre"><a href="#" aria-label="Previous">'+
            '<span aria-hidden="true">&laquo;</span>'+
            '</a></li>';
    }
    for(var i=0;i<(totalPage/5);i++){
        if((i*5)<totalPage && totalPage<=(i+1)*5){
            for(var j=i*5+1;j<=i*5+5 && j<=totalPage;j++){
                if(j==currentPage){
                    content += '<li class="active"><a href="javascript:;">'+j+'</a></li>';
                }else{
                    content += '<li class="pagination-number"><a href="javascript:;">'+j+'</a></li>';
                }
            }
        }
    }
    if(currentPage == totalPage){
        content += '<li class="disabled"><a href="#" aria-label="Next">'+
            '<span aria-hidden="true">&raquo;</span>'+
            '</a></li></ul></nav>';
    }else{
        content += '<li class="next"><a href="#" aria-label="Next">'+
            '<span aria-hidden="true">&raquo;</span>'+
            '</a></li></ul></nav>';
    }
    $(".main-wrapper").append(content);
};
