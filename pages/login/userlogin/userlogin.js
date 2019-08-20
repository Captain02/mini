
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "男",
    TabCur: "",
    TabData: ['注册信息','用户登录'],
    status: true
  },
  // 获取性别
  getSex(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      status: !this.data.status
    })
  },
  pushCon(e) {
    console.log(e)
    let username = e.detail.value.username
    let name = e.detail.value.name
    let password = e.detail.value.password
    let phone = e.detail.value.phone
    app.indexApi.bindUser(username, name, password, phone, this.data.sex).then(res => {
      if (!res.code) {
        wx.setStorageSync('token', res.token)
        wx.showToast({
          title: '注册成功！',
          success: function() {
            setTimeout(() => {
              wx.switchTab({
                url: '../../index/index',
              })
            }, 800)
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  },
  loginUser(e) {
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let data = {
      username, password
    }
    app.indexApi.userLogin(data).then(res => {
      if (!res.code) {
        wx.setStorageSync('token', res.token)
        wx.showToast({
          title: '登录成功！',
          success: function () {
            setTimeout(() => {
              wx.switchTab({
                url: '../../index/index',
              })
            }, 800)
          }
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      }
    })
  }
})