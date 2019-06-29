import agriknow from '/api/api.js';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  },
  // 首页api
  indexApi: new agriknow()
})
