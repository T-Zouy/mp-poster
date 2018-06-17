<template>
  <div class="logo">
    <div class="notice-text">为获得更好的视觉效果，建议上传PNG格式的透明背景图片</div>
    <div class="logo-container">
      <div class="logo-add">
        <i class="iconfont icon-cao-flat-Add"></i>
      </div>
      <div class="logo-item">
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logo'
  }
</script>

<style lang="less" scoped>
  .logo {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    padding: 9px 18px;
    .notice-text {
      color: #9B9B9B;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .logo-container {
    margin-top: 9px;
    display: flex;
    flex-wrap: wrap;
    .logo-add {
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      background-color: rgba(216, 216, 216, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .logo-item {
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      background-color: rgba(216, 216, 216, 0.1);
      img {
        width: 100%;
      }
    }
  }

  .icon-cao-flat-Add {
    color: #fff;
    font-size: 14px;
    line-height: 14px;
  }
</style>
