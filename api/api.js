import request from './http.js'
class agriknow {
  constructor() {
    this._baseUrl = 'https://www.btzmpro.com:8082/HBOFRONT'
    this.ImgUrl = 'http://47.105.58.149:82'
    this._defaultHeader = { 'data-tupe': 'application/json' }
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
    return this._request.postTwoRequest(this._baseUrl + '/api/sys/login', data).then(res => res.data)
  }

  // 新闻列表
  getNews(currPage = 1, pageSize = 10) {
    let data = { currPage: currPage, pageSize: pageSize }
    return this._request.getRequest(this._baseUrl + '/sys/news/list', data).then(res => res.data)
  }
  // 刷新token
  refreshToken() {
    return this._request.getRequest(this._baseUrl + '/api/sys/refreshToken').then(res => res.data)
  }
  // 社团列表
  getBaituanList(currPage = 1, pageSize = 10, scale) {
    let data = { currPage: currPage, pageSize: pageSize, scale: scale }
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
    let data = { id: id }
    return this._request.getRequest(this._baseUrl + '/sys/news/getNewsDetail', data).then(res => res.data)
  }
  /**
   * 新闻评论列表
   */
  getNewsComment(topicid, currPage = 1, pageSize = 10) {
    let data = { topicid: topicid, currPage: currPage, pageSize: pageSize }
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
    return this._request.postRequest(this._baseUrl + ' /sys/news/replies', data).then(res => res.data)
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

  // 用户发布帖子
  userPush(content, imageid ) {
    let data = {
      token: wx.getStorageSync('token'),
      content,
      userid: wx.getStorageSync('userid'),
      imageid
    }
    return this._request.postRequest(this._baseUrl + '/sys/psersion/releaseTopic', data).then(res => res.data)
  }
  // 保存用户信息
  saveUserInfo(data) {
    const { nickName, gender } = data
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/saveuserwehartinfo', { nickName, gender }).then(res => res.data)
  }
  // 绑定用户信息
  bindUser(username, password, user_id) {
    let data = {
      username,
      password,
      user_id
    }
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/updateUsernameAndPassword', data).then(res => res.data)
  }
  // 获取用户信息
  getUser() {
    return this._request.getRequest(this._baseUrl + '/api/getuserInfo',{},{
      "Authorization": wx.getStorageSync('token')
    }).then(res => res.data)
  }
  
  // 更新用户信息
  updateUser(email, mobile, wechar, qq, college, collegetie, descs, name) {
    let data = {
      token: '',
      email,
      mobile,
      wechar,
      college,
      collegetie,
      descs,
      name
    }
    return this._request.postRequest(this._baseUrl + '/sys/userinfo/updateUsernameAndPassword', data).then(res => res.data)
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
    return this._request.getRequest(this._baseUrl + '/corporation/getCorporation', data).then(res => res.data)
  }
}
export default agriknow
