const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textCon: "",
    imgUrl: app.indexApi.ImgUrl,
    userInfo: {},
    itemCon: {},
    status: false,
    loadObj: {
      actid: Number,
      id: Number
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: options.status,
      loadObj: {
        actid: options.actid,
        id: options.id
      }
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
    // 获取详细信息
    this.getCommentDetail();
    // 判断是否登录
    this.getUserInfo()
  },
  // 获取详细评论
  getCommentDetail () {
    app.indexApi.actCommentDetail(this.data.loadObj.id, this.data.loadObj.actid).then(res => {
      if (res.code == 0) {
        this.setData({
          itemCon: res.date[0]
        })
      }
      console.log(res)
    })
  },
  // 获取个人信息
  getUserInfo() {
    app.indexApi.getUser().then(res => {
      if (res.code == 0) {
        this.setData({
          status: true,
          userInfo: res.user,
          loginStatus: ''
        })
      } else {
        wx.showToast({
          title: "您尚未登录，不能发表评论..",
          icon: 'none',
          success: function () {
            setTimeout(function () {
              wx.navigateTo({
                url: '../login/userlogin/userlogin',
              })
            }, 1000)
          }
        })
      }
    })
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
    const that = this;
    const userid = wx.getStorageSync('userid');
    const idx = wx.getStorageSync('actid');
    app.indexApi.addActCommment(userid, that.data.loadObj.id, that.data.textCon, idx, 
      that.data.loadObj.actid).then(res => {
        if (res.code == 0) {
          // 获取子集
          that.getCommentDetail()
          wx.showToast({
            title: res.data,
          })
        }
    })
  }
})