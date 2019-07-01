//index.js
const app = getApp();
Page({
  data: {
    nowIdx: 0,
    topTar: ['用户发布','活动新闻'],
    listNews: [],
    imgUrl: app.indexApi.ImgUrl
  },
  onLoad: function(options) {
    const that = this;
    that.loadNewsList()
  },
  // 加载新闻列表
  loadNewsList: function() {
    app.indexApi.getNews().then(res => {
      if (res.data.length > 0) {
        this.setData({
          listNews: res.data
        })
      }
    })
  },
  // 切换tab
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({
      nowIdx: id
    })
  },
  // 进入用户发布信息页面
  goUserInfo() {
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo',
    })
  }
})
