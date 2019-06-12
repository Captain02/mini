//index.js
import Page from '../../helpers/wxPage.js'

Page({
  data: {
    nowIdx: "0",
    topTar: ['用户发布','活动新闻']
  },
  onLoad: function(options) {
      let data = this.router.extract(options)
      console.log(data)
      console.log(options.c)
      console.log(options.d)
      console.log(this.event)
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
  tarClick(e) {
    console.log(e)
    let id = e.currentTarget.dataset.nowid;
    console.log(id)
    this.setData({
      nowIdx: id
    })
  }
})
