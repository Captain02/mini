const app = getApp();
Page({
  data: {
    PageCur: 'basics',
    userInfo: {},
    imgUrl: app.indexApi.ImgUrl,
    status: false,
    loginStatus: '未注册',
    modalName: ""
  },
  hideModal() {
    this.setData({
      modalName: ""
    })
  },
  makeModal() {
    this.setData({ modalName: ""});
    setTimeout(function() {
      wx.navigateTo({
        url: '../login/login',
      })
    }, 800)
  },
  onShow() {
    // 获取个人信息
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({modalName: ""})
          app.indexApi.getUser().then(res => {
            if (res.code == 0) {
              that.setData({
                status: true,
                userInfo: res.user,
                loginStatus: ''
              })
            } else {
              wx.showToast({
                title: "请您重新登录",
                icon: 'none',
                success: function() {
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '../login/userlogin/userlogin',
                    })
                  }, 800)
                }
              })
            }
          })
        } else {
          that.setData({
            modalName: "DialogModal"
          })
        }
      }
    })

  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  goAddUserInfo() {
    wx.navigateTo({
      url: '../../pages/login/userlogin/userlogin',
    })
  }
})