const app = getApp();
import { getDateTimeStamp, getDateDiff } from "../../../utils/mp-router/time.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.indexApi.ImgUrl,
    userInfo: {},
    personId: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ personId: options.id }, wx.setStorageSync('personId', options.id));
    app.indexApi.userDetailed(options.id).then(res => {
      if (res) {
        res.data.createtime = getDateTimeStamp(res.data.createtime);
        res.data.createtime = getDateDiff(res.data.createtime);
        this.setData({
          userInfo: res.data
        })
      }
    })
  },
  goDetail() {
    this.setData({
      modalName: "DialogModal"
    })
  },
  textareaAInput(e) {
    this.setData({
      con: e.detail.value
    })
  },
  // 隐藏发布框
  hideModal(e) {
    this.setData({
      modalName: ""
    })
    if (e.currentTarget.dataset.makestatus) {
      this.pushCon()
    }
  },
  // 发布
  pushCon() {
    const userid = wx.getStorageSync('userid');
    const idx = wx.getStorageSync('personId');
    app.indexApi.personComment(userid, 0, this.data.con, idx, 0).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  // 点赞
  addPerLike(e) {
    let id = e.currentTarget.dataset.id;
    app.indexApi.addLike(id, 1).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.data,
        })
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
    app.globalData.personId = this.data.personId;
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