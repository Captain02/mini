//index.js
const app = getApp();
import { getDateTimeStamp, getDateDiff } from "../../utils/mp-router/time.js";
Page({
  data: {
    nowIdx: 0,
    topTar: ['校园圈','校园新闻'],
    listNews: [],
    actCon: [],
    pushlist: [],
    imgUrl: app.indexApi.ImgUrl,
    cardCur: 0,
    swiperList: [],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '社团'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '争鸣'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '优惠'
    }],
    gridCol: 3,
    skin: false
  },
  onShow: function(options) {
    var that = this;
    that.loadNewsList();
    that.loadUsreList();
    // 获取banner
    app.indexApi.getBanner().then(res => {
      let arr = [];
      if (res.data.length > 0) {
        for (let i in  res.data) {
          let obj = {}
          res.data[i].filepath = app.indexApi.ImgUrl + res.data[i].filepath;
          obj.url = res.data[i].filepath;
          arr.push(obj);
        }
        that.setData({
          swiperList: arr
        })
     }
    })
    // 获取活动新闻
    that.loadActive(0,1);
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  
  // 获取活动列表
  loadActive: function() {
    var that = this;
    app.indexApi.userActList(5,1).then(res => {
      if (res.date.length > 0) {
        that.setData({
          actCon: res.date
        })
      }
    })
  },
  goPage(e) {
    let type = e.currentTarget.dataset.id
    if (type == 0 ) {
      wx.switchTab({
        url: '../../pages/BaiTuan/BaiTuan',
      })
    } else if (type == 1) {
      wx.switchTab({
        url: '../../pages/Contend/Contend',
      })
    } else {
      wx.showToast({
        title: '暂未开发，请耐心等待',
        icon: 'none'
      })
    }
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
    app.indexApi.userPushList(10,1).then(res => {
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
  },
  goadd() {
    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  goActDetail(e) {
    let actid = e.currentTarget.dataset.actid;
    wx.navigateTo({
      url: '/pages/Contend/detail/contendetail?actid=' + actid
    })
  }
})
