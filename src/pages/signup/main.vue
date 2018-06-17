<template>
  <div class="signup-container">
    <div class="my-sheet-content" v-for="item in sheetList" @click="handleSheetOperate" :key="item.id">
      <div class="sheet-img" @click.stop="handleImgShow(item.cover_url)">
        <img :src="item.cover_url" alt="模板展示图">
      </div>
      <div class="sheet-detail">
        <div class="sheet-detail-item">
          <span class="scan-icon">
            扫码:<strong>{{item.scan_code_num}}</strong>人
            <i class="more-icon"></i>
          </span>
        </div>
        <div class="sheet-detail-item">
          <span class="signup-icon">报名:<strong>{{item.sign_up_num}}</strong>人</span>
        </div>
        <div class="sheet-detail-item">
          <span class="change-icon">转化:<strong>{{item.changNum}}%</strong></span>
        </div>
        <div class="sheet-time">
          <span class="time-icon">编辑于 {{item.updated_at}}</span>
        </div>
        <div class="sheet-action">
          <a @click.stop="handleDownload(item.cover_url)">下载</a>
          <a @click.stop="handleSheetEdit(item.id)">编辑</a>
          <a @click.stop="goToApplyList(item.id)">报名者</a>
        </div>
      </div>
    </div>
    <a @click.stop="test">开发测试</a>
  </div>
</template>

<script>
  import { getMyCreatedApplyList } from '@/api/signup'
  import { handleDateShow } from '@/utils/formFormat'

  export default {
    data () {
      return {
        sheetList: [
          { cover_url: 'https://cn.vuejs.org/images/lifecycle.png', id: 1 },
          { cover_url: 'https://cn.vuejs.org/images/lifecycle.png', id: 2 },
          { cover_url: 'https://cn.vuejs.org/images/lifecycle.png', id: 3 }
        ],
        scanNum: '',
        applyNum: '',
        changNum: ''
      }
    },

    methods: {
      // 获取我创建的海报数据
      handleFormListFetch () {
        const scene = wx.getStorageSync('scene')
        getMyCreatedApplyList({scene}).then(res => {
          console.log(res)
          if (res.status.code === 0) {
            this.sheetList = res.data.list.map(item => {
              item.updated_at = handleDateShow(item.updated_at)
              item.changNum = item.scan_code_num === 0 ? '0.00' : (item.sign_up_num / item.scan_code_num).toFixed(2)
              return item
            })
          }
        })
      },
      // 操作ActionSheet弹出
      handleSheetOperate () {
        wx.showActionSheet({
          itemList: ['关闭报名', '复制', '删除'],
          success: res => {
            const tapIndex = res.tapIndex
            if (tapIndex === 0) {
            } else {
            }
          },
          fail: res => {
            console.log(res.errMsg)
          }
        })
      },
      // 显示模板大图
      handleImgShow (imgUrl) {
        wx.previewImage({
          current: imgUrl, // 当前显示图片的http链接
          urls: [imgUrl] // 需要预览的图片http链接列表
        })
      },
      // 操作模板图片下载
      handleDownload (imgUrl) {
        wx.showLoading()
        wx.downloadFile({
          url: imgUrl,
          success: res => {
            wx.hideLoading()
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: () => {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail: () => {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({
              title: '网络不稳定，请稍后再试',
              icon: 'none'
            })
          }
        })
      },
      // 处理编辑按钮
      handleSheetEdit (id) {
        this.$router.push({
          path: '/pages/poster/edit',
          query: {
            isEdit: true,
            template_id: id
          }
        })
      },
      // 处理报名者按钮
      goToApplyList (posterId) {
        this.$router.push({
          path: '/pages/signup/applyList',
          query: {
            posterId
          }
        })
      },
      test () {
        this.$router.push({
          path: '/pages/form/signup-close'
        })
      }
    },

    onShow () {
      this.handleFormListFetch()
    }
  }
</script>

<style>
  .signup-container {
    height: 100vh;
    background: #f0f0f0;
  }
  .my-sheet-content {
    display: flex;
    padding: 15px;
    border-top: 1px solid #ddd;
    background: #fff;
  }
  .my-sheet-content:last-of-type {
    border-bottom: 1px solid #ddd;
  }
  .sheet-img {
    width: 88px;
    height: 145px;
    box-shadow: 0px 6px 10px #e1e1e1;
  }
  .sheet-img img {
    width: 100%;
    height: 100%;
  }
  .sheet-detail {
    flex: 1;
    height: 145px;
    margin-left: 10px;
    font-size: 14px;
    color: #666;
  }
  .sheet-detail strong {
    display: inline;
    padding: 0 4px 0 2px;
    color: #000;
    font-weight: 600;
  }
  .sheet-detail-item {
    position: relative;
  }
  .sheet-detail-item span, .sheet-time span {
    padding-left: 18px;
    background-size: 13px 13px;
    background-position: left center;
    background-repeat: no-repeat;
  }
  .sheet-detail-item span {
    height: 24px;
    line-height: 24px;
  }
  .sheet-time span {
    height: 50px;
    line-height: 50px;
    color: #aaa;
  }
  .scan-icon {
    background: url('../../assets/img/scan.png')
  }
  .more-icon {
    position: absolute;
    display: inline-block;
    top: 2px;
    right: 0;
    width: 20px;
    height: 20px;
    background: url('../../assets/img/more.png') top center no-repeat;
    background-size: 20px 20px;
  }
  .signup-icon {
    background: url('../../assets/img/signup.png')
  }
  .change-icon {
    background: url('../../assets/img/change.png')
  }
  .time-icon {
    background: url('../../assets/img/time.png')
  }
  .sheet-action {
    display: flex;
    justify-content: space-between;
  }
  .sheet-action a {
    width: 76px;
    height: 22px;
    border: 1px solid #3FD36C;
    border-radius: 4px;
    line-height: 22px;
    color: #3FD36C;
    text-align: center;
  }
</style>
