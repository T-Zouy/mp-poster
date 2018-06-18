<template>
  <div class="logo">
    <div class="notice-text">为获得更好的视觉效果，建议上传PNG格式的透明背景图片</div>
    <div class="logo-container">
      <div class="logo-add" @click="handleChoose">
        <i class="iconfont icon-cao-flat-Add"></i>
      </div>
      <div class="logo-item" v-for="(logo, index) in logoList" :key="index" @click="handleAddLogo(index)">
        <img :src="logo.path" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import wxMedia from '../../wxApi/media'
  import {mapActions} from 'vuex'
  export default {
    name: 'logo',
    data () {
      return {
        logoList: []
      }
    },
    methods: {
      ...mapActions([
        'addLogoModules'
      ]),
      handleChoose () {
        wxMedia.chooseImage({
          count: 1
        }).then(res => {
          console.log(res)
          wxMedia.getImageInfo({
            src: res.tempFiles[0].path
          }).then(res => {
            let temp = this.calWidthAndHeight({
              ...res
            })
            this.logoList.unshift({
              ...res,
              ...temp
            })
            console.log(this.logoList)
          })
        })
      },
      handleAddLogo (index) {
        console.log('add logo')
        this.addLogoModules({
          ...this.logoList[index],
          type: 'logoModules'
        })
        this.$router.push({
          path: '/pages/poster/edit'
        })
      },
      calWidthAndHeight ({width, height}) {
        let tempWidth = 0
        let tempHeight = 0
        console.log(width, height)
        if (width < height) {
          tempWidth = 77
          tempHeight = height * tempWidth / width
        } else {
          tempHeight = 77
          tempWidth = width * tempHeight / height
        }
        return {
          width: tempWidth,
          height: tempHeight
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .logo {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    padding: 9px 18px;
    .notice-text {
      color: #9B9B9B;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .logo-container {
    margin-top: 9px;
    display: flex;
    flex-wrap: wrap;
    .logo-add {
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      background-color: rgba(216, 216, 216, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logo-item {
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      overflow: hidden;
      background-color: rgba(216, 216, 216, 0.1);
      img {
        width: 100%;
      }
    }
  }

  .icon-cao-flat-Add {
    color: #fff;
    font-size: 14px;
    line-height: 14px;
  }
</style>
