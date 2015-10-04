/**
 * Created by Administrator on 2015/9/30 0030.
 */
$(function(){
    getAlluser();
});
function getAlluser(){
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
  //     url:"/employee/query?pageSize=3&currentPage=1",
  //     type:"POST",
  //     contentType:"application/json",
  //     success:function(data){
  //         if(data.status == 0){
  //           //  var userData = eval(data.body);
                var strHTML="";
                var userData = eval(user);
                console.log(user);
                $.each(userData, function (index, el) {
                   // var url = el.pictureObj ? el.pictureObj.url : '';
                    strHTML += "<tr><td class='id' style='display: none'>+el.id +</td>";
                    strHTML += "<td class=userId' style='display: none'>" + el.userId+ "</td>";
                    strHTML += "<td><img class='headImg' src="+el.headimg+"></td>";
                    strHTML += "<td>" + el.realname + "</td>";
                    strHTML += "<td>" + el.sex + "</td>";
                    strHTML += "<td>" + el.empnumber + "</td>";
                    strHTML += "<td>" + format(el.birthday, 'yyyy-MM-dd ') + "</td>";
                    strHTML += "<td>" + el.mobilephone + "</td>";
                    strHTML += "<td>" + el.fixedphone + "</td>";
                    strHTML += "<td>" + el.email + "</td>";
                    strHTML += "<td>"+el.address+"</td>";
                    strHTML += "<td class='positionId' style='display: none'>+el.positionId +</td>";
                    strHTML += "<td class='departmentId' style='display: none'>+el.departmentId +</td>";
                    strHTML += "<td>" + el.grade + "</td>";
                    strHTML += "<td>" + el.note+ "</td>";
                    strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
                    strHTML += "<td><button style='margin-bottom: 5px' class='modify-product btn btn-warning btn-sm'>修改</button><button class='delect-product btn btn-danger btn-sm'>删除</button></td></tr>";
                })
                $("#all-user-mes").html(strHTML);

  //          }
//
  //      }
  //  })
}