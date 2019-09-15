const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowCollegeindex: Number,
    collegetie: [],
    conName: "",
    arr: [],
    imgUrl: app.indexApi.ImgUrl,
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
    this.getXueYuan();
    this.loadData(1, 10, 'istrue');
  },

  // 社团名称
  conName(e) {
    this.setData({
      conName: e.detail.value
    })
  },
  getXueYuan() {
    app.indexApi.chooseXueY(1).then(res => {
      if (res.code === 0) {
        this.setData({
          college: res.data,
          nowCollegeindex: res.data[0].id,
          collegeName: res.data[0].value
        })
      }
    })
  },
  setCollege(e) {
    let idx = e.detail.value;
    const arr = this.data.college;
    this.setData({
      nowCollegeindex: idx,
      collegeName: arr[idx].value
    })
  },
  serchVal() {
    var that = this;
    const name = that.data.conName;
    const nowCollegeindex = that.data.nowCollegeindex;
    that.setData({arr: []})
    that.loadData(1, 10, 'istrue', name, nowCollegeindex);
  },
  loadData(page, size, scale, corname, corcollege) {
    var that = this;
    let arr = that.data.arr;
    wx.showLoading({
      title: '加载中...',
      mask: "true",
      success: function() {
        setTimeout(function () {
          app.indexApi.getBaituanList(page, size, scale, corname, corcollege).then(res => {
            let str = 'date'
            if (str in res) {
              for (let i in res.date) {
                arr.push(res.date[i])
              }
              that.setData({
                arr: arr,
                showMore: true,
                toggleDelay: true
              })
              wx.hideLoading()
            } else {
              that.setData({
                showMore: false
              })
            }
          })
          wx.hideLoading()
        }, 800)
      }
    })
  }
})