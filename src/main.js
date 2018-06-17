import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'

import '@/assets/css/app.css'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/create/templates'],
    window: {
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: '海草云',
      backgroundTextStyle: 'light',
      enablePullDownRefresh: false,
      onReachBottomDistance: 50
    },
    tabBar: {
      color: '#9B9B9B',
      selectedColor: '#37B35D',
      borderStyle: '#D4D4D4',
      backgroundColor: '#FAFAFA',
      list: [
        {
          text: '报名',
          pagePath: 'pages/signup/main',
          iconPath: 'static/assets/sign-up.png',
          selectedIconPath: 'static/assets/sign-up-active.png'
        },
        {
          text: '创建',
          pagePath: 'pages/create/templates',
          iconPath: 'static/assets/create.png',
          selectedIconPath: 'static/assets/create-active.png'
        },
        {
          text: '我的',
          pagePath: 'pages/profile/mine',
          iconPath: 'static/assets/mine.png',
          selectedIconPath: 'static/assets/mine-active.png'
        }
      ]
    }
  }
}
