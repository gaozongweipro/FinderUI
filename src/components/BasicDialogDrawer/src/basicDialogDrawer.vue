<template>
    <component :is="showType === 'drawer' ? BasicDrawer : BasicDialog" ref="basicDialogDrawerRef" :config="config">
      <template v-for="item in config?.formConfig?.slots" :key="item" #[item]="{ formItem }">
        <slot :name="item" :scoped="formItem"></slot>
      </template>
      <template v-for="item in config?.tableConfig?.slots" :key="item" #[item]="{ row, col }">
        <slot :name="item" :row="row" :col="col"></slot>
      </template>
    </component>
  </template>
  <script setup>
  import { ref, defineProps, defineExpose, nextTick, computed } from "vue";
  import BasicDialog from "../../BasicDialog/src/basicDialog.vue";
  import BasicDrawer from "../../BasicDrawer/src/basicDrawer.vue";
  const props = defineProps(["config", "type"]);
  const basicDialogDrawerRef = ref(null);
  
  const showType = computed({
    get: () => {
      return props.type === "drawer" ? "drawer" : "dialog";
    },
  });
  
  function show() {
    nextTick(() => {
      basicDialogDrawerRef.value && basicDialogDrawerRef.value.show();
    });
  }
  
  function hide() {
    nextTick(() => {
      basicDialogDrawerRef.value && basicDialogDrawerRef.value.hide();
    });
  }
  // 校验表单
  function validate(callback) {
    basicDialogDrawerRef.value && basicDialogDrawerRef.value.validate(callback);
  }
  
  // 获取表格的选中数据
  function getSelectData() {
    return basicDialogDrawerRef.value && basicDialogDrawerRef.value.getSelectData();
  }
  
  function getCurrentSelectRow() {
    return basicDialogDrawerRef.value && basicDialogDrawerRef.value.getCurrentSelectRow();
  }
  
  function getCurrentSelectRowData() {
    return basicDialogDrawerRef.value && basicDialogDrawerRef.value.getCurrentSelectRowData();
  }
  
  // 设置表格默认选中数据
  function setTableDefaultSelect(data) {
    nextTick(() => {
      basicDialogDrawerRef.value && basicDialogDrawerRef.value.setRowSelection(data);
    });
  }
  
  function validateField(data) {
    basicDialogDrawerRef.value.validateField && basicDialogDrawerRef.value.validateField(data);
  }
  
  function clearValidate(data) {
    basicDialogDrawerRef.value.clearValidate && basicDialogDrawerRef.value.clearValidate(data);
  }
  
  defineExpose({
    show,
    hide,
    validate,
    validateField,
    clearValidate,
    getSelectData,
    getCurrentSelectRowData,
    getCurrentSelectRow,
    setTableDefaultSelect,
  });
  </script>
  