# FForm 自定义表单

用户可以进行高度自定义配置的表单组件

## 基础用法

基础的表单用法。

## API

### 属性

| 属性名   | 说明     | 类型   | 默认值 |
|----------|----------|--------|--------|
| formData | 表格数据 | object | {}     |
| formItemConfig  | 表单项配置 | array | []     |
| labelWidth | 表单项标题宽度 | string | 100px  |
| rules | 校验规则 | object |  {}  |


### 事件

| 事件名     | 说明     | 回调参数 |
|------------|----------|----------|
| validate | 校验 | (params: object) 校验参数 |
| resetFields   | 重置表单 | -        |
| clearField   | 清除单个表单项 | (field: string) 表单项值 |

### formItemConfig 配置项

| 参数名    | 说明     | 类型   | 默认值 |
|-----------|----------|--------|--------|
| label     | 表单项标题 | string | -      |
| value     | 表单项值 | string | -      |
| component | 表单项组件 | string | -      |
| componentProps | 表单项组件配置 | object | -      |



# 代码示例
```js

<template >
  <FForm :formData="formData" :formItemConfig="formItemConfig"></FForm>
</template>

<script setup>

const formData = {
  deptId: "",
  deptName: "",
  userName: "",
  lightLevel: "",
  exportTime: "",
  wifiState: "",
  weightNow: "",
  status: "",
  time: "",
}

const formItemConfig = [
  {
    label: "部门",
    value: "deptId",
    component: "Select",
    componentProps: {
      options: [],
      placeholder: "请选择部门"
    }
  },
  {
    label: "用户",
    value: "userName",
    component: "Input",
    componentProps: {
      placeholder: "请输入用户"
    }
  },
  {
    label: "时间",
    value: "time",
    component: "DateRange",
  },
  {
    label: "状态",
    value: "status",
    component: "Switch",
    componentProps: {
    }
  }
]
</script>
```
