<template>
  <div class="signup-container">
    <follow-component v-if="followCpVisible"></follow-component>
    <div class="my-sheet-content" v-for="(item, index) in sheetList" @click="handleSheetOperate(index, item.id, item.is_stop)" :key="item.id">
      <div class="sheet-img" @click.stop="handleImgShow(item.cover_url)">
        <div v-if="item.is_stop === 1" class="mark"></div>
        <img :src="item.cover_url" alt="模板展示图">
      </div>
      <div class="sheet-detail">
        <div class="sheet-detail-item">
          <span class="scan-icon">
            <i class="iconfont icon-saoma icon-normal"></i>
            扫码:<strong>{{item.scan_code_num}}</strong>人
          </span>
          <!-- <i class="more-icon"></i> -->
          <i class="iconfont icon-shenglve more-icon"></i>
        </div>
        <div class="sheet-detail-item">
          <span class="signup-icon">
            <i class="iconfont icon-baoming-1 icon-normal"></i>
            报名:<strong>{{item.sign_up_num}}</strong>人
          </span>
        </div>
        <div class="sheet-detail-item">
          <span class="change-icon">
            <i class="iconfont icon-zhuanhua icon-normal"></i>
            转化:<strong>{{item.changNum}}%</strong>
          </span>
        </div>
        <div class="sheet-time">
          <span class="time-icon">
            <i class="iconfont icon-shijian icon-normal"></i>
            编辑于 {{item.updated_at}}
          </span>
        </div>
        <div class="sheet-action">
          <a @click.stop="handleDownload(item.cover_url)" :class="{disabled: item.is_stop === 1}">下载</a>
          <a @click.stop="handleSheetEdit(item.id)" :class="{disabled: item.is_stop === 1}">编辑</a>
          <a @click.stop="goToApplyList(item.id)">报名者</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FollowComponent from '@/components/common/follow'
  import { getMyCreatedApplyList, copyPoster, deletePoster, closeOrOpenPoster } from '@/api/signup'
  import { handleUserSubscribe } from '@/api/login'
  import { handleDateShow } from '@/utils/formFormat'

  export default {
    data () {
      return {
        sheetList: [], // 我创建的海报列表
        followCpVisible: false // 关注公众号组件可见性
      }
    },

    components: {
      FollowComponent
    },

    methods: {
      // 获取我创建的海报数据
      handleFormListFetch () {
        const scene = wx.getStorageSync('scene')
        getMyCreatedApplyList({scene}).then(res => {
          if (res.status.code === 0) {
            this.sheetList = res.data.list.map(item => {
              item.updated_at = handleDateShow(item.updated_at)
              item.changNum = item.scan_code_num === 0 ? '0.00' : ((item.sign_up_num / item.scan_code_num) * 100).toFixed(2)
              return item
            })
          }
        })
      },
      /**
       * 操作ActionSheet弹出
       * index：当前的索引；posterID：海报id；isStop：是否关闭
       */
      handleSheetOperate (index, posterId, isStop) {
        const actionName = isStop === 0 ? '关闭报名' : '开启报名'
        wx.showActionSheet({
          itemList: [actionName, '复制', '删除'],
          success: res => {
            const tapIndex = res.tapIndex
            let query = {
              id: posterId,
              scene: wx.getStorageSync('scene')
            }
            if (tapIndex === 0) {
              // 开启/关闭报名操作
              if (isStop === 0) {
                query = Object.assign(query, {is_stop: 1})
                this.handleOpenOrClosePoster(query)
              } else {
                query = Object.assign(query, {is_stop: 0})
                this.handleOpenOrClosePoster(query)
              }
            } else if (tapIndex === 1) {
              // 复制海报
              copyPoster(query).then(res => {
                if (res.status.code === 0) {
                  this.$router.push({
                    path: '/pages/poster/edit',
                    query: {
                      isEdit: true,
                      template_id: res.data.template_id
                    }
                  })
                }
              })
            } else if (tapIndex === 2) {
              // 删除海报
              deletePoster(query).then(res => {
                if (res.status.code === 0) {
                  this.sheetList.splice(index, 1)
                  wx.showToast({
                    title: '删除成功'
                  })
                }
              })
            }
          },
          fail: res => {
            console.log(res.errMsg)
          }
        })
      },
      // 开启关闭海报接口操作
      handleOpenOrClosePoster (query) {
        closeOrOpenPoster(query).then(res => {
          if (res.status.code === 0) {
            this.handleFormListFetch()
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
      this.handleFormListFetch()
      this.handleFellowVisible()
    }
  }
</script>

<style lang="less">
  .signup-container {
    height: 100vh;
    background: #f0f0f0;
    .my-sheet-content {
      display: flex;
      padding: 15px;
      border-top: 1px solid #ddd;
      background: #fff;
      &:last-of-type {
        border-bottom: 1px solid #ddd;
      }
      .sheet-img {
        position: relative;
        width: 88px;
        height: 145px;
        box-shadow: 0px 6px 10px #e1e1e1;
        .mark {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: #ccc;
          z-index: 9;
          opacity: .7;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sheet-detail {
        flex: 1;
        height: 145px;
        margin-left: 10px;
        font-size: 14px;
        color: #666;
        strong {
          display: inline;
          padding: 0 4px 0 2px;
          color: #000;
          font-weight: 600;
        }
        .sheet-detail-item, .sheet-time {
          .icon-normal {
            display: inline-block;
            font-size: 14px;
            color: #bbb;
          }
        }
        .sheet-detail-item {
          position: relative;
          span {
            height: 24px;
            line-height: 24px;
          }
        }
        .sheet-time {
          span {
            height: 50px;
            line-height: 50px;
            color: #aaa;
          }
        }
      }
    }
  }
  .more-icon {
    position: absolute;
    display: inline-block;
    top: 2px;
    right: 0;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #666;
  }
  .sheet-action {
    display: flex;
    justify-content: space-between;
    a {
      width: 76px;
      height: 22px;
      border: 1px solid #3FD36C;
      border-radius: 4px;
      line-height: 22px;
      color: #3FD36C;
      text-align: center;
    }
    .disabled {
      border: 1px solid #ccc;
      color: #ccc;
    }
  }
</style>
