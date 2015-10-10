/**
 * Created by Administrator on 2015/10/4 0004.
 */
$(function(){
    addDepartment();//添加部门
    getAllDepart();
    deleteDepart();
    modifyDepart();
})
function addDepartment(){
    $("#add-department").click(function(){
        location.href = "addDepart.html";
    })
}
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
        // var url = el.Obj ? el.Obj.url : '';  //为空的处理
        strHTML += "<tr><td class='id' style='display: none'>"+el.id +"</td>";
        strHTML += "<td class='deptname'>" + el.deptname + "</td>";
        strHTML += "<td class='deptphone'>" + el.deptphone + "</td>";
        strHTML += "<td class='deptfax'>" + el.deptfax + "</td>";
        strHTML += "<td class='deptleader'>" + el.deptleader + "</td>";
        strHTML += "<td class='deptgrade'>" + el.deptgrade + "</td>";
        strHTML += "<td class='totalnum' style='display: none'>" + el.totalnum + "</td>";
        strHTML += "<td class='isTop' style='display: none'>" + el.isTop + "</td>";
        strHTML += "<td class='superiordeptid' style='display: none'>" + el.superiordeptid + "</td>";
        strHTML += "<td class='describe'>"+el.describe+"</td>";
        strHTML += "<td class='createDate'>"+ format(el.createDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
        strHTML += "<td class='lastModifyDate'>"+ format(el.lastModifyDate, 'yyyy-MM-dd HH:mm:ss')+"</td>"
        strHTML += "<td><button style='margin-bottom: 5px' class='modify-depart btn btn-warning btn-sm'>修改</button><br/><button class='delect-depart btn btn-danger btn-sm'>删除</button></td></tr>";
    })
    $("#all-depart-mes").html(strHTML);
    //          }
    //
    //      }
    //  })
}
//删除用户
function deleteDepart(){
    $(document).on("click",".delect-depart",function(){
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
//修改
function modifyDepart(){
    $("#go-back-modify").click(function(){
        //强制刷新当前页面
        window.location.reload();
    });
    $(document).on("click",".modify-depart",function(){
        $(".first-wrapper").hide();
        $(".second-wrap").show();
        //获取部门的各种参数
        var id = $(this).parents("tr").children(".id").html();
        var deptname = $(this).parents("tr").children(".deptname").html();
        var deptphone = $(this).parents("tr").children(".deptphone").html()?$(this).parents("tr").children(".deptphone").html():"";
        var deptfax = $(this).parents("tr").children(".deptfax").html()?$(this).parents("tr").children(".deptfax").html():" ";
        var describle = $(this).parents("tr").children(".describle").html()?$(this).parents("tr").children(".describle").html():"";

        $("#realname").val(deptname) ;
        $("#deptphone").val(deptphone);
        $("#empnumber").val(deptfax );
        $("#describle").val(describle);

        //提交修改
        $("#second-submit").click(function(e){
            e.preventDefault();//阻止默认事件
            e.stopPropagation();//组织冒泡
            var data = {
                id: id,
                deptname:$("#realname").val(),
                deptphone:$("#deptphone").val(),
                deptfax:$("#empnumber").val(),
                describle:$("#describle").val()
            }

            $.ajax({
                url:"/OA/department/update",
                type:"POST",
                contentType:"application/json",
                data:JSON.toString(data),
                success:function(data) {
                    if (data.status == 0) {
                        //更改成功，强制刷新界面
                        window.location.reload();
                    }
                    }
                })
        })
    })
}
