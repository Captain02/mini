const app = getApp();
import WxParse from '../../wxParse/wxParse.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    pageobj: {},
    modalName: false,
    ModalCon: "",
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
      var BaiTuan = res.date.descs;
      WxParse.wxParse('BaiTuan', 'html', BaiTuan, that, 5);
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  addJob() {
    let id = this.data.id;
    app.indexApi.addSheTuan(id, this.data.pageobj.deptid, this.data.pageobj.id).then(res => {
      this.setData({
        modalName: "Modal",
        ModalCon: res.data
      })
    }).catch(err => {
      this.setData({
        modalName: "Modal",
        ModalCon: "加入失败"
      })
    })
  },
  showMore() {
    const url = this.data.imgUrl + this.data.pageobj.bannerid;
    console.log(url)
    wx.previewImage({
      current: url, 
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  hideModal() {
    this.setData({
      modalName: false,
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