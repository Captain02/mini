const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: Boolean,
    id: Number,
    type: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    showMore: true,
    showPerMore: true,
    actData: [],
    imgUrl: app.indexApi.ImgUrl,
    personData: []
  },
  ready: function () {
    var that = this;
    // 加载社团活动评论
    if (that.properties.type == "act") {
      that.loadActData()
    } else {
      that.loadNewsData();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadActData() {
      const id = app.globalData.actId;
      app.indexApi.actComment(id, 1, 5).then(res => {
        if (res.code == 0 && res.date.length > 0) {
          this.setData({
            actData: res.date
          })
        } else {
          this.setData({
            showMore: false
          })
        }
      })
    },
    loadNewsData() {
      const id = app.globalData.personId;
      app.indexApi.getPersonComment(id, 1, 5).then(res => {
        if (res.code == 0 && res.data.length > 0) {
          this.setData({
            personData: res.data
          })
        } else {
          this.setData({
            showPerMore: false
          })
        }
      })
    },
    goComment(e) {
      console.log(e)
      const { actid, id } = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../../commentview/commentview?actid=' + actid + '&id=' + id + '&status=' + true,
      })
    },
    goDetail(e) {
      wx.navigateTo({
        url: '../../commentview/commentview?status=' + false,
      })
    },
    goPerson(e) {
      wx.navigateTo({
        url: '../../commentview/commentview',
      })
    }
  }
})
