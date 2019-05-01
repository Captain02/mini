const SENDSMS = Behavior({
    //混入
    behaviors: [],

    properties: {},

    data: {
        // 发送验证码的剩余时间
        sendCodeTime: 0,
        // 发送验证码显示的文字
        sendCodeInfo: '获取验证码'
    },

    //生命周期
    lifetimes: {},

    methods: {
        // 更新发送验证码文字
        updateSendCodeInfo(time) {
            if (this.timer) {
                return
            }
            this.data.sendCodeTime = !!time ? time : 60
            this.generateCodeInfo()
            this.timer = setInterval(() => {
                if (this.data.sendCodeTime > 0) {
                    this.data.sendCodeTime--
                    this.generateCodeInfo()
                } else {
                    this.setData({
                        sendCodeInfo: '获取验证码'
                    })
                    clearInterval(this.timer)
                    //手动赋值
                    // 原因clearInterval(this.timer) 之后 if(this.timer)为true 不向下执行
                    this.timer = 0
                }
            }, 1000)
        },
        //刷新验证码
        generateCodeInfo(language) {
            let sendCodeInfo = this.data.sendCodeTime + 's后重新获取'
            this.setData({
                sendCodeInfo
            })
        },
        // //验证手机号 验证成功放回 true 失败 false
        // validatePhoneNumber(phoneNumber){
        //     if (!validate("phoneNumber", phoneNumber)) {
        //         ToastFailed('请输入正确的手机号')
        //         return false
        //     }
        //     return true
        // },
    }
})
export {
    SENDSMS
}
