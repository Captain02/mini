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
    app.indexApi.getUser().then(res => {
      if (res.code == 0) {
        that.setData({
          status: true,
          userInfo: res.user,
          loginStatus: ''
        })
      } else {
        wx.showModal({
          title: '未登录',
          content: '请您进行注册/登陆',
          success: function(res) {
            if (res.confirm) {
              setTimeout(function () {
                wx.navigateTo({
                  url: '../login/userlogin/userlogin',
                })
              }, 500)
            }
          }
        })
      }
    })
    // wx.getSetting({
    //   success: function (res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       that.setData({modalName: ""})

    //     } else {
    //       that.setData({
    //         modalName: "DialogModal"
    //       })
    //     }
    //   }
    // })

  },

  personClass() {
    wx.showToast({
      title: '暂无开放,敬请期待',
      icon: 'none'
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