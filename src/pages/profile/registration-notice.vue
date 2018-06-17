<template>
  <div class="registration-notice">
    <div class="notice">
      <div class="left">
        <i class="iconfont"></i>
        <span>关注公众号，及时接收报名通知</span>
      </div>
      <div class="btn-notice">立即关注</div>
    </div>
    <radio-group class="checkbox" name="checkbox" @change="handleChange">
      <label class="push all">
        <div class="text">全部推送</div>
        <radio value="checkbox1"/>
      </label>
      <label class="push three-times">
        <div class="text">仅推送每天前3次</div>
        <radio value="checkbox2"/>
      </label>
    </radio-group>
  </div>
</template>

<script>
  export default {
    name: 'registration-notice',
    methods: {
      handleChange (e) {
        console.log(e)
      }
    }
  }
</script>

<style lang="less" scoped>
  @theme-color: #3FD36C;

  .registration-notice {
    width: 100vw;
    height: 100vh;
    background-color: #F0F0F0;
  }

  .notice {
    box-sizing: border-box;
    width: 100vw;
    height: 50px;
    padding: 0 12px 0 15px;
    background-color: #fff;
    color: @theme-color;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .iconfont {
        width: 18px;
        height: 18px;
        border: 1px solid red;
        margin-right: 10px;
      }
    }
    .btn-notice {
      width: 85px;
      height: 34px;
      border: 1px solid @theme-color;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .checkbox {
    box-sizing: border-box;
    margin-top: 20px;
    padding-left: 10px;
    background-color: #fff;
    .push {
      height: 60px;
      box-sizing: border-box;
      padding-right: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        color: #000;
        font-size: 16px;
        line-height: 22px;
      }
    }
    .all {
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
    }
  }
</style>
