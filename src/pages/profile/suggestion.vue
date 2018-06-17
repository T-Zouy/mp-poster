<template>
  <div class="suggestion">
    <div class="title">你的建议将帮助海草云做得更好</div>
    <div class="info">
      <div class="name">
        <span>姓名</span>
        <input type="text" placeholder="请输入">
      </div>
      <div class="phone">
        <span>手机</span>
        <input type="text" placeholder="请输入">
      </div>
    </div>
    <div class="suggest">
      <div class="text">你的建议</div>
      <div class="detail">请输入</div>
    </div>
    <div class="btn-submit">提交</div>
  </div>
</template>

<script>
  export default {
    name: 'suggestion'
  }
</script>

<style lang="less" scoped>
  .suggestion {
    width: 100vw;
    height: 100vh;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-top: 37px;
    color: #fff;
    font-size: 22px;
    line-height: 30px;
  }
  .info {
    box-sizing: border-box;
    margin-top: 36px;
    width: 285px;
    height: 83px;
    border-radius: 8px;
    background-color: #fff;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    .name,
    .phone {
      flex: 1;
      display: flex;
      align-items: center;
      color: #000;
      font-size: 15px;
      line-height: 22px;
      span {
        margin-right: 38px;
      }
    }
    .name {
      border-bottom: 1px solid #d8d8d8;
    }
  }

  .suggest {
    margin-top: 20px;
    .text {
      margin-left: 14px;
      color: #fff;
      font-size: 14px;
      line-height: 22px;
    }
    .detail {
      box-sizing: border-box;
      margin-top: 5px;
      width: 285px;
      height: 100px;
      border-radius: 8px;
      background-color: #fff;
      padding: 10px 14px;
      color: #B2B2B2;
      font-size: 15px;
      line-height: 22px;
    }
  }

  .btn-submit {
    margin-top: 50px;
    width: 285px;
    height: 40px;
    background-color: #3FD36C;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
