import request from './http.js'
class agriknow {
  constructor() {
    this._baseUrl = 'http://www.btzmpro.com:8082/HBOFRONT'
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
  userLogin(username, password) {
    let data = {
      username,
      password
    }
    return this._request.postRequest(this._baseUrl + '/api/sys/login', data).then(res => res.data)
  }

  // 新闻列表
  getNews(currPage = 1, pageSize = 10) {
    let data = { currPage: currPage, pageSize: pageSize }
    return this._request.getRequest(this._baseUrl + '/sys/news/list', data).then(res => res.data)
  }

  // 社团列表
  getBaituanList(currPage = 0, pageSize = 10) {
    let data = { currPage: currPage, pageSize: pageSize }
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
  getNewsComment(topicid, currPage = 0, pageSize = 10) {
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
  userPush(pageSize, currPage) {
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
    return this._request.getRequest(this._baseUrl + '/sys/contention/getCoractivity', data).then(res => res.data)
  }

  // 用户发布帖子
  userAcDetail(content, userid, imageid ) {
    let data = {
      token: '',
      content,
      userid,
      imageid
    }
    return this._request.postRequest(this._baseUrl + '/sys/psersion/releaseTopic', data).then(res => res.data)
  }
}
export default agriknow
