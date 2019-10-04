import request from './http.js'
const formHead = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Authorization": wx.getStorageSync('token')
}
class agriknow {
  constructor() {
    this._baseUrl = 'https://www.btzmpro.com:8082/HBOFRONT'
    this.ImgUrl = 'http://47.105.58.149:82'
    this._defaultHeader = {
      "Authorization": wx.getStorageSync('token'),
      'Content-Type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }
  // 用户登录
  userLogin(data) {
    return this._request.postTwoRequest(this._baseUrl + '/api/sys/login', data, formHead).then(res => res.data)
  }

  // 新闻列表
  getNews(currPage = 1, pageSize = 10) {
    let data = {
      currPage: currPage,
      pageSize: pageSize
    }
    return this._request.getRequest(this._baseUrl + '/sys/news/list', data).then(res => res.data)
  }
  // 刷新token
  refreshToken() {
    return this._request.getRequest(this._baseUrl + '/api/sys/refreshToken').then(res => res.data)
  }
  // 社团列表
  getBaituanList(currPage = 1, pageSize = 10, scale, corname, corcollege  ) {
    let data = {
      currPage: currPage,
      pageSize: pageSize,
      scale: scale,
      corname: corname,
      corcollege: corcollege
    }
    return this._request.getRequest(this._baseUrl + '/corporation/getListPage', data).then(res => res.data)
  }

  // 首页轮播
  getBanner() {
    return this._request.getRequest(this._baseUrl + '/getBanner').then(res => res.data)
  }

  /**
   * 获取新闻详情
   */
  getNewsDetail(id) {
    let data = {
      id: id
    }
    return this._request.getRequest(this._baseUrl + '/sys/news/getNewsDetail', data).then(res => res.data)
  }
  /**
   * 新闻评论列表
   */
  getNewsComment(topicid, currPage = 1, pageSize = 10) {
    let data = {
      topicid: topicid,
      currPage: currPage,
      pageSize: pageSize
    }
    return this._request.getRequest(this._baseUrl + '/sys/news/getNewsReplice', data).then(res => res.data)
  }

  // 新闻点赞
  clickGood(type, userid, topicid) {
    let data = {
      type,
      userid,
      topicid
    }
    return this._request.postRequest(this._baseUrl + '/sys/news/likeTopic', data).then(res => res.data)
  }


  // 新闻评论点赞
  /**
   * type 1 点赞 0 取消
   * 用户id
   */
  clickNewsGood(type, userid, repliesid) {
    let data = {
      type,
      userid,
      topicid
    }
    return this._request.postRequest(this._baseUrl + '/sys/news/likereplies', data).then(res => res.data)
  }


  // 发表新闻评论
  /**
   * 评论人
   * 父评论（第一层用0）
   * 主题id
   * 回复内容
   * 被回复人id
   */
  pushComment(userid, parentid, topicid, repliescontent, repliesuserid) {
    let data = {
      userid,
      parentid,
      topicid,
      repliescontent,
      repliesuserid
    }
    return this._request.postTwoRequest(this._baseUrl + ' /sys/news/replies', data).then(res => res.data)
  }

  /***************用户发布*************** */
  // 用户发布列表
  userPushList(pageSize, currPage) {
    let data = {
      pageSize,
      currPage
    }
    return this._request.getRequest(this._baseUrl + '/sys/psersion/persionTopic', data).then(res => res.data)
  }
  // 用户发布详情
  userDetailed(topicid) {
    let data = {
      topicid
    }
    return this._request.getRequest(this._baseUrl + '/sys/psersion/getDetailed', data).then(res => res.data)
  }
  // 获取朋友圈评论列表
  getPersonComment(topicid, currPage = 1, pageSize = 10) {
    let data = {
      pageSize,
      currPage,
      topicid
    }
    return this._request.getRequest(this._baseUrl + '/sys/psersion/getReplies', data).then(res => res.data)
  }
  // 用户发布帖子
  userPush(content, imageid) {
    let data = {
      token: wx.getStorageSync('token'),
      content,
      userid: wx.getStorageSync('userid'),
      imageid
    }
    return this._request.postRequest(this._baseUrl + '/sys/psersion/releaseTopic', data, {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }
  // 朋友圈发布评论
  personComment(userid, parentid, reolicecontent, topicid, repliceid) {
    let data = {
      userid: wx.getStorageSync('userid'),
      parentid,
      reolicecontent,
      topicid,
      repliceid
    }
    return this._request.postRequest(this._baseUrl + '/sys/psersion/replies', data, {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }
  // 朋友圈点赞
  addLike(topicid, type) {
    let data = {
      userid: wx.getStorageSync('userid'),
      topicid,
      type
    }
    return this._request.getRequest(this._baseUrl + '/sys/psersion/likepersionTopic', data).then(res => res.data)
  }
  // 社团活动列表
  userActList(pageSize, currPage) {
    let data = {
      pageSize,
      currPage
    }
    return this._request.getRequest(this._baseUrl + '/contention/getListPage', data).then(res => res.data)
  }
  // 社团活动详情
  userAcDetail(actid) {
    let data = {
      actid
    }
    return this._request.getRequest(this._baseUrl + '/contention/getCoractivity', data).then(res => res.data)
  }
  // 发表活动评论
  // userid发布人
  // parentid父id
  // repliescontent内容
  // topicid主题id
  // repliesuserid被回复人的id
  addActCommment(userid, parentid, repliescontent, topicid, repliesuserid) {
    let data = {
      userid,
      parentid,
      repliescontent,
      topicid,
      repliesuserid
    }
    return this._request.postTwoRequest(this._baseUrl + '/bbs_like/addReplies', data, {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }


  // 活动评论列表
  actComment(topicid, currPage = 1, pageSize = 10, parentid=0 ) {
    let data = {
      pageSize,
      currPage,
      topicid,
      parentid
    }
    return this._request.getRequest(this._baseUrl + '/contention/repliesList', data).then(res => res.data)
  }
  // 活动评论详情
  actCommentDetail(id, topicid, currPage = 1, pageSize = 10) {
    let data = {
      id,
      pageSize,
      currPage,
      topicid
    }
    return this._request.getRequest(this._baseUrl + '/contention/getRepliesListByid', data).then(res => res.data)
  }

  // 保存用户信息
  saveUserInfo(data) {
    const {
      nickName,
      gender
    } = data
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/saveuserwehartinfo', {
      nickName,
      gender
    }).then(res => res.data)
  }
  // 绑定用户信息
  // 'mobile':手机,'gender':行吧,'name':姓名,'password':密码,'username':学号,}
  bindUser(username, name, password, mobile, gender) {
    let data = {
      username,
      name,
      password,
      mobile,
      gender
    }
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/addPersion', data, {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }
  // 获取用户信息
  getUser() {
    return this._request.getRequest(this._baseUrl + '/api/getuserInfo', {},{
      "Authorization": wx.getStorageSync('token'),
    } ).then(res => res.data)
  }

  // 更新用户信息
  updateUser(gender,filed, email, mobile, wechart, qq, college, collegetie, descs, name, username, password) {
    let data = {
      token: wx.getStorageSync('token'),
      user_id: wx.getStorageSync('userid'),
      gender,
      filed,
      email,
      mobile,
      wechart,
      qq,
      college,
      collegetie,
      descs,
      name,
    }
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/updateuser', data, {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }
  // 社团详情
  getSheTuanDetail(idx) {
    let data = {
      id: idx
    }
    return this._request.getRequest(this._baseUrl + '/corporation/getCorporation', data).then(res => res.data)
  }
  // 加入社团
  addSheTuan(idx, deptid, corid) {
    let data = {
      id: idx,
      deptid,
      corid
    }
    return this._request.postTwoRequest(this._baseUrl + '/corporation/addCor', data).then(res => res.data)
  }
  // 学院
  chooseXueY(typeId) {
    let data = {
      typeId,
    }
    return this._request.getRequest(this._baseUrl + '/sys/comm/getselectes', data).then(res => res.data)
  }
  // 学院专业
  chooseCol(typeId, parentValue) {
    let data = {
      typeId,
      parentValue,
    }
    return this._request.getRequest(this._baseUrl + '/sys/comm/getselectes', data).then(res => res.data)
  }
  // 社团状态
  getMassStatus(status) {
    let data = {
      user_id: wx.getStorageSync('userid'),
      status: status
    }
    return this._request.getRequest(this._baseUrl + '/sys/psersion/getUserCorStatus', data).then(res => res.data)
  }
  // 通知列表
  getNoticList(currPage, pageSize) {
    let data = {
      receiveUserId: parseInt(wx.getStorageSync('userid')),
      currPage,
      pageSize
    }
    return this._request.getRequest(this._baseUrl + '/sys/notic/list', data).then(res => res.data)
  }
  // 通知详情
  getNoticDetail(noticid) {
    let data = {
      receiveUserId: parseInt(wx.getStorageSync('userid')),
      noticid: parseInt(noticid)
    }
    return this._request.getRequest(this._baseUrl + '/sys/notic/info', data).then(res => res.data)
  }
}
export default agriknow