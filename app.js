import agriknow from '/api/api.js';
App({
  onLaunch: function () {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          });
        } else {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  // 首页api
  indexApi: new agriknow()
})
