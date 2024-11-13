<template>
  <el-drawer custom-class="basicDrawer" :class="config.size" :title="config.title" v-model="config.visible"
    :destroy-on-close="true" @close="hide" @click="handleClick">
    <!-- <slot v-for="item in config.slots" :name="item"></slot> -->
    <template v-for="item in config?.slots" :key="item">
      <slot :name="item"></slot>
    </template>
    <ActionBtnGroup v-if="config.actionBtnConfig" :btnConfigData="config.actionBtnConfig"></ActionBtnGroup>
    <BasicSearchBar v-if="config.searchConfig" ref="basicSearchBar" :searchGroupConfig="config?.searchConfig"
      :actionBtnConfigData="config?.btnConfig ? config.btnConfig : []" />
    <BasicForm v-if="config.formConfig" ref="basicFormRef" :config="config.formConfig">
      <template v-for="item in config?.formConfig?.slots" :key="item" #[item]="{ formItem }">
        <slot :name="item" :scoped="formItem" :formItem="formItem"></slot>
      </template>
    </BasicForm>
    <BasicTable ref="basicTableRef" v-if="config.tableConfig" :tableConfig="config.tableConfig">
      <template v-for="item in config?.tableConfig?.slots" :key="item" #[item]="{ row }">
        <slot :name="item" :scoped="row" :row="row"></slot>
      </template>
    </BasicTable>
    <template v-if="config.footer.show" #footer>
      <el-button v-for="btn in config.footer.btns" :class="btn.class" v-bind="btn.customAttribute"
        :loading="btn.loading" :disabled="btn.disabled" :type="btn.type" :key="btn.key" @click="btn.click(formData)">{{
          btn.loading ?
            (btn.loadingText ? btn.loadingText : 'loading...') : btn.text }}</el-button>
    </template>
  </el-drawer>
</template>
<script setup>
import {
  ref,
  reactive,
  defineProps,
  computed,
  defineExpose,
  nextTick,
} from "vue";
import BasicForm from "../../BasicForm/src/basicForm.vue";
import BasicTable from "../../table/src/table.vue";
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
const initConfig = {
  visible: false,
  title: "",
  width: "",
  destroyOnClose: true,
  draggable: true,
  formConfig: {
    key: "form1",
    componet: "Form",
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
        class: "weight-low",
        size: "",
        click: () => { },
      },
      {
        key: "submit",
        text: "保存并打印标签",
        type: "primary",
        class: "weight-top",
        size: "",
        click: () => { },
      },
    ],
  },
};

const config = reactive({
  visible: false,
  title: "",
  width: "",
  destroyOnClose: true,
  draggable: true,
  formConfig: {
    key: "form1",
    componet: "Form",
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
        class: "weight-low",
        size: "",
        click: () => { },
      },
      {
        key: "submit",
        text: "保存并打印标签",
        type: "primary",
        class: "weight-top",
        size: "",
        click: () => { },
      },
    ],
  },
});

function show() {

  Object.assign(config, props.config);
  console.log(config);
  nextTick(() => {
    config.visible = true;
  });
}

function hide() {
  config.visible = false;
  if (basicTableRef.value) {
    basicTableRef.value.allSelectedRows = {};
  }
  if (basicFormRef.value) {
    basicFormRef.value.resetFields();
  }
  if (basicSearchBar.value) {
    basicSearchBar.value.resetModel();
  }
  config.close && config.close();
}
// 校验表单
function validate(callback) {
  basicFormRef.value.validate(callback);
}

// 获取表格的选中数据
function getSelectData() {
  return Object.values(basicTableRef.value.allSelectedRows);
}

// 获取当前选中的行
function getCurrentSelectRow() {
  return basicTableRef.value && basicTableRef.value.currentSelectRow;
}

function getCurrentSelectRowData() {
  return basicTableRef.value.currentSelectRowData;
}

// 设置表格默认选中数据
function setTableDefaultSelect(data) {
  nextTick(() => {
    basicTableRef.value.setRowSelection(data);
  });
}

function handleClick(e) {
  basicFormRef.value.closeSelect();
  // 为了修复，在drawer上点击不会触发v-clickOutSide的问题
  $('body').trigger('click');

}

function validateField(data) {
  basicFormRef.value.validateField && basicFormRef.value.validateField(data);
}

function clearValidate(data) {
  basicFormRef.value.clearValidate && basicFormRef.value.clearValidate(data);
}

defineExpose({
  show,
  hide,
  validate,
  validateField,
  clearValidate,
  config,
  getSelectData,
  getCurrentSelectRow,
  getCurrentSelectRowData,
  setTableDefaultSelect,
});

onBeforeMount(() => {
  Object.assign(config, toRaw(props.config));
});
watch(props.config, (val) => Object.assign(config, toRaw(val)));
</script>
<style lang="scss">
.basicDrawer {
  background: #ffffff;
  box-shadow: 4px 0px 24px rgba(4, 16, 46, 0.6);
  border-radius: 8px 0px 0px 8px;

  .el-drawer__header {
    padding: 16px;
    border-bottom: 1px solid #e6e9f5;
    margin-bottom: 4px;

    .el-drawer__title {
      font-weight: bold;
      font-size: 16px;
      color: #404d61;
    }
  }

  .el-drawer__body {
    padding: 24px;
  }

  .el-drawer__footer {
    padding: 24px;
    border-top: 1px solid #d4d8e7;
  }

  .el-input__wrapper {
    height: 36px;
  }
}
</style>