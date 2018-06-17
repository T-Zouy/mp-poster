<template>
  <div class="text-edit">
    <div class="input-area">
      <textarea class="textarea" name="" id="" placeholder="请输入文字"
                :style="{textAlign: textAlign}"
                placeholder-class="ph-style" maxlength="140" :value="value"
                @confirm="completeInput" />
    </div>
    <div class="icon-list">
      <i class="iconfont" @click="changeTextAlign('left')"></i>
      <i class="iconfont" @click="changeTextAlign('center')"></i>
      <i class="iconfont" @click="changeTextAlign('right')"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'text-edit',
    data () {
      return {
        value: '',
        textAlign: 'center'
      }
    },
    methods: {
      changeTextAlign (type) {
        let tempValue = this.value
        this.textAlign = type
        this.value = tempValue
      },
      completeInput (e) {
        console.log(e)
        console.log(this.value)
      }
    }
  }
</script>

<style lang="less" scoped>
  .text-edit {
    width: 100vw;
    height: 100vh;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-area {
    margin-top: 118px;
    height: 150px;
    max-width: 690px;
    display: flex;
    flex-direction: column;
    .textarea {
      color: #fff;
      font-size: 18px;
      line-height: 25px;
    }
  }

  .ph-style {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    line-height: 25px;
    /*writing-mode: vertical-lr;*/
  }

  .icon-list {
    margin-top: 20px;
    background-color: rgba(255, 255, 255, .3);
    width: 80px;
    display: flex;
    justify-content: space-between;
    .iconfont {
      width: 16px;
      height: 16px;
      border: 1px solid red;
      color: rgba(255, 255, 255, .15);
      font-size: 14px;
      line-height: 16px;
    }
  }
</style>
