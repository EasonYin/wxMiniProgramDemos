//treehole.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isRecording:false,
    recordText:'点击上方录制',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindBtnTap: function() {
    console.log(this.data.hasUserInfo)
    if (this.data.hasUserInfo === true){
      wx.navigateTo({
        url: '../logs/logs'
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
  bindTouchBegain:function(){
    var that = this;
    console.log('begin record!')
    that.setData({
      isRecording: true,
      recordText: '正在录制'
    })
    wx.startRecord({
      success:function(res){
        console.log(res)
        console.log('record success!')
        that.setData({
          isRecording: false,
          recordText: '点击上方录制'
        })
        app.globalData.recordList.push(res.tempFilePath)
        
      },
      fail:function(res){
        //录音失败
        console.log(res)
        console.log('record fail!')
        that.setData({
          isRecording: false,
          recordText: '点击上方录制'
        })
      }
    })
    //1分钟超时
    setTimeout(function(){
        //结束录音
        if (that.data.isRecording === true){
          console.log('录音超时')
          wx.showToast({
            title: '只能说1分钟',
          })
          that.setData({
            isRecording: false,
            recordText: '点击上方录制'
          })
          wx.stopRecord()
        }else{
          console.log("计时结束")
        }
        
    },10000)
  },
  bindTouchEnd:function(){
    var that = this;
    //结束录音
    if (this.data.isRecording === true){
      console.log('stop record!')
      that.setData({
        isRecording: false,
        recordText: '点击上方录制'
      })
      wx.stopRecord()
    }else{
      console.log('触摸结束：录音超时')
      
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
