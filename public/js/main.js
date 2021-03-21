$("document").ready(function(){
$('#btn_change_pass').click(function(){
    $('#pass_edit_panel').slideDown();
    $('#username_edit_panel').slideUp();
})
$('#btn_change_username').click(function(){
    $('#username_edit_panel').slideDown();
    $('#pass_edit_panel').slideUp();
})

$("#btn_pass_save").click(function(){
    $.ajax({
        url: `http://localhost:5000/api/user/update/pass`,
        method: "PUT",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            curr_password: $("#curr_password").val(),
            password: $("#password").val()
        }),
        success: function(data){
            console.log(data)
           if (data=="true"){
               alert("رمز عبور با موفقیت تغییر یافت")
               $("#curr_password").val("");
               $("#password").val("");
           }else{
               alert("رمز عبور فعلی صحیح نمی باشد")
               $("#curr_password").val("");
           }
        }
      });
})
$("#btn_username_save").click(function(){
    $.ajax({
        url: `http://localhost:5000/api/user/update/username`,
        method: "PUT",
        contentType: "application/json",
        dataType: "text",
        data: JSON.stringify({
            username: $("#username").val()
        }),
        success:(function(data){
            if (data=="true"){
                alert("نام کاربری با موفقیت تغییر یافت")
                $("#username").val("");
            }else{
                alert("خطا در تغییر نام کاربری")
                $("#username").val("");
            }
        })
      });
})
})