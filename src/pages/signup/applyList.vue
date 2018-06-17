<template>
  <div>
    <scroll-view scroll-x="true" scroll-y="true" style="width: 100%">
      <table class="table" :style="{width: tableWidth}">
        <tr class="section-top">
          <th class="section-top-item">报名者</th>
          <th class="section-top-item" v-for="item in fromFields" :key="item.id">{{item.key_name}}</th>
          <th class="section-top-item">时间</th>
        </tr>
        <tr class="sections" v-for="(item, i) in applyCustomerList" :key="item.id">
          <td class="sections-item user">
            <img class="user-icon" :src="item.avatarUrl" alt="user-icon">
            <span class="username">{{item.nickName}}</span>
            <i></i>
          </td>
          <td class="sections-item"
            v-for="(detail, j) in item.customer_info"
            :key="detail.conf_id"
            @click="handleMessageCopy(detail.value)">
            <span>{{detail.value}}</span>
          </td>
          <td class="sections-item time">
            <span>{{item.updated_at}}</span>
          </td>
        </tr>
      </table>
    </scroll-view>
  </div>
</template>

<script>
  import { getApplyCustomerList } from '@/api/signup'
  import { handleDateShow } from '@/utils/formFormat'

  export default {
    data () {
      return {
        fromFields: null,
        applyCustomerList: null,
        tableWidth: null
      }
    },

    methods: {
      // 点击复制
      handleMessageCopy (word) {
        wx.setClipboardData({
          data: word,
          success: () => {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
          }
        })
      },
      handleFormListData (item) {
        console.log(item.customer_info)
        item.updated_at = handleDateShow(item.updated_at)
        item.customer_info.map(detail => {
          if (!detail.value) {
            detail.value = '未填写'
          }
          return detail
        })
        return item
      },
      handleApplyCustomersFetch () {
        const query = {
          scene: wx.getStorageSync('scene'),
          id: this.$route.query.posterId,
          page: 1,
          per_page: 500
        }
        getApplyCustomerList(query).then(res => {
          console.log(res)
          if (res.status.code === 0) {
            // 动态设置table的width属性
            const customerNum = res.data.list ? `（${res.data.list.length}）` : ''
            const formFieldsNum = res.data.from_fields ? res.data.from_fields.length : 0
            this.tableWidth = formFieldsNum ? (formFieldsNum + 2) * 150 + 'px' : '0px'
            this.fromFields = res.data.from_fields
            this.applyCustomerList = res.data.list.map(item => this.handleFormListData(item))
            wx.setNavigationBarTitle({
              title: `报名数据${customerNum}`
            })
          }
        })
      }
    },

    mounted () {
      this.handleApplyCustomersFetch()
    }
  }
</script>

<style lang="less">
  .table{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    text-align: center;
    .section-top{
      display: flex;
      align-items: center;
      height: 34px;
      background: #F0F0F0;
      color: #666666;
      border-top: 1px solid #CCCCCC;
      border-bottom: 1px solid #CCCCCC;
      font-size: 14px;
      .section-top-item {
        width: 150px;
      }
    }
    .sections{
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #dddddd;
      .sections-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 56px;
        width: 150px;
        font-size: 15px;
        color: #000000;
        span {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .user {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .user-icon {
          width: 36px;
          height: 36px;
          margin-left: 15px;
          border-radius: 4px;
        }
        .username {
          padding: 0 5px;
        } 
      }
      .time {
        font-size: 12px;
        color: #999999;
      }
    }
  }
</style>
