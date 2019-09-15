const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tabCon: ['全部','录用', '不录用', '面试', '笔试', '未处理'],
    ConData: []
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
    this.getStatusCon("");
  },
  getStatusCon(e) {
    let status = e;
    app.indexApi.getMassStatus(status).then(res => {
      if (res.code == 0) {
        this.setData({
          ConData: res.data
        })
      }
    })
  },
  tabSelect(e) {
    let id = e.currentTarget.dataset.id;
    if (id == 0) id = "";
    this.getStatusCon(id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  }
})