<template>
  <div class="text-edit">
    <div class="top-part-style" v-if="textEditType === 'style'">
      <div class="switch-item">
        <span>粗体</span>
        <switch checked="styles.fontWeight === 'bold'"
                @change="changeFontWeight"/>
      </div>
      <div class="switch-item">
        <span>下划线</span>
        <switch checked="styles.textDecoration === 'underline'"
                @change="changeTextDecoration"/>
      </div>
      <div class="switch-item">
        <span>阴影</span>
        <switch checked="hasShadow"
                @change="changeTextShadow"/>
      </div>
    </div>
    <div class="top-part-color" v-else-if="textEditType === 'color'">
      <div class="color-value">
        <div>颜色</div>
        <div class="value-item" :class="{selected: styles.color === '#000000'}"
             style="background-color: #000000;" @click="handleChangeStyles({color: '#000000'})"></div>
        <div class="value-item" :class="{selected: styles.color === '#ffffff'}"
             style="background-color: #ffffff;" @click="handleChangeStyles({color: '#ffffff'})"></div>
        <div class="value-item" :class="{selected: styles.color === '#F8E71C'}"
             style="background-color: #F8E71C;" @click="handleChangeStyles({color: '#F8E71C'})"></div>
        <div class="value-item" :class="{selected: styles.color === '#D0021B'}"
             style="background-color: #D0021B;" @click="handleChangeStyles({color: '#D0021B'})"></div>
        <div class="value-item" :class="{selected: styles.color === '#4A90E2'}"
             style="background-color: #4A90E2;" @click="handleChangeStyles({color: '#4A90E2'})"></div>
      </div>
      <div class="transparency">
        <div>透明度</div>
        <slider class="slider-1" @changing="handleChangeOpacity" step="2"
                :value="100 - styles.opacity * 100" block-size="12"/>
      </div>
    </div>
    <div class="bottom-part">
      <i class="cancel iconfont icon-chacha"></i>
      <div class="edit-container">
        <div class="style" :class="{active: textEditType === 'style'}" @click="handleEdit('style')">样式</div>
        <div class="color" :class="{active: textEditType === 'color'}" @click="handleEdit('color')">颜色</div>
        <div class="edit" :class="{active: textEditType === 'edit'}" @click="handleEdit('edit')">编辑</div>
      </div>
      <i class="confirm iconfont icon-xiaogougou"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'text-edit-footer',
    props: {
      textEditType: {
        type: String,
        default: 'none'
      }
    },
    data () {
      return {
        styles: {},
        index: 0,
        type: ''
      }
    },
    beforeMount () {
      this.updatePoster()
    },
    computed: {
      hasShadow () {
        if (this.styles.textShadow === '0 2px 1px 0 #ff0000') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapGetters({
        getEditModule: 'editModule'
      }),
      ...mapMutations({
        changeStyles: 'changeStyles'
      }),
      updatePoster () {
        let temp = this.getEditModule()
        console.log(temp)
        this.styles = temp.module.style
        this.index = temp.index
        this.type = temp.type
      },
      handleEdit (type) {
        this.textEditType = type
        console.log(this.textEditType)
      },
      handleChangeStyles (styles) {
        this.changeStyles({ type: this.type, index: this.index, styles: styles })
      },
      changeFontWeight (event) {
        console.log(event)
        if (event.target.value) {
          this.handleChangeStyles({ fontWeight: 'bold' })
        } else {
          this.handleChangeStyles({ fontWeight: 'none' })
        }
      },
      changeTextDecoration (event) {
        console.log(event)
        if (event.target.value) {
          this.handleChangeStyles({ textDecoration: 'underline' })
        } else {
          this.handleChangeStyles({ textDecoration: 'none' })
        }
      },
      changeTextShadow (event) {
        console.log(event)
        if (event.target.value) {
          this.handleChangeStyles({ textShadow: '0 2px 1px 0 #ff0000' })
        } else {
          this.handleChangeStyles({ textShadow: 'none' })
        }
      },
      handleChangeOpacity (event) {
        console.log(event)
        let temp = (100 - event.target.value) / 100
        this.styles.opacity = temp
        this.handleChangeStyles({ opacity: temp })
      }
    }
  }
</script>

<style lang="less" scoped>
  .text-edit {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .top-part-style {
    box-sizing: border-box;
    position: absolute;
    bottom: 45px;
    left: 0;
    width: 100%;
    height: 56px;
    padding: 0 39px;
    background-color: rgba(255, 255, 255, .95);
    opacity: 0.93;
    color: #333;
    font-size: 13px;
    line-height: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .switch-item {
    display: flex;
    align-items: center;
    span {
      margin-right: 8px;
    }
  }

  .top-part-color {
    box-sizing: border-box;
    position: absolute;
    bottom: 45px;
    left: 0;
    width: 100%;
    height: 56px;
    padding: 0 18px;
    background-color: rgba(255, 255, 255, 0.95);
    opacity: 0.93;
    color: #333;
    font-size: 12px;
    line-height: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .color-value {
      display: flex;
      align-items: center;
      .value-item {
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
    }
    .transparency {
      display: flex;
      align-items: center;
      .slider-1 {
        margin-left: 10px;
        width: 108px;
        height: 13px;
      }
    }
  }

  .selected {
    border: 1px solid #3FD36C;
  }

  .bottom-part {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: #333;
    box-shadow: 0 3px 0 0 #D4D4D4;
    color: #ddd;
    font-size: 13px;
    line-height: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .iconfont {
    font-size: 18px;
    line-height: 18px;
  }

  .cancel {
    margin: 0 42px 0 18px;
  }

  .confirm {
    margin: 0 18px 0 42px;
  }

  .edit-container {
    width: 186px;
    display: flex;
    justify-content: space-between;
  }

  .active {
    position: relative;
    color: #3FD36C;
    &:after {
      content: '';
      position: absolute;
      top: 26px;
      left: 2px;
      width: 20px;
      height: 2px;
      background-color: #3FD36C;
    }
  }
</style>
