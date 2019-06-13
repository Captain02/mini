//app.js
import {store} from "./utils/store/myStore";
const licia = require('miniprogram-licia');
let app
App({

    data: {
        //是否联网
        isConnected:true,

    },
    globalData: {},
    store: store,
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
    },
    onError(err){
        console.log(err)
    },
    clearMessage(){
        clearMessage()
    }
})
//10秒自动清空message
const clearMessage = licia.debounce(() => {
    console.log("清空message")
    // 获取当前页面栈
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    currPage.setState({
        message:[]
    })
}, 10 * 1000)
