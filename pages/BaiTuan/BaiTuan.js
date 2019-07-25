const app = getApp();
Page({
  data: {
    nowIdx: 0,
    topTar: ['推荐', '全部'],
    arr: [],
    isCard: true,
    imgUrl: app.indexApi.ImgUrl
  },
  onLoad: function() {
    this.loadData(1, 10);
  },
  loadData(page, size) {
    var that = this;
    app.indexApi.getBaituanList(page, size).then(res => {
      if (res.date.length > 0) {
        that.setData({
          arr: res.date
        })
      }
    })
  },
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({
      nowIdx: id
    })
  },
})