<template>
  <div>
    <swiper class="swiper-container" @change="handleSwiperChange" previous-margin="44px" next-margin="44px">
      <swiper-item class="swiper-slide" v-for="item in tempLists" :key="item.id">
        <img :src="item.cover_url" class="main-img">
      </swiper-item>
    </swiper>
    <div class="auth-box" @click="goToTempDetail">
      <button class="auth-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo"></button> 
      <i class="use-temp-icon"></i>
      <p class="use-temp-text">立即使用</p>
    </div>
  </div>
</template>

<script>
  import { getTempList, createPosters } from '../../api/create'
  import { login } from '../../api/login'
  import UTILS from '../../utils'
  export default {
    data () {
      return {
        currentTempId: null,
        tempLists: []
      }
    },

    methods: {
      handleSwiperChange (event) {
        console.log(event)
        const currentIndex = event.target.current
        this.currentTempId = this.tempLists[currentIndex].id
      },
      handleCreatePoster (scene) {
        createPosters({
          scene,
          template_id: this.currentTempId
        }).then(res => {
          console.log(res)
          this.$router.push({
            path: '/pages/poster/edit',
            query: {
              template_id: res.data.template_id
            }
          })
        })
      },
      bindGetUserInfo (e) {
        const scene = wx.getStorageSync('scene')
        if (scene) {
          this.handleCreatePoster(scene)
        } else {
          wx.getSetting({
            success: async (res) => {
              if (res.authSetting['scope.userInfo']) {
                login(await UTILS.getLoginQuery()).then(res => {
                  if (res.status.code === 0) {
                    wx.setStorageSync('scene', res.data)
                    this.handleCreatePoster(res.data)
                  } else {
                    wx.showToast({
                      title: '网络不稳定，请稍后重试',
                      icon: 'none'
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    },

    mounted () {
      getTempList().then(res => {
        this.tempLists = res.data
        this.currentTempId = res.data[0].id
      })
    }
  }
</script>

<style lang="less">
  /* 模板列表swiper样式 */
  .swiper-container {
    min-height: 435px;
    width: 100%;
    margin-top: 34px;
  }
  .main-img {
    width: 245px;
    height: 435px;
    margin: 0 auto;
    display: block
  }
  .auth-box {
    position: relative;
    .auth-btn, .use-temp-icon {
      display: block;
      left: 50%;
      margin-top: -30px;
    }
    .auth-btn {
      position: absolute;
      z-index: 999;
      width: 100px;
      height: 120px;
      margin-left: -50px;
      opacity: 0;
    }
    .use-temp-icon {
      position: relative;
      margin-left: -30px;
      width: 60px;
      height: 60px;
      background: url('../../assets/img/Group.png') left center no-repeat;
      background-size: 60px 60px;
    }
    .use-temp-text {
      height: 19px;
      line-height: 19px;
      font-size: 13px;
      font-weight: 300;
      color: #999999;
      text-align: center;
    }
  }
</style>
