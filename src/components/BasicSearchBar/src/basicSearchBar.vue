<template>
    <div class="searchBarBox" v-resize="styleChange">
      <div class="searchBox">
        <BasicForm ref="basicFormRef" :config="formConfig" :searchResetBtn="config.searchResetBtn" :showSearchBtn="true"
          :hideLabel="true" :searchFormStyle="searchFormStyle">
          <template #searchBtn>
            <!-- 搜索按钮 -->
            <el-button v-if="config.showSearchBtn" class="searchBtn" @click="search">
              <el-icon>
                <svg-icon :icon-class="'Search'" />
              </el-icon>
            </el-button>
          </template>
          <template #resetBtn>
            <!-- 重置按钮 -->
            <el-button v-if="config.showResetBtn" class="resetBtn" type="text" @click="reset">
              <el-icon>
                <svg-icon :icon-class="'zhongzhi'" />
              </el-icon>
              重置
            </el-button>
          </template>
        </BasicForm>
      </div>
      <div class="actionBtn" v-if="actionBtnConfigData && actionBtnConfigData.length > 0">
        <ActionBtnGroup :btnConfigData="btnConfigData" :style="btnGroupStyle"></ActionBtnGroup>
      </div>
    </div>
  </template>
  
  <script setup>
  import {
    unref,
    reactive,
    defineProps,
    defineEmits,
    onBeforeMount,
    watch, computed, ref,
  } from "vue";
  import ActionBtnGroup from "../../ActionBtnGroup/src/actionBtnGroup.vue";
  import BasicForm from "../../BasicForm/src/basicForm.vue";
  import { Search, Refresh } from "@element-plus/icons-vue";
  const props = defineProps(["searchGroupConfig", "actionBtnConfigData"]);
  const emit = defineEmits(["refresh"]);
  const basicFormRef = ref(null); // 搜索参数
  const lineBreak = ref(false); // 是否换行显示
  const formData = computed({ // 搜索参数form数据
    get: () => {
      return basicFormRef.value.getFormData();
    },
  });
  
  const btnConfigData = computed({ // 操作按钮数据，默认显示【刷新，操作按钮】
    get: () => {
      if (props.actionBtnConfigData) {
        const btnConfig = ref(props.actionBtnConfigData);
        // 如果换行，那么新增按钮在最左侧显示
        btnConfig.value &&
          btnConfig.value.map((item) => {
            if (item.key === "add" && lineBreak.value) {
              item.style = {
                order: -2,
              };
            } else {
              item.style = { order: 100 };
            }
            return item;
          });
        return config.showRefreshBtn
          ? [refreshBtn, ...btnConfig.value]
          : [...btnConfig.value];
      } else {
        return [];
      }
    },
  });
  
  // 在搜索条件最后增加一个占位的Select，不加的话回车搜索会刷新页面
  const formConfig = computed({
    get: () => {
      config.formConfig.options.push({
        props: '',
        value: '',
        label: 'Block',
        component: 'Select',
        style: { display: 'none' }
      })
      return config.formConfig
    }
  })
  
  
  const searchFormStyle = { // basicForm在搜索栏显示时的自定义样式
    display: "inline-flex",
    justifyContent: "start",
    gap: "6px",
    flexWrap: "wrap",
  };
  
  const config = reactive({
    expandForm: false, // 展开搜索区域
    showType: "fold", // simple 单行展示，没有展开效果；fold 折叠效果，点击搜索图标展开搜索框
    showResetBtn: true, // 是否展示重置按钮
    showSearchBtn: true,
    showRefreshBtn: true,
    searchResetBtn: [, // 搜索重置按钮，搜索栏默认会显示搜索重置按钮
      {
        key: "searchBtn",
        label: "",
        value: "",
        component: "Slot",
        slot: "searchBtn",
      },
      {
        key: "resetBtn",
        label: "",
        value: "",
        component: "Slot",
        slot: "resetBtn",
      },
    ],
    formConfig: { // 搜索选项的配置信息
      options: [],
    },
    search: () => { },
    reset: () => { },
    refresh: () => { },
    searchToolBtnConfig: [ // 搜索，重置按钮的配置信息
      {
        key: "search",
        text: "搜索",
        icon: Search,
        click: search,
      },
      {
        key: "refresh",
        plain: true,
        text: "重置",
        icon: Refresh,
        click: reset,
      },
    ],
    style: {
      height: "30px",
      width: "100%",
      marginTop: "20px",
    },
  });
  
  // 刷新按钮配置信息
  const refreshBtn = reactive({
    key: "refresh",
    click: () => {
      config.refresh && config.refresh();
    },
  });
  
  // 操作按钮样式
  const btnGroupStyle = reactive({
    width: "100%",
    padding: "0",
    marginTop: "0",
    marginBottom: "0",
  });
  
  // 监听搜索栏宽度变化，如果换行，新增按钮在最左侧显示
  function styleChange(data) {
    const { height } = data;
    // 如果height大于36，证明发生了换行， 新增按钮要在左侧显示
    lineBreak.value = !!(height > 36);
  }
  
  // 点击刷新按钮
  function refresh() {
    config.refresh && config.refresh();
  }
  
  function resetModel() {
    Object.keys(config.formConfig.model).forEach((key) => {
      config.formConfig.model[key] = '';
    });
    basicFormRef.value && basicFormRef.value.resetFields();
  }
  
  // 点击重置按钮
  function reset() {
    resetModel();
    config.reset && config.reset();
  }
  
  // 点击搜索按钮
  function search() {
    config.search && config.search(unref(formData));
  }
  
  
  defineExpose({
    reset,
    resetModel,
    search,
    refresh
  })
  
  onBeforeMount(() => {
    Object.assign(config, props.searchGroupConfig);
    config.formConfig["search"] = config.search;
  });
  
  watch(props.searchGroupConfig, (val) => {
    Object.assign(config, toRaw(val));
    config.formConfig["search"] = config.search;
  });
  </script>
  <style lang="scss" scoped>
  .searchBarBox {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 16px;
    position: relative;
  
    .searchBox {
      display: flex;
      gap: 6px;
  
      :deep(.el-form-item--default) {
        margin-bottom: 0;
      }
  
      .searchBtn {
        margin-left: 6px;
        height: 30px;
        color: #2468f2 !important;
        border: 1px solid #2468f2 !important;
  
        &:hover {
          background: #eaf1ff !important;
        }
  
        &:active {
          background: #2468f2 !important;
          color: #ffffff !important;
        }
  
        :deep(.el-botton) {
          display: inline-block;
        }
      }
  
      .resetBtn {
        display: inline-flex;
        justify-content: end;
        color: #525d75;
        flex-wrap: wrap;
        border: none;
  
        &:hover {
          color: #409cff;
        }
  
        &:active {
          color: #2468f2;
          background: #ffffff !important;
        }
  
        .el-icon {
          margin-right: 6px;
        }
      }
    }
  
    .actionBtn {
      flex: 1;
      display: flex;
      justify-content: end;
      flex-wrap: wrap;
    }
  }
  
  .el-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  
    .topLine {
      margin-top: 15px;
      display: flex;
      align-items: start;
      padding: 0 15px;
  
      .formBtn {
        margin-left: 20px;
        display: flex;
        flex-flow: wrap;
        gap: 10px 15px;
  
        button {
          margin: 0;
        }
      }
    }
  
    .simpleTopLine {
      display: flex;
      flex-flow: nowrap;
      height: 30px;
  
      form {
        height: 30px;
      }
  
      .formBtn {
        margin-left: 20px;
        display: flex;
        flex-flow: wrap;
        gap: 10px 15px;
  
        button {
          margin: 0;
        }
      }
    }
  
    .bottomLine {
      flex: none;
      display: flex;
      padding: 0 15px;
      justify-content: space-between;
  
      .searchBtnBlock {
        display: flex;
        flex-flow: wrap;
        gap: 10px 15px;
        align-items: center;
  
        button {
          margin-left: 0;
        }
      }
    }
  }
  
  .el-form-item {
    margin-right: 20px !important;
  }
  </style>
  