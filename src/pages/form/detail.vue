<template>
  <div class="form-container">
    <div class="submit-title-edit">
      <h1>{{formTitle.key_name}}</h1>
    </div>
    <div class="submit-body-edit">
      <div
        class="submit-body-item"
        :class="{ hasAllRadius: formBody.length === 1 }"
        v-for="(item, index) in formBody"
        :key="index">
        <div class="submit-body-item-content">
          <label v-if="item.type === 'key'">{{item.key_name}}</label>
          <input placeholder="请输入" v-model="item.value" />
        </div>
      </div>
    </div>
    <div class="submit-button-edit">
      <button class="submit-button" open-type="getUserInfo" @getuserinfo="handleFormSubmit">{{formButton.key_name}}</button>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { getFormDetail, handleSignup } from '@/api/create'
  import { formFormat } from '@/utils/formFormat'

  const { mapState, mapMutations } = createNamespacedHelpers('form')

  export default {
    data () {
      return {
        status: '',
        posterId: null
      }
    },

    computed: mapState([
      'formTitle',
      'formBody',
      'formButton'
    ]),

    methods: {
      ...mapMutations({
        deleteOneLine: 'handleFormDeleteOneLine',
        handleFormItemInit: 'handleFormItemInit'
      }),
      handleFormEditDetailFetch (templateId) {
        const query = {
          template_id: templateId
        }
        getFormDetail(query).then(res => {
          if (res.status.code === 0) {
            const formData = formFormat(res)
            console.log(formData)
            this.handleFormItemInit(formData)
          } else {
          }
        })
      },
      // 提交前处理表单格式，对应接口中的customer_info_data字段
      handleFormFormatBeforeApply (body) {
        return body.map(item => {
          delete item.type
          delete item.key_name
          if (!item.value) {
            item.value = ''
          }
          return item
        })
      },
      // 授权操作，处理接口中的customer_data字段
      handleAuthSetting () {
        return new Promise((resolve) => {
          let customerDetail = {}
          // 查看是否授权
          wx.getSetting({
            success: (res) => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: (res) => {
                    console.log(res.userInfo)
                    customerDetail = res.userInfo
                    resolve(customerDetail)
                  }
                })
              } else {
                resolve(customerDetail)
              }
            }
          })
        })
      },
      // 提交按钮逻辑操作
      async handleFormSubmit () {
        if (this.status === 'preview') {
          wx.showToast({
            title: '此为预览页面',
            icon: 'none'
          })
        } else {
          // 整体字段非空检验
          const isAccess = this.formBody.some(item => {
            return item.value
          })
          if (isAccess) {
            console.log('提交')
            const customerDetail = await this.handleAuthSetting()
            const formItems = this.handleFormFormatBeforeApply(this.formBody)
            const query = {
              id: this.posterId,
              customer_data: customerDetail,
              customer_info_data: formItems
            }
            console.log(query)
            handleSignup(query).then(res => {
              console.log(res)
              if (res.status.code === 0) {
                this.$router.push({
                  path: '/pages/form/signup-success'
                })
              }
            })
          } else {
            wx.showToast({
              title: '请填写字段',
              icon: 'none'
            })
          }
        }
      }
    },

    mounted () {
      const { type, posterId } = this.$route.query
      if (type && type === 'preview') {
        console.log('预览')
        this.status = 'preview'
      } else {
        console.log('报名')
        this.status = 'signup'
        this.posterId = posterId
        this.handleFormEditDetailFetch(posterId)
      }
    }
  }
</script>

<style lang="less">
  @body-color: #374044;
  @theme-color: #fff;
  @form-body-color: #fff;
  @label-color: #000;
  @border-color: #D8D8D8;
  @btn-color: #3FD36C;
  @button-top: 40px;
  @import url('../../assets/css/form.less');
</style>
