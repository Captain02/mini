const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    pageobj: {},
    imgUrl: app.indexApi.ImgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
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
    var that = this;
    let idx = that.data.id;
    app.indexApi.getSheTuanDetail(idx).then(res => {
      if (res.code == 0) {
        that.setData({
          pageobj: res.date
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  addJob() {
    let id = this.data.id;
    app.indexApi.addSheTuan(id).then(res => {
      wx.showToast({
        title: '提交成功',
      })
    }).catch(err => {
      wx.showToast({
        title: '加入失败',
        icon: 'none'
      })
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})