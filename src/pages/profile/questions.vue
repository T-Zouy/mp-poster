<template>
  <div class="questions">
    <div class="title">这里是问题(文案未补充)</div>
    <div class="answers">
      1.这里是答案的说明这里是答案的说明这里是答案的说明这里是答案的说明这里是答案的说明。
    </div>
  </div>
</template>

<script>
  export default {
    name: 'questions'
  }
</script>

<style lang="less" scoped>
  .questions {
    box-sizing: border-box;
    width: 100vw;
    background-color: #fff;
    padding: 11px 22px 0 13px;
    .title {
      color: #000;
      font-size: 16px;
      line-height: 22px;
    }
    .answers {
      margin-top: 14px;
      color: #999;
      font-size: 14px;
      line-height: 20px;
    }
  }
</style>
