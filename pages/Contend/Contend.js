const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowpage: 1,
    showMore: true,
    actCon: [],
    toggleDelay: false,
    imgUrl: app.indexApi.ImgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadActive(10, 1);
  },
  // 获取活动列表
  loadActive: function (size, page) {
    var that = this;
    var actCon = that.data.actCon;
    app.indexApi.userActList(size, page).then(res => {
      let str = 'date'
      if (str in res) {
        for (let i in res.date) {
          actCon.push(res.date[i])
        }
        that.setData({
          actCon: actCon,
          showMore: true
        })
      } else {
        that.setData({
          showMore: false
        })
      }
    })
  },
  goActDetail(e) {
    let actid = e.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/Contend/detail/contendetail?actid=' + actid
    })
  },
  loadmore(e) {
    var that = this;
    page++;
    this.loadActive(5, page)
    that.setData({
      toggleDelay: true
    })
    setTimeout(function () {
      that.setData({
        toggleDelay: false
      })
    }, 1000)
  }
})