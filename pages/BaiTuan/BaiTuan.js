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
    showMore: true,
    toggleDelay: false,
  },
  onLoad: function () {
  },
  onShow: function () {
    // 初始化页码
    page = 1;
    var that = this
    wx.showLoading({
      title: '请稍等..',
      success: function() {
        setTimeout(() => {
          that.loadData(1, 10, 'istrue');
        }, 300)
      }
    })
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
          showMore: true,
          toggleDelay: true
        })
        wx.hideLoading()
      } else {
        that.setData({
          showMore: false
        })
      }
    })

  },
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({ arr: [] })
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

  },
  onHide: function() {
    this.setData({
      arr: []
    })
  }
})