<template>
  <div class="code-poster">
    <div class="btn-switch">
      <div class="left">一图一码</div>
      <switch class="switch" @change="handleSwitch" />
    </div>
    <div class="text-notice first">
      1.开启一图一码时，每次调整后的海草报名将具有唯一性，不显示往期海报的报名数据。用户扫码进入，仍将看到对应的报名内容。
    </div>
    <div class="text-notice">
      2.此功能的设置，有益于分发不同样式的海报时，测试每张海报的报名效果。
    </div>
    <div class="text-notice">
      3.注意：开启一图一码后，多张海草报名的海报数据仍属于当前账户，你可以放心使用。
    </div>
  </div>
</template>

<script>
  export default {
    name: 'code-poster',
    data () {
      return {}
    },
    methods: {
      handleSwitch (event) {
        console.log(event)
      }
    }
  }
</script>

<style lang="less" scoped>
  .code-poster {
    width: 100vw;
    height: 100vh;
    background-color: #F0F0F0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .btn-switch {
      box-sizing: border-box;
      margin-top: 6px;
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: #000;
        font-size: 16px;
        line-height: 22px;
      }
      .switch {
        color: #3FD36C;
      }
    }
    .text-notice {
      margin-top: 24px;
      width: 340px;
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
    .first {
      margin-top: 32px;
    }
  }
</style>
