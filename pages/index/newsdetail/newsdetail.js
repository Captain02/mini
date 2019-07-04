const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsPage: {},
    imgUrl: app.indexApi.ImgUrl,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    id = parseInt(id);
    // 获取详情
    app.indexApi.getNewsDetail(id).then(res => {
      this.setData({
        newsPage: res.data[0],
        userInfo: res.data[0].user[0]
      })
    })
    app.indexApi.getNewsComment(id).then(res => {
      console.log(res)
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
    
  }
})