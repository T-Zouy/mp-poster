<template>
  <div class="logo-edit">
    <div class="top-part" v-if="activeType === 'opacity'">
      <div class="opacity-text">透明度</div>
      <slider class="slider-image" @changing="handleChangeOpacity" step="2"
              :value="100 - styles.opacity * 100" block-size="12"/>
    </div>
    <div class="bottom-part">
      <i class="cancel iconfont icon-chacha" @click="handleCancelSave"></i>
      <div class="edit-container">
        <div class="ele-opacity" :class="{active: activeType === 'opacity'}" @click="changeBtnType('opacity')">透明度</div>
      </div>
      <i class="confirm iconfont icon-xiaogougou" @click="handleSave"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'logo-edit-footer',
    data () {
      return {
        activeType: '',
        tempStyles: {}, // 用于存储编辑前的状态
        styles: {},
        index: 0,
        type: ''
      }
    },
    beforeMount () {
      this.updatePoster()
      this.tempStyles = {
        ...this.styles
      }
    },
    methods: {
      ...mapGetters({
        getEditModule: 'editModule'
      }),
      ...mapMutations({
        changeStyles: 'changeStyles'
      }),
      ...mapActions([
        'saveEdit',
        'cancelSaveEdit'
      ]),
      handleSave () {
        this.saveEdit()
      },
      handleCancelSave () {
        this.cancelSaveEdit({type: this.type, index: this.index, styles: this.tempStyles})
      },
      updatePoster () {
        let temp = this.getEditModule()
        this.styles = temp.module.styles
        this.index = temp.index
        this.type = temp.type
      },
      changeBtnType (type) {
        console.log(type)
        this.activeType = type
      },
      handleChangeOpacity (event) {
        console.log(event)
        let temp = (100 - event.target.value) / 100
        this.styles.opacity = temp
        this.changeStyles({ type: this.type, index: this.index, styles: {opacity: temp} })
      }
    }
  }
</script>

<style lang="less" scoped>
  .top-part {
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
    justify-content: center;
    align-items: center;
    .opacity-text {
      white-space: nowrap;
    }
    .slider-image {
      margin-left: 9px;
      width: 289px;
    }
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

  .icon-chacha {
    margin: 0 42px 0 18px;
  }

  .icon-xiaogougou {
    margin: 0 18px 0 42px;
  }

  .active {
    position: relative;
    color: #3FD36C;
    &:after {
      content: '';
      position: absolute;
      top: 26px;
      left: 9px;
      width: 20px;
      height: 2px;
      background-color: #3FD36C;
    }
  }
</style>
