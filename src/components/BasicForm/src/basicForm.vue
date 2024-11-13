<template>
    <el-form ref="formRef" :model="config.model" :rules="config?.rules"
      style="display: flex; flex-flow: wrap; justify-content: space-between"
      :style="searchFormStyle ? searchFormStyle : config?.style">
      <template v-for="item in config.options" :key="item?.prop">
        <el-form-item v-if="!item.hidden" v-bind="item?.customAttribute" :prop="item?.prop"
          :label="hideLabel ? '' : item?.label" :rules="item.rules" :style="{
      ...item?.style,
      width: item?.style?.width
        ? `calc(${item.style.width} - ${item.style.width === '100%' ? '0px' : '10px'
        })`
        : undefined,
    }" :label-width="item?.labelWidth || config.labelWidth">
          <template v-if="item.slot" #default>
            <slot :name="item.slot" :formItem="item" :itemValue="config.model[item.value]"></slot>
          </template>
          <template v-if="item.labelSlot" #label>
            <slot :name="item.labelSlot"></slot>
          </template>
          <template v-if="item.labelConfig" #label>
            <div style="display: flex; align-items: center; gap: 5px">
              <el-tooltip :content="item.labelConfig.label" :placement="item.labelConfig.placement || 'top'">
                <svg-icon :icon-class="item.labelConfig.icon" :color="item.labelConfig.iconColor"
                  class-name="labelIcon"></svg-icon>
              </el-tooltip>
              {{ item.label }}
            </div>
          </template>
          <el-button v-if="item.component === 'Button'" v-bind="item.componentProps?.customAttribute"
            :type="item.componentProps?.type" :circle="item.componentProps?.circle" :plain="item.componentProps?.plain"
            :style="item.componentProps?.style" :icon="item.componentProps?.icon" @click="item.componentProps?.click">
            {{ item.componentProps?.text }}
          </el-button>
          <el-input v-if="item.component === 'Input' && !item.hidden" :id="item.componentProps?.id"
            v-bind="item.componentProps?.customAttribute"
             v-model="config.model[item.value]" v-focus
            :placeholder="item.componentProps?.placeholder" :clearable="config.clearable"
            :input-style="item.componentProps?.style" :disabled="item.componentProps.disabled"
            :minlength="item.componentProps?.minlength" :type="item.componentProps?.type"
            :maxlength="item.componentProps?.maxlength" :show-word-limit="item.componentProps?.showWordLimit"
            :max="item.componentProps?.max" :min="item.componentProps?.min"
            :show-password="item.componentProps?.showPassword" :ref="item.value"
            :[item.componentProps.directiveName]="true" @click="item.componentProps?.click"
            @clear="item.componentProps?.clear" @keydown.enter="handleEnter(item)" @input="item.componentProps?.input"
            @change="item.componentProps?.change"></el-input>
          <div v-if="item.component === 'Text'" :style="item.componentProps?.style">
            {{ item.componentProps?.text }}
          </div>
          <div v-if="item.component === 'Detail'">
            {{ config.model[item.value] }}
          </div>
  
          <el-select v-if="item.component === 'Select'" v-model="config.model[item.value]" :clearable="config.clearable"
            :disabled="item.componentProps?.disabled" :filterable="item.componentProps?.filterable"
            :remote="item.componentProps?.remote" :remote-method="item.componentProps?.remoteMethod"
            :style="item.componentProps?.style" :multiple="item.componentProps?.multiple"
            :collapse-tags="item.componentProps?.collapseTags" v-bind="item.componentProps?.customAttribute"
            :placeholder="item.componentProps?.placeholder" :popper-class="item.componentProps?.col ? 'c_' + item.componentProps?.col : ''
      " :popper-append-to-body="false" @change="item.componentProps?.change" @click="item.componentProps?.click">
            <el-option v-for="status in item.componentProps?.options" :key="status[item.componentProps?.value]" :label="item.componentProps.customLabel
      ? item.componentProps.formatter(status)
      : status[item.componentProps.label]
      " :value="status[item.componentProps.value]" :style="item.componentProps?.optionStyle" :selected="status?.selected"
              :disabled="item.componentProps.isDisabled &&
      item.componentProps?.isDisabled(status)
      " :filterable="item.componentProps?.filterable" @click="
      item?.componentProps?.click && item?.componentProps?.click(status)
      ">
              <slot v-if="item.componentProps.customNode" :name="item.componentProps.customNode" :formItem="status">
              </slot>
            </el-option>
          </el-select>
          <el-radio-group v-if="item.component === 'RadioGroup'" v-model="config.model[item.value]"
            @change="item.componentProps.change">
            <el-radio v-for="radio in item.componentProps.radioList" :key="radio[item.componentProps.key || 'value']"
              :label="radio[item.componentProps.value || 'value']">{{ radio[item.componentProps.label || "label"] }}
            </el-radio>
          </el-radio-group>
          <el-checkbox-group v-if="item.component === 'CheckBoxGroup'" v-model="config.model[item.value]"
            @change="item.componentProps.change">
            <el-checkbox v-for="checkbox in item.componentProps.checkList"
              :key="checkbox[item.componentProps.key || 'value']"
              :label="checkbox[item.componentProps.value || 'value']">{{
      checkbox[item.componentProps.label || 'label'] }}</el-checkbox>
          </el-checkbox-group>
          <BasicSelectTree v-if="item.component === 'SelectTree'" ref="basicSelectTreeRef" v-bind="item.componentProps"
            :show-text="config.model[
      item.componentProps.showTextKey
        ? item.componentProps.showTextKey
        : item.value
    ]
      " :default-selected="config.model[item.value]" :select-item="(data) => handleSelectTreeClick(data, item)">
          </BasicSelectTree>
          <el-tree-select :style="item.componentProps.style" v-if="item.component === 'TreeSelect'"
            v-model="config.model[item.value]" :data="item.componentProps.treeData" :props="{
      value: item.componentProps.value || 'value',
      label: item.componentProps.label || 'label',
      children: item.componentProps.children || 'children',
    }" :default-expand-all="item.componentProps?.defaultExpandAll" :node-key="item.componentProps.valueKey || 'value'"
            :value-key="item.componentProps.valueKey || 'value'" :placeholder="item.componentProps.placeholder"
            @nodeClick="(data) => {
      item.componentProps.showTextKey &&
        (config.model[item.componentProps.showTextKey] =
          data[item.componentProps.label]);
      item.componentProps.select && item.componentProps.select(data);
    }
      " check-strictly />
  
          <el-cascader v-if="item.component === 'Cascader'" v-model="config.model[item.value]"
            :style="item.componentProps.style" :emitPath="item.componentProps.emitPath"
            :options="item.componentProps.options" clearable @change="item.componentProps.change"></el-cascader>
          <el-date-picker ref="dateRangePickerRef" v-if="item.component === 'DateRange'"
            v-model="config.model[item.value]" :clearable="config.clearable" :type="item.componentProps?.type"
            :range-separator="item.componentProps?.rengeSeparator"
            :start-placeholder="item.componentProps?.startPlaceholder" :style="item.componentProps?.style"
            :end-placeholder="item.componentProps?.endPlaceholder" :value-format="item.componentProps?.valueFormat"
            :default-value="item.componentProps?.defaultValue" :disabled="item.componentProps?.disabled" @change="
      handleDateChange(
        item.componentProps,
        config.model[item.value],
        item.value
      )
      ">
          </el-date-picker>
          <el-date-picker ref="datePickerRef" v-if="item.component === 'Date'" v-model="config.model[item.value]"
            :clearable="config.clearable" :type="item.componentProps?.type" :disabled="item.componentProps?.disabled"
            :value-format="item.componentProps?.valueFormat" :style="item.componentProps?.style"
            :default-value="item.componentProps?.defaultValue" @change="item.componentProps?.change"></el-date-picker>
          <el-date-picker ref="datePickerRef" v-if="item.component === 'DateTimeRange'" v-model="config.model[item.value]"
            :clearable="config.clearable" type="datetimerange" :disabled="item.componentProps?.disabled"
            :start-placeholder="item.componentProps?.startPlaceholder"
            :end-placeholder="item.componentProps?.endPlaceholder" :value-format="item.componentProps?.valueFormat"
            :style="item.componentProps?.style" :default-value="item.componentProps?.defaultValue"
            @change="item.componentProps?.change"></el-date-picker>
          <el-date-picker ref="datePickerRef" v-if="item.component === 'DateRangeNew'" v-model="config.model[item.value]"
            :clearable="config.clearable" type="daterange" :disabled="item.componentProps?.disabled"
            :start-placeholder="item.componentProps?.startPlaceholder"
            :end-placeholder="item.componentProps?.endPlaceholder" :value-format="item.componentProps?.valueFormat"
            :style="item.componentProps?.style" :default-value="item.componentProps?.defaultValue"
            @change="item.componentProps?.change"></el-date-picker>
          <el-input-number v-if="item.component === 'InputNumber'" v-model="config.model[item.value]"
            :min="item.componentProps.min ? item.componentProps.min : 0"
            :max="item.componentProps.max ? item.componentProps.max : undefined" :label="item.componentProps.placeholder"
            :style="item.componentProps.style"></el-input-number>
          <div v-if="item.componentProps?.unit" class="unit"
            :class="{ showBlockUnit: item.componentProps?.unit?.showBlockUnit }" :style="item.componentProps.unit?.style"
            @click="console.log('hahah')">
            {{ item.componentProps.unit.text }}
          </div>
        </el-form-item>
      </template>
      <template v-if="searchResetBtn">
        <el-form-item v-for="item in searchResetBtn" :key="item?.key" v-bind="item?.customAttribute" :prop="item?.prop"
          :label="hideLabel ? '' : item?.label" :rules="item?.rules" :style="{
      ...item?.style,
      width: item?.style?.width
        ? `calc(${item.style.width} - ${item.style.width === '100%' ? '0px' : '10px'
        })`
        : undefined,
    }" :label-width="item?.labelWidth || config.labelWidth">
          <template v-if="item && item.slot" #default>
            <slot :name="item.slot" :formItem="item"></slot>
          </template>
        </el-form-item>
      </template>
    </el-form>
  </template>
  <script setup>
//   import {
//     ref,
//     reactive,
//     defineProps,
//     defineExpose,
//     nextTick,
//     watch,
//     computed,
//     onBeforeMount,
//   } from "vue";
  import { getFormateDate } from "../../../utils/index.js";
  import BasicSelectTree from "../../BasicSelectTree/src/basicSelectTree.vue";
  
  const props = defineProps([
    "config",
    "hideLabel",
    "searchFormStyle",
    "searchResetBtn",
  ]);
  
  // select组件下拉列表显示多少列的class
  const columnsClass = reactive({
    one: "c_one",
    two: "c_two",
    three: "c_three",
  });
  
  const config = reactive({
    labelWidth: "", // 设置的话可以统一设置表格中label的默认宽度
    labelPosition: "left",
    model: {
      // 表格参数
      memberId: "",
      memeberPhone: "",
    },
    clearable: true, // 是否可清空
    rules: [], // 校验规则
    style: {
      display: "flex",
      flexFlow: "wrap",
      justifyContent: "space-between",
    },
    options: [
      {
        prop: String, // 对应model中的字段
        label: String, // 参数名
        component: "Input" | "Select" | "DateRange" | "Date" | "Button", // 参数项类型
        slot: String, // 插槽名称
        componentProps: {
          // 参数项配置信息,结合不同类型会有不同
          // Input
          placeholder: String,
          value: String,
        },
      },
    ],
  });
  const formRef = ref(null);
  const dateRangePickerRef = ref(null);
  const datePickerRef = ref(null);
  const basicSelectTreeRef = ref(null);
  
  function checkedDisabled(status, isDisabled) {
    return isDisabled && isDisabled(status);
  }
  
  function handleDateChange(data, value, valueKey) {
    // 将时间段格式处理为需要的格式
    const {
      valueFormat,
      rangeKeyStart,
      rangeKeyEnd,
      linkStr,
      customKey,
      valueStartFormat,
      valueEndFormat,
    } = data;
    // config.model[valueKey] = undefined;
    if (customKey) {
      config.model[rangeKeyStart] = getFormateDate(
        value[0],
        valueStartFormat || valueFormat
      );
      config.model[rangeKeyEnd] = getFormateDate(
        value[1],
        valueEndFormat || valueFormat
      );
    } else {
      config.model[rangeKeyStart] = "";
      config.model[rangeKeyEnd] = "";
    }
  }
  
  // 获取表单数聚
  function getFormData() {
    return config.model;
  }
  
  // 重置表单
  function resetFields() {
    formRef.value.resetFields();
    basicSelectTreeRef.value && basicSelectTreeRef.value[0].resetData();
    // 清空时间空间选中值
    // dateRangePickerRef.value[0].clear();
    nextTick(() => {
      formRef.value && formRef.value.clearValidate();
    });
  }
  
  // 校验表单数据
  function validate(callback) {
    formRef.value.validate((res) => {
      res && callback();
    });
  }
  
  // 移除指定字段的校验效果，没有传就移除整个表单的
  function clearValidate(data) {
    formRef.value.clearValidate(data);
  }
  
  // 校验指定字段
  function validateField(data, callback) {
    formRef.value.validateField(data, callback);
  }
  
  // 当在搜索栏使用时支持回车触发搜索
  function handleEnter(item) {
    config.search && config.search(config.model);
    // 输入框的回车回调事件
    item.componentProps &&
      item.componentProps.keyEnterDown &&
      item.componentProps.keyEnterDown(config.model);
    return false;
  }
  
  function handleSelectTreeClick(data, item) {
    const { label, value } = data;
    config.model[item.value] = value;
    if (item.componentProps.showTextKey) {
      config.model[item.componentProps.showTextKey] = label;
    }
    item.componentProps.change && item.componentProps.change(value, data);
  }
  
  function closeSelect() {
    basicSelectTreeRef.value &&
      basicSelectTreeRef.value.clickOutSide &&
      basicSelectTreeRef.value.clickOutSide();
  }
  
  defineExpose({
    getFormData,
    resetFields,
    validate,
    validateField,
    clearValidate,
    closeSelect,
  });
  onBeforeMount(() => {
    Object.assign(config, props.config);
    console.log(config)
  
  });
  watch(props.config, (val) => {
    Object.assign(config, val);
    console.log(config)
  });
  </script>
  <style lang="scss" scoped>
  .el-form {
    gap: 0 20px;
    // margin-right: 20px!important;
  }
  
  .c_default {}
  
  .c_one {
    display: flex;
    flex-wrap: wrap;
  
    li {
      width: 100%;
    }
  }
  
  .c_two {
    display: flex;
    flex-wrap: wrap;
  
    li {
      width: 50%;
    }
  }
  
  .c_three {
    .el-select-dropdown__list {
      display: flex !important;
      flex-wrap: wrap;
  
      li {
        width: 33%;
      }
    }
  }
  
  .unit {
    width: 50px;
    text-align: center;
  }
  
  .showBlockUnit {
    height: 34px;
    box-sizing: border-box;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    background: #FFFFFF;
    transform: translateX(-4px);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 100;
    text-align: center;
  }
  
  .labelIcon {
    font-size: 18px !important;
  }
  </style>
  