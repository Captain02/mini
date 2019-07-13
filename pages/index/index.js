//index.js
const app = getApp();
import { getDateTimeStamp, getDateDiff } from "../../utils/mp-router/time.js";
Page({
  data: {
    nowIdx: 0,
    topTar: ['校园圈','校园新闻'],
    listNews: [],
    pushlist: [],
    imgUrl: app.indexApi.ImgUrl,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563040353902&di=e19dcb234d885660ea2788d678f0242a&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FM7HHGCYwSh9HSbjALBJKlg%3D%3D%2F1147010530113851225.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563040353902&di=e19dcb234d885660ea2788d678f0242a&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FM7HHGCYwSh9HSbjALBJKlg%3D%3D%2F1147010530113851225.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563040353902&di=e19dcb234d885660ea2788d678f0242a&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FM7HHGCYwSh9HSbjALBJKlg%3D%3D%2F1147010530113851225.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563040353902&di=e19dcb234d885660ea2788d678f0242a&imgtype=0&src=http%3A%2F%2Fimg2.ph.126.net%2FM7HHGCYwSh9HSbjALBJKlg%3D%3D%2F1147010530113851225.jpg'
    }],
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: '板块一'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '板块二'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '板块三'
    }],
    gridCol: 3,
    skin: false
  },
  onLoad: function(options) {
    const that = this;
    that.loadNewsList();
    that.loadUsreList();
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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
  },
  goadd() {
    wx.navigateTo({
      url: '/pages/add/add'
    })
  }
})
