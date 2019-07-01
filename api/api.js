import request from './http.js'
class agriknow {
  constructor() {
    this._baseUrl = 'http://140.143.201.244:8082/HBOFRONT'
    this.ImgUrl = 'http://140.143.201.244:82'
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

  /**
   * 获取新闻列表
   */
  getNews(currPage = 1, pageSize = 10) {
    let data = { currPage: currPage, pageSize: pageSize }
    return this._request.getRequest(this._baseUrl + '/sys/news/list', data).then(res => res.data)
  }

  /**
   * 获取新闻评论
   */
  getNewsDetail(topicid, currPage = 1, pageSize = 10) {
    let data = { topicid: topicid, currPage: currPage, pageSize: pageSize }
    return this._request.getRequest(this._baseUrl + '/sys/news/getNewsReplice', data).then(res => res.data)
  }
  /**
   * 获取新闻详情
   */
  getNewsComment(id) {
    let data = { id: id }
    return this._request.getRequest(this._baseUrl + '/sys/news/getNewsDetail', data).then(res => res.data)
  }
}
export default agriknow
