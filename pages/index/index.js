//index.js
import Page from '../../components/helpers/wxPage.js'

Page({
    data: {},
    onLoad: function (options) {
        // this.message({
        //     message:"测试",
        //     duration:10 * 1000
        // })
        this.$api.login({
            username:"admin",
            password:"admin"
        })
        // this.$api.notToken()
        // this.$api.userInfo()
        // this.$api.corporationGetListPage({})
        // this.$api.logout({
        //     username:"admin",
        // })
    },
    onTap() {

    },
    onUnload: function () {

    }
})
