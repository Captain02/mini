const app = getApp();
var page = 1;
Page({
  data: {
    nowIdx: 0,
    topTar: ['推荐', '全部'],
    arr: [],
    isCard: true,
    nowpage: 1,
    imgUrl: app.indexApi.ImgUrl,
    showMore: true
  },
  onLoad: function () {
  },
  onShow: function () {
    this.loadData(1, 10, 'istrue');
  },
  loadData(page, size, scale) {
    var that = this;
    let arr = that.data.arr;
    app.indexApi.getBaituanList(page, size, scale).then(res => {
      let str = 'date'
      if (str in res) {
        for (let i in res.date) {
          arr.push(res.date[i])
        }
        that.setData({
          arr: arr,
          showMore: true
        })
      } else {
        that.setData({
          showMore: false
        })
      }
    })
  },
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    if (id == 0) {
      this.loadData(1, 10, 'istrue')
    } else {
      this.loadData(1, 10, 'isfalse')
    }
    this.setData({
      nowIdx: id,
      page: 1
    })
  },
  godetail(e) {
    let idx = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './BaiTuanDetail/BaiTuanDetail?id=' + idx,
    })
  },
  loadmore(e) {
    page++;
    if (this.data.nowIdx == 0) {
      this.loadData(page, 10, 'istrue')
    } else {
      this.loadData(page, 10, 'isfalse')
    }
  }
})