<template>
    <el-dialog class="basicDialog" :class="config.size" v-model="config.visible" :title="config.title"
      :width="config.width" :destroy-on-close="config.destroyOnClose"
      :close-on-click-modal="config.closeClickModel ? false : true" :draggable="config.draggable" @close="closeDialog">
      <slot name="default"></slot>
      <template v-for="item in config?.slots" :key="item">
        <slot :name="item"></slot>
      </template>
      <ActionBtnGroup v-if="config.actionBtnConfig" :btnConfigData="config.actionBtnConfig"></ActionBtnGroup>
      <BasicSearchBar v-if="config.searchConfig" :searchGroupConfig="config?.searchConfig"
        :actionBtnConfigData="config?.btnConfig" />
      <BasicForm v-if="config.formConfig" ref="basicFormRef" :config="config.formConfig">
        <template v-for="item in config?.formConfig?.slots" :key="item" #[item]="{ formItem }">
          <slot :name="item" :scoped="formItem" :formItem="formItem"></slot>
        </template>
      </BasicForm>
      <BasicTable ref="basicTableRef" v-if="config.tableConfig" :tableConfig="config.tableConfig">
        <template v-for="item in config?.tableConfig?.slots" :key="item" #[item]="{ row }">
          <slot :name="item" :scoped="row"></slot>
        </template>
      </BasicTable>
      <template v-if="config.footer.show" #footer>
        <el-button v-for="btn in config.footer.btns" v-bind="btn.customAttribute" :disabled="btn.disabled"
          :type="btn.type" :key="btn.key" @click="btn.click(formData)">{{ btn.text }}
        </el-button>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { ref, reactive, defineProps, computed, defineExpose } from "vue";
  import BasicForm from "../../BasicForm/src/basicForm.vue";
  import BasicTable from "../../BasicTable/src/basicTable.vue";
  import BasicSearchBar from "../../BasicSearchBar/src/basicSearchBar.vue";
  import ActionBtnGroup from "../../ActionBtnGroup/src/actionBtnGroup.vue";
  
  const props = defineProps(["config"]);
  const basicFormRef = ref(null);
  const basicTableRef = ref(null);
  const basicSearchBar = ref(null);
  
  const formData = computed({
    get: () => {
      return basicFormRef.value.getFormData();
    },
  });
  
  const config = reactive({
    visible: false,
    title: "",
    width: "950",
    destroyOnClose: false,
    draggable: true,
    formConfig: {
      key: "form1",
      slots: [], // form中所有插槽名列表
      model: {},
      rules: [],
      style: {
        display: "flex",
        flexFlow: "wrap",
        justifyContent: "space-between",
      },
      options: [],
    },
    footer: {
      show: true,
      btns: [
        {
          key: "cancel",
          text: "取消",
          type: "primary",
          size: "",
          click: () => { },
        },
        {
          key: "submit",
          text: "保存并打印标签",
          type: "primary",
          size: "",
          click: () => { },
        },
      ],
    },
  });
  
  // 重置表单
  function resetFields() {
    basicFormRef.value.resetFields();
  }
  
  // 校验表单
  function validate(callback) {
    console.log("validate");
    basicFormRef.value.validate(callback);
  }
  
  // 关闭弹窗后续操作
  function closeDialog() {
    if (config.tableConfig) {
      basicTableRef.value.allSelectedRows = {};
      basicTableRef.value.initPagination();
      basicTableRef.value.setCurrentRow();
    }
    if (config.formConfig) {
      basicFormRef.value && basicFormRef.value.resetFields();
    }
    if (basicSearchBar.value) {
      basicSearchBar.value.resetModel();
    }
    config.close && config.close();
  }
  
  // 打开弹窗
  function show() {
    config.visible = true;
  
    Object.assign(config, props.config);
  }
  
  // 关闭弹窗
  function hide() {
    config.visible = false;
  }
  
  // 获取表格的选中数据
  function getSelectData() {
    console.log(basicTableRef.value.allSelectedRows)
    return Object.values(basicTableRef.value.allSelectedRows);
  }
  
  function getCurrentSelectRow() {
    console.log(basicTableRef.value.currentSelectRow)
    return Object.values(basicTableRef.value.currentSelectRow);
  }
  
  function getCurrentSelectRowData() {
    console.log(basicTableRef.value.currentSelectRowData)
    return basicTableRef.value.currentSelectRowData;
  }
  
  // 设置表格默认选中数据
  function setRowSelection(data) {
    nextTick(() => {
      basicTableRef.value.setRowSelection(data);
    });
  }
  
  function clearValidate(data) {
    basicFormRef.value.clearValidate && basicFormRef.value.clearValidate(data);
  }
  
  function validateField(data) {
    basicFormRef.value.validateField && basicFormRef.value.validateField(data);
  }
  
  defineExpose({
    resetFields,
    validate,
    show,
    hide,
    clearValidate,
    validateField,
    getSelectData,
    getCurrentSelectRow,
    getCurrentSelectRowData,
    setRowSelection,
  });
  onBeforeMount(() => {
    Object.assign(config, props.config);
  });
  watch(props.config, (val) => Object.assign(config, val));
  </script>
  <style lang="scss">
  .basicDialog {
    border-radius: 8px;
  
    .el-dialog__header {
      padding: 16px 20px;
      border-bottom: 1px solid #e6e9f5;
      font-size: 16px;
      color: #404d61;
  
      .el-dialog__title {
        font-weight: bold;
      }
    }
  
    .el-dialog__footer {
      padding: 26px 24px;
      border-top: 1px solid #d4d8e7;
  
      .el-button--primary {
        background: #2468f2;
        border-color: #2468f2;
        color: #ffffff;
  
        &:hover {
          background: #6295fd;
          border-color: #6295fd;
        }
      }
    }
  }
  </style>
  