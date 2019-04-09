//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    myList: ['测试1', '测试2', '测试3', '测试4', '测试5', '测试6', '测试7', '测试8', '测试9', '测试10', '测试11', '测试12', '测试13', '测试14', '测试15', '测试16', '测试17', '测试18', '测试19', '测试20', '测试11', '测试12', '测试13', '测试14', '测试15', '测试16', '测试17', '测试18', '测试19', '测试20', '测试11', '测试12', '测试13', '测试14', '测试15', '测试16', '测试17', '测试18', '测试19', '测试20', '测试11', '测试12', '测试13', '测试14', '测试15', '测试16', '测试17', '测试18', '测试19', '测试20', '测试11', '测试12', '测试13', '测试14', '测试15', '测试16', '测试17', '测试18', '测试19', '测试20']
  },
  //事件处理函数
  bindBtnTap: function() {
    console.log(this.data.hasUserInfo)
    if (this.data.hasUserInfo === true){
      wx.navigateTo({
        url: '../treehole/treehole'
      })
    }else{
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
