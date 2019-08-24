const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textCon: ""
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  },
  saveCon(e) {
    this.setData({
      textCon: e.detail.value
    })
  },
  pushCon() {
    const userid = wx.getStorageSync('userid');
    const idx = wx.getStorageSync('actid');
    app.indexApi.addActCommment(userid,0, this.data.textCon, idx,0).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.data,
        })
      }
    })
  }
})