<template>
  <div class="art-font">
    <div class="title">选择艺术字体</div>
    <div class="fonts">
      <div class="font-item" @click="handleChoose('HYLingXinTiF')" style="font-family: HYLingXinTiF;">
        {{text}}
      </div>
      <div class="font-item" @click="handleChoose('HYBaoSongF')" style="font-family: HYBaoSongF;">
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'art-font',
    data () {
      return {
        text: '海草报名，十秒钟制作朋友圈海报'
      }
    },
    methods: {
      ...mapActions({
        addModule: 'addModule'
      }),
      handleChoose (fontFamily) {
        let module = {
          text: '点击输入文字',
          disable: true,
          style: {
            top: 1,
            left: 1,
            width: 200,
            height: 100,
            scale: 1,
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
            textDecoration: 'none',
            textShadow: 'none',
            opacity: 1,
            fontFamily: fontFamily
          }
        }
        this.addModule({type: 'textModules', module: module})
        this.$router.push({
          path: '/pages/poster/edit'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/css/font.css";

  .art-font {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    padding: 9px 18px;
    .title {
      color: #9B9B9B;
      font-size: 13px;
      line-height: 20px;
    }
    .fonts {
      margin-top: 10px;
      width: 100%;
      .font-item {
        background-color: rgba(216, 216, 216, 0.1);
        margin-bottom: 20px;
        width: 340px;
        height: 45px;
        color: #fff;
        font-size: 18px;
        line-height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
