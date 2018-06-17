<template>
  <div class="pictures-container">
    <div class="images-box">
      <img
        v-for="item in pictureList"
        :key="item.id"
        class="images-item"
        lazy-load="true"
        mode="aspectFill"
        :src="item.url"
        alt="高清图库"
        @click="goToImgClip(item)">
    </div>
  </div>
</template>

<script>
  import { getPictureStoreList } from '../../api/create'

  export default {
    components: {
    },
    data () {
      return {
        pictureList: [],
        pageNum: 1,
        pageSize: 20
      }
    },
    methods: {
      // 路由跳转到裁剪页面
      goToImgClip (item) {
        this.$router.push({
          path: '/pages/create/pictureClip',
          query: {
            imgUrl: item.url
          }
        })
      },
      // 获取图片列表
      handlePictureListFetch () {
        const query = {
          page: this.pageNum,
          per_page: this.pageSize
        }
        getPictureStoreList(query).then(res => {
          this.pictureList = res.data.list
        })
      }
    },
    mounted () {
      this.handlePictureListFetch()
    }
  }
</script>

<style>
  .pictures-container {
    margin: 6px 0px;
  }
  .images-box {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  .images-item {
    width: 30%;
    height: 195px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
</style>
