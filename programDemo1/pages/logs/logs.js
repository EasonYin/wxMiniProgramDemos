//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: [],
    list: app.globalData.recordList,
  },
  onLoad: function () {
    console.log(app.globalData.recordList)
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
    })
    
  }
})
