// 获取用户的基本信息
$(function () {
    getUserInfo()
    // 提示用户是否确认退出
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on("click", function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})
// 
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户的信息失败")
            }
            // console.log(res);
            // 调用了renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // 控制用户的访问权限
        // 在调用jQuery的ajax请求 无论成功还是失败 都会调用complete回调函数
        // complete: function (res) {
        //     // console.log('执行了complete回调：')
        //     // console.log(res)
        //     // 在complete回调函数中 可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清除token 
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}