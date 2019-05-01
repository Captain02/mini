// pages/test/index.js
import Page from '../../helpers/wxPage.js'

Page({

    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.router)

        this.event.emit('DataChanged', 'Log-Page-Btn-Press');

        // this.router.push({
        //     name:"index",
        //     data:{
        //         a:"123",
        //         b:"234"
        //     },
        //     query:{
        //         c:"345",
        //         d:"456"
        //     },
        //     success:()=>{
        //         console.log("跳转成功")
        //     }
        // });


    },

})
