$(function () {
    //点击 “去登录”的链接 转到注册账号
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $('.login-box').show()
    })
    //点击 “去注册账号”的链接 转到 登录
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $('.reg-box').show()
    })
    // 从layui中获取from对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.ver)函数自定义校验规则
    form.verify({
        // 自定义了一个叫pwd校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需拿到密码框中的内容
            // 然后在进行一次等于的判断
            // 如果判断失败 则return 一个提示消息
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }
    })
    //   监注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        //阻止默认事件
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // console.log(res)
                return layer.msg(res.message)
            }
            layer.msg("注册成功")
            // 模拟点击转到登录页面
            $("#link_login").click()
        })
    })
    // 监听登录的提交事件
    $("#form_login").submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})