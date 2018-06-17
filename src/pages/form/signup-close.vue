<template>
  <div class="success-container">
    <div class="success-msg">
      <icon type="warn" size="80" color="#EC5F50"/>
      <p class="msg-one">报名已关闭</p>
      <p class="msg-two">抱歉，当前报名已关闭。感谢你的关注！</p>
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
  @import url('../../assets/css/signup-status.less');
</style>
