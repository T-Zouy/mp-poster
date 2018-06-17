<template>
  <div class="components-container">
    <div class="components-item">
      <h2 class="type-title">基础元素</h2>
      <div class="type-content">
        <div class="type-content-item">
          <p class="type-name">横向文本</p>
        </div>
        <div class="type-content-item">
          <p class="type-name vertical">竖排文本</p>
        </div>
        <div class="type-content-item" @click="go('/pages/module/art-font')">
          <!-- <p class="type-name">艺术字体</p> -->
          <img class="type-name art-font" src="../../assets/img/art-font.png" alt="艺术字体">
        </div>
      </div>
    </div>
    <div class="components-item">
      <h2 class="type-title">品牌标志</h2>
      <div class="type-content">
        <div class="type-content-item" @click="go('/pages/module/logo')">
          <p class="type-name">LOGO</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userInfo: {},
        tempLists: 5
      }
    },
    components: {},
    methods: {
      go (path) {
        this.$router.push({
          path: path
        })
      },
      goToTempDetail () {
        this.$router.push({
          path: '/pages/create/detail'
        })
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .components-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 10px 20px;
    background: #333;
  }

  .components-item {
  }

  .type-title {
    font-size: 13px;
    color: #9B9B9B;
    height: 20px;
    line-height: 20px;
  }

  .type-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 10px 0 16px;
  }

  .type-content-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 77px;
    height: 77px;
    margin-bottom: 10px;
    margin-right: 10px;
    background: #434343;
  }

  .type-name {
    font-size: 13px;
    color: #fff;
    line-height: 17px;
  }

  .vertical {
    writing-mode: vertical-lr;
  }

  .art-font {
    display: block;
    width: 59px;
    height: 19px;
  }
</style>
