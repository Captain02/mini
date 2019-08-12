const app = getApp();
Page({
  data: {
    PageCur: 'basics',
    userInfo: {},
    imgUrl: app.indexApi.ImgUrl,
    status: false,
    loginStatus: '未注册'
  },
  onShow() {
    // 获取个人信息
    app.indexApi.getUser().then(res => {
      if (res.code == 0) {
        this.setData({
          status: true,
          userInfo: res.user,
          loginStatus: ''
        })
      } else {
        app.indexApi.refreshToken().then(res => {
          console.log(res)
        })
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