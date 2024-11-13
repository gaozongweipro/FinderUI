<template>
    <el-popover
        placement="bottom-start"
        :visible="visible"
        :width="config.width"
        :height="'300px'"
        trigger="manual"
    >
      <el-tree
          ref="treeRef"
          icon-class="ArrowDownBold"
          :data="treeData"
          :node-key="nodeKey"
          :props="defaultProps"
          :highlight-current="true"
          :style="{
            'height': height,
            'overflow': 'auto'
          }"
          :expand-on-click-node="config.expandOnClickNode"
          @node-click="handleTreeNodeClick"
          v-clickOutSide="clickOutSide"
          :filter-node-method="filterNode"
      >
      </el-tree>
      <template #reference>
        <el-input
            v-model="selectedText"
            :placeholder="placeholder"
            :style="config.style"
            @click.stop="handleClick"
        ></el-input>
      </template>
    </el-popover>
  </template>
  <script setup>
  import {ref, defineProps, onBeforeMount, watch, nextTick, toRaw} from "vue";
  
  const selectedText = ref(""); // input中显示的选中值的文本
  const selectedData = ref(""); // 选中的item的值
  const emits = defineEmits(['selectItem']); // 点击树
  const visible = ref(false); // 控制下拉的开启关闭
  const props = defineProps({
    treeData: {
      default: []
    },
    showText: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    height: {
      type: Number,
      default: 400
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultProps: {},
    defaultSelected: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    selectItem: {
      type: Function,
      default: () => {
      }
    },
    nodeClick: {
      type: Function,
      default: () => {
      }
    }
  })
  const config = reactive({
    width: "200px", // 下拉部分的宽度
    height: "300px", // 下拉部分的高度
    clearable: Boolean, // 是否显示清空按钮
    disabled: Boolean, // 控制禁用效果
    multiple: Boolean, // 下拉树是否支持多选
    defaultProps: '',
    customAttribute: "", // 自定义属性
    expandOnClickNode: "", // 是否当点击节点时展开树
  });
  
  function filterNode() {
  
  }
  
  // 点击下拉外部关闭下拉
  function clickOutSide(e) {
    visible.value = false;
  }
  
  /**
   * 点击input，展开下拉
   */
  function handleClick() {
    visible.value = true;
  }
  
  /**
   * 树节点点击事件
   * @param data 点击的节点数据
   */
  function handleTreeNodeClick(data) {
    visible.value = false; // 关闭下拉
    selectedData.value = data; // 存数点击的数据
    selectedText.value = data[props.labelKey]; // 存储点击
    props.selectItem({label: data[props.labelKey], value: data[props.valueKey]})
  }
  
  function resetData() {
    selectedData.value = "";
    selectedText.value = "";
  }
  
  defineExpose({
    selectedData,
    resetData,
    clickOutSide
  });
  
  onBeforeMount(() => {
    if (props.defaultProps) {
      selectedText.value = toRaw(props.showText);
      Object.assign(config.defaultProps, props.defaultProps);
    }
  });
  
  watch(props.defaultProps, val => {
    console.log(val);
    Object.assign(config.defaultProps, val);
  })
  
  </script>
  <style lang="scss" scoped>
  :deep(.is-current > .el-tree-node__content) {
    background-color: #eef2ff;
    color: #2468f2;
  }
  
  :deep(.el-tree-node:has(.is-current) > .el-tree-node__content) {
    color: #2468f2;
  
    .el-icon {
      color: #2468f2;
    }
  }
  </style>
  