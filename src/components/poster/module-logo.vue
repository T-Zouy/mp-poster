<template>
  <img class="module-logo" :class="[{'module-selected': disable}, calClass]"
       :src="src" alt=""
       :style="{
          top: styles.top + 'px',
          left: styles.left + 'px',
          width: styles.width + 'px',
          height: styles.height + 'px',
          transform: calScale
        }" @click="handleClick"
       @touchstart="startMoveModule"
       @touchmove="moveModule"
       @touchend="endMoveModule" />
</template>

<script>
  import {mapMutations} from 'vuex'

  export default {
    name: 'module-logo',
    props: {
      styles: {
        type: Object,
        default: () => ({
          top: 100,
          left: 10,
          width: 200,
          height: 100,
          scale: 1
        })
      },
      src: {
        type: String,
        default: 'http://img0.imgtn.bdimg.com/it/u=635704053,1460945271&fm=27&gp=0.jpg'
      },
      disable: {
        type: Boolean,
        default: false
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        }
      }
    },
    computed: {
      calScale () {
        return `scale(${this.styles.scale})`
      },
      calClass () {
        return `logoModules${this.index}`
      }
    },
    methods: {
      ...mapMutations({
        changeStyles: 'changeStyles'
      }),
      handleClick () {
        if (!this.disable) {
          this.$emit('select', {type: 'logoModules', index: this.index})
          return false
        }
      },
      startMoveModule (event) {
        event.preventDefault()
        this.start.x = event.clientX
        this.start.y = event.clientY
      },
      moveModule (event) {
        event.preventDefault()
        if (!this.disable) {
          return false
        }
        this.end.x = event.clientX
        this.end.y = event.clientY
        let distanceX = this.end.x - this.start.x
        let distanceY = this.end.y - this.start.y
        let tempTop = distanceY + this.styles.top
        let tempLeft = distanceX + this.styles.left
        this.changeStyles({type: 'logoModules', index: this.index, styles: {top: tempTop, left: tempLeft}})
        this.start.x = event.clientX
        this.start.y = event.clientY
      },
      endMoveModule () {
        this.end.x = 0
        this.end.y = 0
        this.start.x = 0
        this.start.y = 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .module-logo {
    position: absolute;
    box-sizing: border-box;
  }

  .module-selected {
    border: 1px dashed #3FD36C;
    z-index: 99;
  }
</style>
