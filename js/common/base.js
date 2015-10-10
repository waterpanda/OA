window.prePath = "http://localhost:8081/oa";


navChange();


//登录后的标题栏显示

//$(".user-name").html(OA.loginName+"<span>|</span><a href='javascript:;'>退出</a>");

//点击导航进行界面跳转
function navChange() {
    $(" .second-nav li:eq(0)").click(function () {
        location.href = "../jl/addUser.html";
    });

    $(".second-nav li:eq(1)").click(function () {
        location.href = "../jl/addDepart.html";
    }).css("display","none");
    $(".second-nav li:eq(2)").click(function () {
        location.href = "../jl/userManage.html";
    });
    $(" .second-nav li:eq(3)").click(function () {
        location.href = "../jl/departmentManage.html";
    });
    $(" .second-nav li:eq(4)").click(function () {
        location.href = "../jl/boardManage.html";
    });
    $(" .second-nav li:eq(5)").click(function () {
        location.href = "../jl/rulesManage.html";
    })

}


//退出登录
$(".user-name a").click(function() {
    $.ajax({
        url: "/sms/staff/showOneStaff.do?id=" + SMS.userId,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: function (userdata) {
            if (userdata.status == 12) {
                var message = eval(userdata.body);
                var loginoutData = {
                    id: message.id,
                    userName: message.name,
                    loginName: message.loginName,
                    password: message.password,
                    weixinNumber: message.weixinNumber,
                    rank: message.rank,
                    jobNumber: message.jobNumber
                }
                $.ajax({
                    url: "/sms/staff/logout.do",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(loginoutData),
                    success: function (data) {
                        if (data.status == 12) {
                            alert("退出登录！")
                            location.href = "login.html";
                            //清除本地储存
                            sessionStorage.clear();
                        }
                    }
                })
            }
        }
    })
})
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
	    	'<li class="pre"><a href="javascript:;" aria-label="Previous">'+
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
		content += '<li class="disabled"><a href="javascript:;" aria-label="Next">'+
        	'<span aria-hidden="true">&raquo;</span>'+
      		'</a></li></ul></nav>';
	}else{
		content += '<li class="next"><a href="javascript:;" aria-label="Next">'+
        	'<span aria-hidden="true">&raquo;</span>'+
      		'</a></li></ul></nav>';
	}
	$(".all-tasks").append(content);
}

/*
 用途：检查输入字符串是否为空或者全部都是空格
 输入：str
 返回：如果全是空返回true,否则返回false
 */
function isNull( str ){
    if ( str == "" ) {
        return true;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
};
/*
 用途：检查输入字符串是否符合正整数格式
 输入：s：字符串
 返回：如果通过验证返回true,否则返回false
 */
function isNumber( s ){
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != - 1) {
        return true;
    }
    else {
        return false;
    }
};
//获取字符串的长度
function getLength(str) {
    return str.replace(/[^\x00-xff]/g,"xx").length;
}
//转换时间的函数 调用形式 format(时间变量, 'yyyy-MM-dd HH:mm:ss')
function format(time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
