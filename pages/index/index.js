//index.js
const app = getApp();
import { getDateTimeStamp, getDateDiff } from "../../utils/mp-router/time.js";
Page({
  data: {
    nowIdx: 0,
    topTar: ['用户发布','活动新闻'],
    listNews: [],
    pushlist: [],
    imgUrl: app.indexApi.ImgUrl,
  },
  onLoad: function(options) {
    const that = this;
    that.loadNewsList();
    that.loadUsreList();
  },
  // 加载新闻列表
  loadNewsList: function() {
    app.indexApi.getNews().then(res => {
      if (res.data.length > 0) {
        for (let i in res.data) {
          res.data[i].createtime = getDateTimeStamp(res.data[i].createtime);
          res.data[i].createtime = getDateDiff(res.data[i].createtime);
        }
        this.setData({
          listNews: res.data
        })
      }
    })
  },
  // 加载用户发布列表
  loadUsreList: function () {
    app.indexApi.userPush(1,10).then(res => {
      if (res.data.length > 0) {
        for (let i in res.data) {
          res.data[i].createtime = getDateTimeStamp(res.data[i].createtime);
          res.data[i].createtime = getDateDiff(res.data[i].createtime);
        }
        this.setData({
          pushlist: res.data,
        })
      }
    })
  },
  // 切换tab
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({
      nowIdx: id
    })
  },
  // 进入用户发布信息页面
  goUserInfo() {
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo'
    })
  },
  godetail(e) {
    let newsid = e.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: './newsdetail/newsdetail?id=' + newsid,
    })
  },
  gocard(e) {
    let userid = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: './pushdetail/pushdetail?id=' + userid
    })
  }
})
