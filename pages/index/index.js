//index.js
import Page from '../../helpers/wxPage.js'

Page({
  data: {
    nowIdx: 0,
    topTar: ['用户发布','活动新闻']
  },
  onLoad: function(options) {
      let data = this.router.extract(options)
      this.event.on('DataChanged', this, function(data) {
          this.setData({
              motto: data
          });
      })
  },
  onTap(){
    this.router.push({
        name:"test"
    })
  },
  onUnload: function() {
      this.event.remove('DataChanged', this);
  },
  // 切换tab
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({
      nowIdx: id
    })
  },
  // 进入用户发布信息页面
  goUserInfo: function() {
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo',
    })
  }
})
