const app  = getApp()
import WxParse from '../../wxParse/wxParse.js';
import { getDateTimeStamp, getDateDiff } from "../../../utils/mp-router/time.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actId: Number,
    pageCon: {},
    modalName: "",
    con: "",
    imgUrl: app.indexApi.ImgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actId: options.actid
    })
    wx.setStorageSync('actid', options.actid)
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
    const that = this
    let actId = that.data.actId
    app.globalData.actId = actId;
    app.indexApi.userAcDetail(actId).then(res => {
      if (res.code == 0) {
        if (res.date.deptname == null || res.date.deptname == "") {
          res.date.deptname = ""
          console.log('aa')
        }
        res.date.createtime = getDateTimeStamp(res.date.createtime)
        res.date.createtime = getDateDiff(res.date.createtime)
        that.setData({
          pageCon: res.date
        })
        var article = res.date.actdetails;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
      console.log(res)
    })
  },
  goDetail() {
    this.setData({
      modalName: "DialogModal"
    })
  },
  hideModal(e) {
    this.setData({
      modalName: ""
    })
    if (e.currentTarget.dataset.makestatus) {
      this.pushCon()
    }
  },
  textareaAInput(e) {
    this.setData({
      con: e.detail.value
    })
  },
  // 发布
  pushCon() {
    const userid = wx.getStorageSync('userid');
    const idx = wx.getStorageSync('actid');
    app.indexApi.addActCommment(userid, 0, this.data.con, idx,0).then(res => {
        if (res.code == 0) {
          wx.showToast({
            title: res.data,
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

  }
})