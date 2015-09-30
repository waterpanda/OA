/**
 * Created by Administrator on 2015/9/30 0030.
 */
$(function(){

})();
function getAlluser(){
    $.ajax({
        url:"api/user/login?",
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(user),
        success:function(data){

            if(data.status == 0){
                var json = eval(data.body);
                sessionStorage.userId = json.id;
                var userName = json.name;
                location.href="index.html";

            }
            if(data.status == 7){
                $("#login-model .modal-body p").html("用户不存在！");
                $("#login-model").modal("toggle");
                return null
            };
            if(data.status == 9){
                $("#login-model .modal-body p").html("密码不正确!");
                $("#login-model").modal("toggle");
                return null;
            }
            if(data.status == 10){
                $("#login-model .modal-body p").html("验证码错误!");
                $("#login-model").modal("toggle");
                return null;
            }
        }
    })
}