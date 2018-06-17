<template>
  <div class="profile">
    <div class="info">
      <img class="avatar" src="" alt="">
      <div class="name">登陆</div>
    </div>

    <div class="part">
      <div class="part-item" @click="go('/pages/profile/registration-notice')">
        <div class="item-name">报名通知</div>
        <div class="right">
          <span>全部推送</span>
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
      <div class="part-item" @click="go('/pages/profile/code-poster')">
        <div class="item-name">一图一码</div>
        <div class="right">
          <span>已开启</span>
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
    </div>

    <div class="part">
      <div class="part-item" @click="go('/pages/profile/questions')">
        <div class="item-name">常见问题</div>
        <div class="right">
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
      <div class="part-item">
        <div class="item-name">关于海草云</div>
        <div class="right">
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
    </div>

    <div class="part">
      <div class="part-item">
        <div class="item-name">联系客服</div>
        <div class="right">
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
      <div class="part-item" @click="go('/pages/profile/suggestion')">
        <div class="item-name">提点意见</div>
        <div class="right">
          <i class="iconfont icon-cao-flat-Arrow"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      go (path) {
        this.$router.push({
          path: path
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  div {
    box-sizing: border-box;
  }
  .profile {
    background-color: #F0F0F0;
    height: 100vh;
  }
  .info {
    background-color: #fff;
    height: 145px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar {
      margin-top: 24px;
      width: 70px;
      height: 70px;
      border-radius: 35px;
      box-shadow: 0 2px 9px 0 #E5E5E5;
    }
    .name {
      margin-top: 12px;
      color: #000;
      font-size: 15px;
      line-height: 21px;
    }
  }

  .part {
    margin-top: 10px;
    background-color: #fff;
    padding-left: 15px;
    .part-item {
      height: 60px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-child(2) {
        border-bottom: none;
      }
      .item-name {
        color: #333;
        font-size: 16px;
        line-height: 22px;
      }
      .right {
        display: flex;
        align-items: center;
        margin-right: 20px;
        span {
          margin-right: 10px;
          color: #999;
          font-size: 13px;
          line-height: 17px;
        }
        .iconfont {
          transform: rotate(-90deg);
          color: #bbb;
          font-size: 15px;
          line-height: 15px;
        }
      }
    }
  }
</style>
