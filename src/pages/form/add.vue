<template>
  <div class="form-container">
    <div class="submit-title-edit" @click="handleAddOrEdit('title', 'edit')">
      <h1>{{formTitle.key_name}}</h1>
      <i class="iconfont icon-edit edit-icon"></i>
      <!-- <i class="edit-icon"></i> -->
    </div>
    <div class="submit-body-edit">
      <div
        class="submit-body-item"
        :class="{ hasAllRadius: formBody.length === 1 }"
        v-for="(item, index) in formBody"
        :key="index">
        <i class="iconfont icon-shanchu delete-icon" @click="deleteOneLine(index)"></i>
        <div class="submit-body-item-content">
          <label v-if="item.type === 'key'">{{item.key_name}}</label>
          <input placeholder="请输入" disabled/>
        </div>
        <i class="iconfont icon-edit edit-icon-body" @click="handleAddOrEdit('key', 'edit', index)"></i>
      </div>
    </div>
    <div class="submit-body-add" @click="handleAddOrEdit('key', 'add')">
      <i class="iconfont icon-add add-icon"></i>
    </div>
    <div class="submit-button-edit" @click="handleAddOrEdit('submit-btn', 'edit')">
      <button class="submit-button">{{formButton.key_name}}</button>
      <i class="iconfont icon-edit edit-icon"></i>
    </div>
    <div class="form-edit-footer">
      <i class="iconfont icon-chacha cancle" @click="handleFormCancle"></i>
      <span @click="handleFormPreview">预览表单</span>
      <i class="iconfont icon-xiaogougou save" @click="handleFormSave"></i>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { saveForm, editForm, getFormDetail } from '@/api/create'
  import { formFormat } from '@/utils/formFormat'

  const { mapState, mapMutations } = createNamespacedHelpers('form')

  export default {
    data () {
      return {
        templateId: null,
        isEdit: false
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
        handleFormItemInit: 'handleFormItemInit',
        resetData: 'resetData'
      }),
      /**
        * form元素新增、编辑
        * type（编辑类型）：标题（title），表单元素（key），提交按钮（submit-btn）
        * status（状态：add、edit）
        * index（修改的索引）
        */
      handleAddOrEdit (type, status, index) {
        this.$router.push({
          path: '/pages/form/label-edit',
          query: {
            type,
            status,
            index
          }
        })
      },
      handleDataToOwnWanted (item) {
        const query = {
          type: item.type,
          key_name: item.key_name
        }
        return query
      },
      handleFormEditDetailFetch (templateId) {
        const query = {
          template_id: templateId
        }
        getFormDetail(query).then(res => {
          if (res.status.code === 0) {
            const formData = formFormat(res)
            this.handleFormItemInit(formData)
          } else {
          }
        })
      },
      handleFormCancle () {
        wx.navigateBack()
      },
      handleAfterSuccess (res, isEdit) {
        if (res.status.code === 0) {
          wx.navigateBack()
          wx.showToast({
            title: isEdit ? '编辑成功' : '创建成功',
            icon: 'none'
          })
          this.resetData()
        } else {
          wx.showToast({
            title: res.status.msg,
            icon: 'none'
          })
        }
      },
      handleFormSave () {
        const confValue = [this.formTitle, ...this.formBody, this.formButton]
        const query = {
          template_id: this.templateId,
          scene: wx.getStorageSync('scene'),
          conf_value: confValue
        }
        if (this.isEdit) {
          editForm(query).then(res => {
            this.handleAfterSuccess(res, true)
          })
        } else {
          saveForm(query).then(res => {
            this.handleAfterSuccess(res)
          })
        }
      },
      handleFormPreview () {
        this.$router.push({
          path: '/pages/form/detail',
          query: {
            type: 'preview'
          }
        })
      }
    },

    beforeMount () {
      const templateId = this.$route.query.template_id
      const isEdit = this.$route.query.isEdit
      this.templateId = templateId
      this.isEdit = isEdit
      if (isEdit) {
        this.handleFormEditDetailFetch(templateId)
      }
    }
  }
</script>

<style lang="less">
  @body-color: #353D41;
  @theme-color: #999D9F;
  @form-body-color: #9B9EA0;
  @label-color: #181D20;
  @border-color: #757B7E;
  @btn-color: #3D8553;
  @button-top: 0;
  @import url('../../assets/css/form.less');
</style>
