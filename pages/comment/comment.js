const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: Number,
    type: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showMore: true,
    actData: []
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
      app.indexApi.actComment(244, 1, 5).then(res => {
        if (res.code == 0) {
          this.setData({
            showMore: false
          })
        }
      })
    },
    loadNewsData() {
      app.indexApi.getNewsComment(244, 1, 5).then(res => {
        if (res.code == 0) {
          this.setData({
            showMore: false
          })
        }
      })
    },
    goComment() {
      wx.navigateTo({
        url: '../../commentview/commentview',
      })
    }
  }
})
