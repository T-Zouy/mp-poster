<template>
    <img class="image" :class="[{'module-selected': !disable}, calClass]"
         :style="{
                    top: styles.top + 'px',
                    left: styles.left + 'px',
                    width: styles.width + 'px',
                    height: styles.height + 'px',
                    transform: calScale
                  }"
         :src="src" alt=""
         @click="handleChange"
         @touchstart="startMoveModule" @touchmove="moveModule" @touchend="endMoveModule">
</template>

<script>
  import {mapMutations} from 'vuex'
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
          scale: 1
        })
      },
      disable: {
        type: Boolean,
        default: true
      },
      src: {
        type: String,
        default: 'http://omdrnmjns.bkt.clouddn.com/18-6-7/93306575.jpg'
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
        return `imageModules${this.index}`
      }
    },
    methods: {
      ...mapMutations({
        changeStyles: 'changeStyles'
      }),
      handleDelete () {
        console.log('handle delete')
        this.$emit('delete')
      },
      handleChange () {
        if (this.disable) {
          this.$emit('select', {type: 'imageModules', index: this.index})
          return false
        }
        console.log('change image')
        this.$emit('change')
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
        this.changeStyles({type: 'imageModules', index: this.index, styles: {top: tempTop, left: tempLeft}})
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
  .image {
    position: absolute;
    box-sizing: border-box;
  }

  .module-selected {
    z-index: 99;
    border: 1px dashed #3FD36C;
  }

</style>
