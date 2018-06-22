<template>
    <div class="text" :class="[{'module-selected': !disable}, calClass]"
         @click="handleInput"
         @touchstart="startMoveModule"
         @touchmove="moveModule"
         @touchend="endMoveModule" :style="{
              top: styles.top + 'px',
              left: styles.left + 'px',
              width: styles.width + 'px',
              height: styles.height + 'px',
              transform: calScale,
              color: styles.color,
              fontSize: styles.fontSize + 'px',
              fontWeight: styles.fontWeight,
              textDecoration: styles.textDecoration,
              textShadow: styles.textShadow,
              opacity: styles.opacity
          }">
      {{text}}
    </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'module-text',
    props: {
      styles: {
        type: Object,
        default: () => ({
          top: 100,
          left: 10,
          width: 200,
          height: 100,
          scale: 1,
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: '',
          textDecoration: 'none',
          textShadow: 'none',
          textAlign: 'left',
          opacity: 1
        })
      },
      text: {
        type: Object,
        default: 'default show text'
      },
      disable: {
        type: Boolean,
        default: true
      },
      index: {
        type: Number
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
        return `textModules${this.index}`
      }
    },
    methods: {
      ...mapMutations({
        changeStyles: 'changeStyles'
      }),
      handleInput () {
        if (this.disable) {
          console.log('click')
          this.$emit('select', { type: 'textModules', index: this.index })
          return false
        }
        this.$router.push({
          path: '/pages/poster/text-input'
        })
        this.$emit('edit text')
      },
      startMoveModule (event) {
        event.preventDefault()
        this.start.x = event.clientX
        this.start.y = event.clientY
      },
      moveModule (event) {
        event.preventDefault()
        if (this.disable) {
          return false
        }
        this.end.x = event.clientX
        this.end.y = event.clientY
        let distanceX = this.end.x - this.start.x
        let distanceY = this.end.y - this.start.y
        let tempTop = distanceY + this.styles.top
        let tempLeft = distanceX + this.styles.left
        this.changeStyles({ type: 'textModules', index: this.index, styles: { top: tempTop, left: tempLeft } })
        this.$parent.updateEditButtonBound()
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

<style scoped>
  @import "../../assets/css/font.css";

  .text {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: HYLingXinTiF;
  }

  .module-selected {
    z-index: 99;
    border: 1px dashed #3FD36C;
  }

</style>
