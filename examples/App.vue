<template>

  <div class="example-app">

    <h1>My Component Library Demo</h1>

    <div class="button-demo">

      <my-button>默认按钮</my-button>

      <my-button type="primary">主要按钮</my-button>

      <my-button type="success">成功按钮</my-button>

      <my-button type="warning">警告按钮</my-button>

      <my-button type="danger">危险按钮</my-button>

    </div>


    <div class="table-demo">
      <BasicTable />
    </div>

  </div>

</template>



<script setup>


// 组件逻辑都在 setup 中

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
