
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  pushCon(e) {
    console.log(e)
    let num = e.detail.value.userNum
    let pwd = e.detail.value.userPwd
    let data = {
      username: e.detail.value.userNum,
      password: e.detail.value.userPwd
    }
    app.indexApi.userLogin(data).then(res => {
      if (!res.code) {
        wx.setStorageSync('token', res.token)
        wx.showToast({
          title: '注册成功！',
          success: function() {
            setTimeout(() => {
              wx.switchTab({
                url: '../../index/index',
              })
            }, 800)
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
})