<template>
  <div class="example-app">
    <h1>My Component Library Demo</h1>
    <h2>Button</h2>
    <div class="button-demo">
      <my-button>默认按钮</my-button>
      <my-button type="primary">主要按钮</my-button>
      <my-button type="success">成功按钮</my-button>
      <my-button type="warning">警告按钮</my-button>
      <my-button type="danger">危险按钮</my-button>
    </div>
    <h2>Table</h2>
    <BasicTable :tableConfig="tableConfig" />
    <!-- <BasicSearchBar />
    <PaginationAll />
    <BasicForm />
    <BasicModal />
    <BasicDrawer />
    <BasicDialog />
    <BasicDrawerDialog /> -->

  </div>
</template>

<script setup>
// 组件逻辑都在 setup 中
const tableConfig = reactive({
  tableData: [],
  pageCount: 0,
  loading: false,
  rowValue: "locationId",
  message: { page: 1, limit: 10 },
  showIndex: false,
  multiple: true,
  paginationChange: () => { },
  actionBtnConfig: {
    fixed: "right",
    label: "操作",
    width: 200,
    btnsConfig: [
      {
        key: "edit",
        svgIcon: "bianji",
        label: "编辑",
        click: () => { },
      },
      {
        key: "delete",
        svgIcon: "shanchu",
        type: "danger",
        label: "删除",
        click: () => { },
      },
    ],
  },
  columns: [
    {
      prop: "locationName",
      label: "安装点名称",
      minWidth: 120,
    },
    {
      prop: "building",
      label: "建筑物",
      minWidth: 120,
    },
    {
      prop: "layer",
      label: "楼层",
      minWidth: 90,
    },
    // {
    //   prop: "deptName",
    //   label: "公司名称",
    //   minWidth: 150,
    // },   
    {
      prop: "deviceSn",
      label: "设备序列号",
      minWidth: 120,
    },
    {
      prop: "deviceType",
      label: "设备类型",
      minWidth: 120,
    },
    {
      prop: "bindTime",
      label: "绑定时间",
      minWidth: 150,
    },
    {
      prop: "createTime",
      label: "安装时间",
      minWidth: 150,
    },
  ],
});
</script>

<style scoped>
.example-app {
  padding: 20px;
}

.button-demo {
  margin-top: 20px;
}

.button-demo :deep(.el-button) {
  margin-right: 10px;
}
</style>
