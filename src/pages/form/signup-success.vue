<template>
  <div class="success-container">
    <div class="success-msg">
      <icon type="success" size="80" color="#3FD36C"/>
      <p class="msg-one">提交成功</p>
      <p class="msg-two">你的报名已提交成功，请耐心等待</p>
    </div>
    <div class="contact-btn">
      <a>请尽快联系我</a>
    </div>
    <div class="create-signup">
      <span @click="goToCreatePage">我要创建报名</span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userInfo: {},
        tempLists: []
      }
    },

    components: {
    },

    methods: {
      goToCreatePage () {
        wx.switchTab({
          url: '/pages/create/templates'
        })
      }
    },

    mounted () {
    }
  }
</script>

<style lang="less">
  .success-container {
    margin: 40px 15px;
    .success-msg {
      text-align: center;
      .msg-one {
        margin-top: 30px;
        font-size: 18px;
        font-weight: 600;
        color: #2D3034;
      }
      .msg-two {
        margin-top: 12px;
        font-size: 13px;
        font-weight: 300;
        color: #9B9B9B;
      }
    }
    .contact-btn {
      margin-top: 100px;
      a {
        // width: 76px;
        height: 50px;
        border: 1px solid #3FD36C;
        border-radius: 8px;
        line-height: 50px;
        color: #3FD36C;
        text-align: center;
      }
    }
    .create-signup {
      position: absolute;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      font-weight: 300;
      color: #467DB9;
    }
  }
</style>
