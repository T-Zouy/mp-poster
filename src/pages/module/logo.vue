<template>
  <div class="logo">
    <div class="notice-text">为获得更好的视觉效果，建议上传PNG格式的透明背景图片</div>
    <div class="logo-container">
      <div class="logo-add" @click="handleChoose">
        <i class="iconfont icon-jiahao"></i>
      </div>
      <div class="logo-item" v-for="(logo, index) in logoList" :key="index"
           @click="handleAddLogo(index)" @longpress="longPressDelete(index)" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <img :src="logo.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import wxMedia from '../../wxApi/media'
  import wxNetwork from '../../wxApi/network'
  import { mapActions } from 'vuex'
  import uploadApi from '../../api/upload'
  import posterApi from '../../api/poster'
  import UPLOAD from '../../constants/upload.config'

  export default {
    name: 'logo',
    data () {
      return {
        logoList: [],
        timeOutStatus: -1,
        pageCount: 0,
        totalCount: 0,
        startTime: 0,
        endTime: 0
      }
    },
    beforeMount () {
      this.getLogoList({page: 0, perPage: 100})
    },
    methods: {
      ...mapActions([
        'addLogoModules'
      ]),
      handleTouchStart (e) {
        this.startTime = e.timeStamp
      },
      handleTouchEnd (e) {
        this.endTime = e.timeStamp
      },
      longPressDelete (index) {
        let that = this
        wx.showModal({
          title: '提示',
          content: '是否删除该图片',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.deleteCorLogo(index)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      deleteCorLogo (index) {
        if (index < 0 || index >= this.logoList.length - 1) {
          console.log('该图片不在logo列表内')
          return false
        }
        let id = this.logoList[index].id
        // 后台删除logo
        posterApi.deleteCorLogo(id)
        // 前端更新
        this.logoList.splice(index, 1)
      },
      async getLogoList ({page, perPage}) {
        let res = await posterApi.getCorLogoList({
          page,
          perPage
        })
        if (res.status.code === 0 && res.data) {
          let data = res.data
          this.logoList = data.list
          this.pageCount = data['page_count']
          this.totalCount = data['total_count']
        } else {
          console.log(res.status.msg)
        }
      },
      async uploadImg (filePath) {
        // let that = this
        let res = await uploadApi.getToken()
        if (res.status.code === 0) {
          let uploadRes = await wxNetwork.uploadFile(filePath, {
            region: 'ECN',
            key: filePath.split('//')[1],
            uptoken: res.data
          })
          return uploadRes
        } else {
          console.log(res.status.msg)
          return false
        }
      },
      async handleChoose () {
        // 选择图片
        let res = await wxMedia.chooseImage({ count: 1 })
        // 获取图片信息
        let imgInfo = await wxMedia.getImageInfo({ src: res['tempFiles'][0].path })
        // 图片上传七牛
        let uploadQiniu = await this.uploadImg(res['tempFiles'][0].path)
        if (!uploadQiniu) {
          console.log('上传七牛失败----------------------')
          return false
        }
        // 图片上传到后台
        let imgUrl = `${UPLOAD.domain}${uploadQiniu.imageURL}`
        let temp = this.calWidthAndHeight({
          ...imgInfo
        })
        res = await posterApi.addCorLogo({
          url: imgUrl,
          ...temp
        })
        if (res.status.code !== 0) {
          console.log(res.status.msg)
          console.log('上传后台失败')
          return false
        }
        console.log(res.data)
        this.logoList.unshift({
          ...imgInfo,
          ...temp
        })
      },
      handleAddLogo (index) {
        if (this.endTime - this.startTime > 350) {
          return false
        }
        this.addLogoModules({
          ...this.logoList[index],
          type: 'logoModules'
        })
        this.$router.push({
          path: '/pages/poster/edit'
        })
      },
      calWidthAndHeight ({ width, height }) {
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

  .icon-jiahao {
    color: #fff;
    font-size: 14px;
    line-height: 14px;
  }
</style>
