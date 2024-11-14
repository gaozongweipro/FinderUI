# 搜索栏组件
* 应用： 表格上面的搜索栏
## 配置参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchGroupConfig | 搜索栏搜索条件配置参数 | object | - |
| actionBtnConfigData | 搜索栏操作按钮配置参数 | object | - |
| showResetBtn | 是否展示重置按钮 | boolean | false |
| showSearchBtn | 是否展示搜索按钮 | boolean | true |
| showRefreshBtn | 是否展示刷新按钮 | boolean | false |
| formConfig | 搜索栏表单配置参数 | object | - |
| search | 点击搜索按钮回调 | function() | - |
| refresh | 点击刷新按钮回调 | function() | - |
| reset | 点击重置按钮回调 | function() | - | 
> 备注
> 1. actionBtnConfigData的配置参数与ActionBtnGroup组件的配置参数一致，具体请参考ActionBtnGroup组件的说明文档。
> 2. formConfig的配置参数与Form组件的配置参数一致，具体请参考Form组件的说明文档。

## 代码示例
```
<template>
    <BasicSearchBar
        :searchGroupConfig="searchGroupConfig"
        :actionBtnConfigData="actionBtnConfigData"
    />
</template>

<script setup>
const searchGroupConfig = reactive({
  search,
  refresh,
  reset,
  formConfig: {
    model: {
      memberName: '',
      nickName: '',
      memberPhone: ''
    },
    options: [
      {
        prop: "memberName",
        component: "Input",
        componentProps: {
          placeholder: "用户名",
        },
      },
      {
        prop: "nickName",
        value: "nickName",
        component: "Input",
        componentProps: {
          placeholder: "昵称",
        },
      },
      {
        prop: "memberPhone",
        value: "memberPhone",
        component: "Input",
        componentProps: {
          placeholder: "手机号",
        },
      },
    ],
  },
});
const actionBtnConfigData = reactive([
  {
    key: "add",
    text: "新增",
    click: () => {
      addDialogRef.value.type = "dialog";
      addDialogRef.value.show();
    },
  },
  {
    key: "download",
    text: "导出",
    click: excelbtn,
  },
]);

</script>
```