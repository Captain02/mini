import agriknow from '/api/api.js';
App({
  onLaunch: function () {

  },
  // 首页api
  indexApi: new agriknow(),
  globalData: {
    actId: null,
    personId: null
  }
})
