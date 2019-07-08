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
  good: function() {
    app.indexApi.clickGood(1, 1, 1).then(res => {
      console.log(res);
    })
  }
 
})