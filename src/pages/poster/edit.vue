<template>
  <div class="edit">
    <div class="poster" id="poster">
      <!--背景-->
      <img class="bg-img" :src="bgUrl" alt=""
           @click="deselectAll">
      <!--二维码组件-->
      <v-logo v-for="(logoModule, index) in logoModules" :key="index"
              :styles="logoModule.content.style" :qrCodeUrl="qrCodeUrl"
              :disable="logoModule.content.disable" :index="index"
              @select="selectModule"></v-logo>
      <!--文本组件-->
      <v-text v-for="(textModule, index) in textModules" :key="index"
              :styles="textModule.content.style" :text="textModule.content.text"
              :disable="textModule.content.disable" :index="index"
              @select="selectModule" @delete="deleteModule"></v-text>
      <!--图片组件-->
      <v-image v-for="(imageModule, index) in imageModules" :key="index"
               :styles="imageModule.content.style" :src="imageModule.content.src"
               :disable="imageModule.content.disable" :index="index"
               @select="selectModule" @delete="deleteModule"></v-image>
      <i v-show="isShowEdit" class="delete iconfont icon-chacha"
              :style="{left: deleteBtnStyle.left + 'px',
                       top: deleteBtnStyle.top + 'px'}"
              @click="handleDelete"></i>
      <i v-show="isShowEdit" class="scale iconfont icon-dengbisuofang"
              :style="{left: scaleBtnStyle.left + 'px',
                       top: scaleBtnStyle.top + 'px'}"
              @touchstart="scaleTouchStart"
              @touchmove="scaleTouchMove"
              @touchend="scaleTouchEnd"></i>
    </div>
    <div>
      <v-text-edit v-if="footerStatus === 'textModules'"></v-text-edit>
      <v-edit-footer v-else @edit="btnEdit"></v-edit-footer>
    </div>
  </div>
</template>

<script>
  import EditFooter from '../../components/footer/edit-footer'
  import TextEditFooter from '../../components/footer/text-edit-footer'
  import ModuleText from '../../components/poster/module-text'
  import ModuleImage from '../../components/poster/module-image'
  import ModuleLogo from '../../components/poster/module-logo'
  import wxElement from '../../wxApi/element'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  const EDIT = {
    'background': function () {
      wx.showActionSheet({
        itemList: ['高清图库', '从相册选择'],
        success: res => {
          const tapIndex = res.tapIndex
          if (tapIndex === 0) {
            this.$router.push({
              path: '/pages/create/pictureStore'
            })
          } else {
            wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: res => {
                const src = res.tempFilePaths[0]
                //  获取裁剪图片资源后，通过imgurl带到裁剪页面
                this.$router.push({
                  path: '/pages/create/pictureClip',
                  query: {
                    imgUrl: src
                  }
                })
              }
            })
          }
        },
        fail: res => {
          console.log(res.errMsg)
        }
      })
    },
    'component': function () {
      this.deselectAll()
      this.$router.push({
        path: '/pages/create/components'
      })
    },
    'form': function () {
      const templateId = this.$route.query.template_id
      const isEdit = this.$route.query.isEdit
      this.$router.push({
        path: '/pages/form/add',
        query: {
          template_id: templateId,
          isEdit
        }
      })
    },
    'save': function () {
      console.error('save')
      console.log(this)
    }
  }
  export default {
    name: 'edit',
    data () {
      return {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        },
        radius: 0,
        scale: {
          x: 0,
          y: 0
        },
        editModuleInfo: {
          type: '',
          index: 0,
          module: {}
        },
        deleteBtnStyle: {
          left: 0,
          top: 0
        },
        scaleBtnStyle: {
          top: 0,
          left: 0
        },
        posterBound: {
          top: 0,
          left: 0
        }
      }
    },
    components: {
      'v-edit-footer': EditFooter,
      'v-text-edit': TextEditFooter,
      'v-text': ModuleText,
      'v-image': ModuleImage,
      'v-logo': ModuleLogo
    },
    computed: {
      ...mapGetters([
        'bgUrl',
        'qrCodeUrl',
        'footerStatus',
        'poster',
        'textModules',
        'imageModules',
        'logoModules',
        'editModule'
      ]),
      isShowEdit () {
        if (this.editModuleInfo.type === '') {
          return false
        } else {
          return true
        }
      }
    },
    watch: {
      editModule: {
        deep: true,
        handler: function (now, previous) {
          this.editModuleInfo = now
          this.updateEditButtonBound()
          if (this.editModuleInfo.type !== '') {
            this.radius = this.getRadius(this.editModuleInfo.module.style.width, this.editModuleInfo.module.style.height)
          }
        }
      }
    },
    beforeMount () {
      wxElement.getElementBound('#poster').then(rect => {
        this.posterBound.top = rect.top
        this.posterBound.left = rect.left
      })
      this.getPosterTemplate()
    },
    methods: {
      ...mapActions([
        'getPosterTemplate',
        'selectModule',
        'deleteModule'
      ]),
      ...mapMutations([
        'setPosterModules',
        'setFooterStatus',
        'deselectAll',
        'changeStyles'
      ]),
      btnEdit (type) {
        EDIT[type].bind(this)()
      },
      getDistance (cx, cy, pointerX, pointerY) {
        let ox = pointerX + cx
        let oy = pointerY + cy
        return Math.sqrt(
          ox * ox + oy * oy
        )
      },
      getRadius (x, y) {
        return Math.sqrt(
          x * x + y * y
        )
      },
      updateEditButtonBound () {
        let className = `.${this.editModuleInfo.type}${this.editModuleInfo.index}`
        console.log(className)
        wxElement.getElementBound(className).then(rect => {
          this.deleteBtnStyle.top = rect.top - 8
          this.deleteBtnStyle.left = rect.left - 8 - this.posterBound.left
          this.scaleBtnStyle.top = rect.bottom - 8
          this.scaleBtnStyle.left = rect.right - 8 - this.posterBound.left
        })
      },
      scaleTouchStart (event) {
        event.preventDefault()
        console.log(event)
        this.start.x = event.clientX
        this.start.y = event.clientY
        // console.log(event.clientX, event.clientY)
      },
      scaleTouchMove (event) {
        event.preventDefault()
        this.end.x = event.clientX
        this.end.y = event.clientY
        // console.log(event.clientX, event.clientY)
        // 获取滑动距离
        let distanceX = this.end.x - this.start.x + this.scale.x
        let distanceY = this.end.y - this.start.y + this.scale.y
        let tempScale = this.getDistance(this.editModuleInfo.module.style.width, this.editModuleInfo.module.style.height, distanceX, distanceY) / this.radius
        this.changeStyles({ ...this.editModuleInfo, styles: { scale: tempScale } })
        this.updateEditButtonBound()
      },
      scaleTouchEnd (event) {
        event.preventDefault()
        this.scale.x = this.end.x - this.start.x + this.scale.x
        this.scale.y = this.end.y - this.start.y + this.scale.y
      }
    }
  }
</script>

<style lang="less" scoped>
  .edit {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
  }

  .poster {
    position: relative;
    width: 314px;
    height: 554px;
    overflow: hidden;
    margin: 0 auto;
  }

  .bg-img {
    width: 100%;
    height: 100%;
    background-color: #fafbfc;
  }

  .logo {
    position: absolute;
    bottom: 33px;
    right: 20px;
    width: 57px;
    height: 57px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .icon-chacha, .icon-dengbisuofang {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background-color: #3FD36C;
    font-size: 15px;
    line-height: 15px;
    color: #fff;
  }
</style>
