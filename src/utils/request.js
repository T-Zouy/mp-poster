import wx from '../utils/wx'
import Fly from 'flyio'
// import config from '../../config'
import { login } from '@/api/login'
import UTILS from '../utils'

const request = new Fly()

request.config.timeout = 10 * 1000
request.config.baseURL = 'https://dev.haicaoyun.com'
// request.env.config = config.dev.BASE_URL

request.interceptors.request.use((request) => {
  wx.showLoading({ title: '拼命加载中...' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    if (response.data.status.code === 4001) {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo'] && wx.getStorageSync('scene')) {
            wx.showModal({
              title: '提示',
              content: '登陆过期，请重新登陆',
              showCancel: false,
              success: async (res) => {
                if (res.confirm) {
                  login(await UTILS.getLoginQuery()).then(res => {
                    if (res.status.code === 0) {
                      wx.setStorageSync('scene', res.data)
                      wx.switchTab({
                        url: '/pages/create/templates'
                      })
                    }
                  })
                }
              }
            })
          } else {
            wx.switchTab({
              url: '/pages/profile/mine'
            })
            wx.showToast({
              title: '请先登陆',
              icon: 'none'
            })
          }
        }
      })
    }
    return promise.resolve(response.data)
  }, (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
