Page({
  data: {
    nowIdx: 0,
    topTar: ['推荐', '全部'],
  },
  tarClick(e) {
    let id = e.currentTarget.dataset.nowid;
    this.setData({
      nowIdx: id
    })
  },
})