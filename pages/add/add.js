const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    modalName: "",
    textareaAValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.indexApi._baseUrl + '/sys/psersion/uploudpersionTopic')
    // 获取个人信息

  },
  onShow: function() {
    var token = wx.getStorageSync('token')
    if (!token) {
      wx.showToast({
        title: "请您重新登录",
        icon: 'none',
        success: function () {
          setTimeout(function () {
            wx.navigateTo({
              url: '../login/userlogin/userlogin',
            })
          }, 800)
        }
      })
    }
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (that.data.imgList.length != 0) {
          that.setData({
            imgList: that.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          that.setData({
            imgList: res.tempFilePaths
          })
          // 上传图片
          that.upload_file().then(res => {
            that.setData({
              imgId: res.id
            })
          })
        }
      }
    });
  },
  upload_file: function(i) {
    var Imgarr = []
    var that = this;
    return new Promise(function(resolve, reject) {
      var arrData = that.data.imgList
      wx.uploadFile({
        url: app.indexApi._baseUrl + '/sys/psersion/uploudpersionTopic',
        filePath: arrData[0],
        name: 'file',
        formData: {
          'token': wx.getStorageSync('token')
        }, // HTTP 请求中其他额外的 form data
        success: function(res) {
          if (JSON.parse(res.data).code == 0) {
            // up_imgarr.push(JSON.parse(res.data).data)
            wx.showToast({
              title: "图片上传成功",
              icon: 'success',
              duration: 700
            })
            resolve(JSON.parse(res.data).data)
          } else {
            reject(false)
            wx.showToast({
              title: JSON.parse(res.data).msg,
              icon: 'none',
              duration: 700,
            })
          }
        },
        fail: function(res) {
          reject(false)
        }
      })
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 发表内容
  userPushCon() {
    let con = this.data.textareaAValue;
    let imgArr = this.data.imgId
    app.indexApi.userPush(con, imgArr).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: '发表成功',
          icon: 'none',
          success: function() {
            setTimeout(function() {
              wx.switchTab({
                url: '../../pages/index/index',
              })
            }, 800)
          }
        })
      }
    })
  }
})