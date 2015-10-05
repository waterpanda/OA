/**
 * Created by Administrator on 2015/10/4 0004.
 */
$(function(){
    getAllDepart();
    deletedepart();
})
function getAllDepart(){
    //伪造数据
    var depart =
           [{"id":1,
            "deptname":"工程部",
            "deptphone":"12334",
            "deptfax":"12334",
            "deptleader":null,
            "deptgrade":2,
            "totalnum":100,
            "isTop":1,
            "superiordeptid":0,
            "describe":null,
            "createDate":1440858077000,
            "lastModifyDate":1440858081000},
            {"id":2,
                "deptname":"技术部",
                "deptphone":"12334",
                "deptfax":"12334",
                "deptleader":null,
                "deptgrade":3,
                "totalnum":100,
                "isTop":1,
                "superiordeptid":0,
                "describe":null,
                "createDate":1440858084000,
                "lastModifyDate":1440858086000},
            {"id":3,"deptname":"安检部",
                "deptphone":"12334",
                "deptfax":"12334",
                "deptleader":null,
                "deptgrade":1,
                "totalnum":100,
                "isTop":1,
                "superiordeptid":0,
                "describe":null,
                "createDate":1440858090000,
                "lastModifyDate":1440858092000}];


    // $.ajax({
    //     url:"/department/getDepartment",
    //     type:"GET",
    //     contentType:"application/json",
    //     success:function(data){
    //         if(data.status == 0){
    //           //  var departData = eval(data.body);
    var strHTML="";
    var departData = eval(depart);
    $.each(departData, function (index, el) {
        // var url = el.Obj ? el.Obj.url : '';  为空的处理
        strHTML += "<tr><td class='id' style='display: none'>+el.id +</td>";
        strHTML += "<td>" + el.deptname + "</td>";
        strHTML += "<td>" + el.deptphone + "</td>";
        strHTML += "<td>" + el.deptfax + "</td>";
        strHTML += "<td>" + el.deptleader + "</td>";
        strHTML += "<td>" + el.deptgrade + "</td>";
        strHTML += "<td class='totalnum' style='display: none'>" + el.totalnum + "</td>";
        strHTML += "<td class='isTop' style='display: none'>" + el.isTop + "</td>";
        strHTML += "<td class='superiordeptid' style='display: none'>" + el.superiordeptid + "</td>";
        strHTML += "<td>"+el.describe+"</td>";
        strHTML += "<td>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
        strHTML += "<td>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
        strHTML += "<td><button style='margin-bottom: 5px' class='modify-user btn btn-warning btn-sm'>修改</button><br/><button class='delect-user btn btn-danger btn-sm'>删除</button></td></tr>";
    })
    $("#all-depart-mes").html(strHTML);
    //          }
    //
    //      }
    //  })
}
//删除用户
function deletedepart(){
    $(document).on("click",".delect-user",function(){
        $('#myModal').modal('toggle');
        var thisID = $(this).parents("tr").children(".id").html();
        $(document).on("click","#confirm",function(){
            $.ajax({
                type: "DELETE",
                url: "/department/delete/" + thisID,
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
