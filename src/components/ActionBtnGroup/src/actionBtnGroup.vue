<template>
    <div class="btnGroupContainer" :style="style">
      <button class="emptyBtn"></button>
      <template v-for="item in btnListData" :key="item.key">
        <!-- 刷新按钮 -->
        <el-button v-if="item.key === 'refresh'" class="weight-low" :[item.directiveName]="item.directiveValue" plain
          @click="item.click">
          <el-icon>
            <svg-icon :icon-class="'shuaxin'" />
          </el-icon>
        </el-button>
        <!-- 新增按钮 -->
        <el-button v-if="item.key === 'add' && !item.hidden" v-bind="item.customAttribute || { plain: '' }"
          class="weight-high" :class="item.key" type="primary" :plain="item.plain" :style="item.style"
          :loading="item.loading" :[item.directiveName]="item.directiveValue" @click="item.click">
          <el-icon>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8333 5.83333H8.16667V1.16667C8.16667 0.857247 8.04375 0.560501 7.82496 0.341709C7.60616 0.122917 7.30942 0 7 0C6.69058 0 6.39383 0.122917 6.17504 0.341709C5.95625 0.560501 5.83333 0.857247 5.83333 1.16667V5.83333H1.16667C0.857247 5.83333 0.560501 5.95625 0.341709 6.17504C0.122917 6.39383 0 6.69058 0 7C0 7.30942 0.122917 7.60616 0.341709 7.82496C0.560501 8.04375 0.857247 8.16667 1.16667 8.16667H5.83333V12.8333C5.83333 13.1428 5.95625 13.4395 6.17504 13.6583C6.39383 13.8771 6.69058 14 7 14C7.30942 14 7.60616 13.8771 7.82496 13.6583C8.04375 13.4395 8.16667 13.1428 8.16667 12.8333V8.16667H12.8333C13.1428 8.16667 13.4395 8.04375 13.6583 7.82496C13.8771 7.60616 14 7.30942 14 7C14 6.69058 13.8771 6.39383 13.6583 6.17504C13.4395 5.95625 13.1428 5.83333 12.8333 5.83333Z"
                fill="white" />
            </svg>
          </el-icon>
          <template v-if="item.slot">
            <slot :name="item.key"></slot>
          </template>
          {{ item.text }}
        </el-button>
        <!-- 导出按钮 -->
        <el-button v-if="item.key === 'download'" class="weight-middle" :class="item.key"
          :[item.directiveName]="item.directiveValue" @click="item.click">
          导出
        </el-button>
        <el-popover v-if="item.key === 'delete' && !item.proverDisabled" placement="top" :width="250" :trigger="'click'"
          :visible="showProver">
          <div class="title" style="
                font-weight: 400;
                font-size: 16px;
                color: #333333;
                display: flex;
                align-items: center;
                gap: 5px;
              ">
            <el-icon size="17px" color="#ff6961">
              <warning-filled />
            </el-icon>
            <span>提示</span>
          </div>
          <p style="
                text-align: center;
                font-weight: 400;
                font-size: 14px;
                color: #333333;
              ">
            {{ `操作不可撤销，确认删除吗？` }}
          </p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="showProver = false">取消</el-button>
            <el-button class="deletePopover" type="danger" size="mini" plain
              @click="handleDeleteProverConfirm(item)">确认</el-button>
          </div>
          <template #reference>
            <el-button class="weight-low" :disabled="item.disabled" v-bind="item.customAttribute" :class="item.key"
              :[item.directiveName]="item.directiveValue" @click="showProver = true">{{ item.text }}</el-button>
          </template>
        </el-popover>
        <el-button v-if="item.key === 'delete' && item.proverDisabled" class="weight-low" :disabled="item.disabled"
          v-bind="item.customAttribute" :class="item.key" :[item.directiveName]="item.directiveValue"
          @click="handleDeleteProverConfirm(item)">{{ item.text }}</el-button>
        <el-button v-if="['add', 'refresh', 'download', 'delete'].indexOf(item.key) === -1" class="weight-low"
          :disabled="item.disabled" v-bind="item.customAttribute" :class="item.key" :type="item.type"
          :[item.directiveName]="item.directiveValue" @click="item.click">{{ item.text }}</el-button>
      </template>
    </div>
  </template>
  <script setup>
  import { reactive, defineProps, onBeforeMount } from "vue";
  import {
    Delete,
    Search,
    Refresh,
    Plus,
    Download,
  } from "@element-plus/icons-vue";
  
  const props = defineProps(["btnConfigData", "style"]);
  
  const style = reactive({});
  
  const btnListData = reactive({});
  const showProver = ref(false); // 是否显示二次确认弹窗
  
  // 删除按钮二次确认弹窗点击确认按钮
  function handleDeleteProverConfirm(item) {
    showProver.value = false;
    item.click && item.click()
  }
  onBeforeMount(() => {
    Object.assign(btnListData, props.btnConfigData);
    Object.assign(style, props.style);
  });
  
  watch(props.btnConfigData, (val) => Object.assign(btnListData, val));
  watch(props.style, (val) => Object.assign(style, val));
  </script>
  <style lang="scss" scoped>
  .btnGroupContainer {
    display: flex;
    gap: 10px 15px;
    justify-content: end;
    margin-bottom: 15px;
  
    button {
      margin-left: 0;
    }
  
    .add {
      order: 100;
    }
  
    .download {
      order: 99;
    }
  
    .emptyBtn {
      opacity: 0;
      flex: 1;
      order: -1;
    }
  }
  
  .is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  </style>
  