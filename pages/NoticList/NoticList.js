const app = getApp();
import {
  getDateTimeStamp,
  getDateDiff
} from "../../utils/mp-router/time.js";
var page = 1;
var arr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    showMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadNoticList()
  },
  // 加载通知列表
  loadNoticList() {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      duration: 1000,
      success: function() {
        app.indexApi.getNoticList(page, 10).then(res => {
          page++;
          if (res.code == 0) {
            if (res.data) {
              for (let i in res.data) {
                res.data[i].createtime = getDateTimeStamp(res.data[i].createtime);
                res.data[i].createtime = getDateDiff(res.data[i].createtime);
                arr.push(res.data[i]);
              }
              that.setData({
                listData: arr,
              })
            } else {
              that.setData({
                showMore: false,
              })
            }
            setTimeout(() => {
              wx.hideLoading()
            }, 500)
          }
        })
      }
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: './NoticDetail/NoticDetail?idx=' + e.currentTarget.dataset.idx,
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    page = 1;
    arr = []
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})