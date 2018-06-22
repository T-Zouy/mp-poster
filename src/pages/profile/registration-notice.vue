<template>
  <div class="registration-notice">
    <follow-component v-if="followCpVisible"></follow-component>
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
  import FollowComponent from '@/components/common/follow'
  import { handleUserSubscribe } from '@/api/login'
  
  export default {
    name: 'registration-notice',
    data () {
      return {
        followCpVisible: false
      }
    },

    components: {
      FollowComponent
    },

    methods: {
      handleChange (e) {
        console.log(e)
      },
      // 关注公众号可见性
      handleFellowVisible () {
        handleUserSubscribe({
          scene: wx.getStorageSync('scene')
        }).then(res => {
          if (res.status.code === 0) {
            if (res.data) {
              this.followCpVisible = false
            } else {
              this.followCpVisible = true
            }
          }
        })
      }
    },

    onShow () {
      this.handleFellowVisible()
    }
  }
</script>

<style lang="less" scoped>
  .registration-notice {
    width: 100vw;
    height: 100vh;
    background-color: #F0F0F0;
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
