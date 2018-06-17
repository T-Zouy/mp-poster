<template>
  <div class="footer">
    <div class="left">
      <div class="item" @click="handleClick('background')">
        <i class="iconfont icon-beijing"></i>
        背景
      </div>
      <div class="item" @click="handleClick('component')">
        <i class="iconfont icon-zujian"></i>
        组件
      </div>
      <div class="item" @click="handleClick('form')">
        <i class="iconfont icon-xinxi"></i>
        表单
      </div>
    </div>
    <div class="right" @click="handleClick('save')">
      <i class="iconfont icon-right icon-baocun"></i>
      保存
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-footer',
    methods: {
      /*
      * type: background-背景；module-组件；form-表单；save-保存
      * */
      handleClick (type) {
        this.$emit('edit', type)
      }
    }
  }
</script>

<style scoped>
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: #fafafa;
    display: flex;
  }
  .left {
    width: 257px;
    display: flex;
  }
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #37B35D;
    font-size: 13px;
  }
  .iconfont {
    width: 18px;
    height: 18px;
    margin-right: 4px;
    font-size: 18px;
    color: #6AE584;
  }

  .right {
    width: 128px;
    height: 100%;
    background-color: #3FD36C;
    color: #fff;
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-baocun {
    width: 18px;
    height: 18px;
    margin-right: 3px;
    color: #fff;
  }
</style>
