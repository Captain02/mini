//app.js
App({

    data: {
        //是否联网
        isConnected:true
    },

    onLaunch: function () {
        //获取网络状态
        wx.getNetworkType({
            success: (res) => {
                console.log(res)
            }
        })

        // 监听网络变化
        wx.onNetworkStatusChange((res) => {
            this.data.isConnected = res.isConnected
            console.log(this.data.isConnected)
        })


    }

})
