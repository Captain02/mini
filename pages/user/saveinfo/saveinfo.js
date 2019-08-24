const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgUrl: app.indexApi.ImgUrl,
    collegetie: [],
    college: [],
    sex: '',
    imgId: "",
    imgData: "",
    filed: "",
    ModalCon: "",
    modalName: "",
    textCon: "",
    collegeName: "",
    collegetieName: "",
    nowCollegeindex: 0,
    nowCollegetieindex: 0
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
    // 获取个人信息
    this.getUserInfo()
    // 加载学院专业下拉
    this.getXueYuan()
  },
  ChooseImage() {
    var that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        that.setData({
          imgData: res.tempFilePaths[0]
        })
        that.upload_file(res.tempFilePaths[0]);
      }
    });
  },
  // 更换头像
  upload_file: function(file) {
    var that = this
    wx.uploadFile({
      url: app.indexApi._baseUrl + '/sys/psersion/uploudpersionTopic',
      filePath: file,
      name: 'file',
      formData: {
        'token': wx.getStorageSync('token')
      }, // HTTP 请求中其他额外的 form data
      success: function(res) {
        if (JSON.parse(res.data).code == 0) {
          wx.showToast({
            title: "图片上传成功",
            icon: 'success',
            duration: 700
          })
          var data = JSON.parse(res.data).data
          that.setData({
            filed: data.id
          })
        } else {
          wx.showToast({
            title: JSON.parse(res.data).msg,
            icon: 'none',
            duration: 700,
          })
        }
      },
      fail: function(res) {}
    })
  },
  // 设置性别
  setSex(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // 获取学院
  getXueYuan() {
    app.indexApi.chooseXueY(1).then(res => {
      if (res.code === 0) {
        this.setData({
          college: res.data,
          collegeName: res.data[0].value
        })
        this.getCollegetie(res.data[0].id)
      }
    })
  },
  // 获取专业
  getCollegetie(idx) {
    app.indexApi.chooseCol(2, idx).then(res => {
      if (res.code === 0) {
        this.setData({
          collegetie: res.data,
          collegetieName: res.data[0].value
        })
      }
    })
  },
  // 设置学院
  setCollege(e) {
    let idx = e.detail.value;
    const arr = this.data.college;
    this.setData({
      nowCollegeindex: idx,
      collegeName: arr[idx].value
    })
    this.getCollegetie(arr[idx].id)
  },
  setCollegetie(e) {
    this.setData({
      nowCollegetieindex: e.detail.value,
      collegetieName: this.data.collegetie[e.detail.value].value
    })

  },
  // 完善信息
  pushCon(e) {
    var that = this
    const {
      email,
      wx,
      QQ,
      name,
      phone,
      textCon
    } = e.detail.value;

    app.indexApi.updateUser(
      that.data.filed,
      email, phone, wx, QQ, that.data.collegeName, that.data.collegetieName, textCon,
      that.data.userInfo.name,
    ).then(res => {
      that.setData({
        modalName: e.currentTarget.dataset.target,
        ModalCon: res.msg
      })
      setTimeout(function() {
        that.hideModal();
      }, 800)
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 获取个人信息
  getUserInfo() {
    // 获取个人信息
    app.indexApi.getUser().then(res => {
      if (res.code == 0) {
        this.setData({
          userInfo: res.user,
          imgUrl: this.data.imgUrl + res.user.headpath
        })
        if (res.user.college) {
          this.setData({
            collegeName: res.user.college,
            collegetieName: res.user.collegetie,
          })
        } 
      } else {
        app.indexApi.refreshToken().then(res => {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        })
      }
    })
  },

})