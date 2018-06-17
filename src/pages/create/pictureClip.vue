<template>
  <div :style="{ minHeight: height }">
    <mpvue-cropper 
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
      ></mpvue-cropper>
    <div class="cropper-buttons" @tap="getCropperImage">
      <div class="getCropperImage">确定</div>
    </div>
  </div>
</template>

<script>
  import MpvueCropper from 'mpvue-cropper'

  let wecropper

  export default {
    data () {
      return {
        cropperOpt: {
          id: 'cropper',
          width: null, // 画布宽度
          height: null, // 画布高度
          scale: 2.5, // 最大缩放倍数
          zoom: 8, // 缩放系数
          cut: {
            x: null, // 裁剪框x轴起点
            y: null, // 裁剪框y轴期起点
            width: null, // 裁剪框宽度
            height: null // 裁剪框高度
          }
        }
      }
    },

    components: {
      MpvueCropper
    },

    methods: {
      cropperReady (...args) {
        console.log('cropper ready!')
      },
      cropperBeforeImageLoad (...args) {
        console.log('before image load')
      },
      cropperLoad (...args) {
        console.log('image loaded')
      },
      cropperBeforeDraw (...args) {
        // Todo: 绘制水印等等
      },
      getCropperImage () {
        wecropper
          .getCropperImage()
          .then(src => {
            wx.previewImage({
              current: '', // 当前显示图片的http链接
              urls: [src] // 需要预览的图片http链接列表
            })
          })
          .catch(e => {
            wx.showModal({
              content: '网络不稳定，请稍后再试',
              showCancel: false
            })
          })
      }
    },

    onLoad () {
      const { clipWidth, clipHeight } = this.$route.query
      const device = wx.getSystemInfoSync()
      const width = device.windowWidth // 可使用窗口宽度
      const height = device.windowHeight // 可使用窗口高度
      const screenWidth = device.screenWidth // 屏幕宽度
      const screenHeight = device.screenHeight // 屏幕高度
      this.cropperOpt.width = width
      this.cropperOpt.height = height

      if (clipWidth && clipHeight) {
        // 按编辑页面定义的比例初始化裁剪配置
        const clipScale = clipWidth / clipHeight
        const activedCutWidth = screenWidth * 0.653
        const activedCutHeight = activedCutWidth / clipScale
        this.cropperOpt.cut = {
          x: (width - activedCutWidth) / 2, // 裁剪框x轴起点
          y: (height - activedCutHeight - 50) / 2, // 裁剪框y轴期起点
          width: activedCutWidth, // 裁剪框宽度
          height: activedCutHeight // 裁剪框高度
        }
      } else {
        // 按手机屏幕比例初始化裁剪配置
        const scale = screenWidth / screenHeight
        const cutWidth = screenWidth * 0.653
        const cutHeight = cutWidth / scale
        this.cropperOpt.cut = {
          x: (width - cutWidth) / 2, // 裁剪框x轴起点
          y: (height - cutHeight - 50) / 2, // 裁剪框y轴期起点
          width: cutWidth, // 裁剪框宽度
          height: cutHeight // 裁剪框高度
        }
      }
    },

    mounted () {
      const { imgUrl } = this.$route.query
      const activedImgUrl = decodeURIComponent(imgUrl)
      wecropper = this.$refs.cropper
      wecropper.pushOrigin(activedImgUrl)
    },

    onUnload () {
      console.log('卸载')
    }
  }
</script>

<style>
  .cropper-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #3ed36c;
    color: #fff;
  }

</style>