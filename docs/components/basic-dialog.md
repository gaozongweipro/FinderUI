# BasicDialog 基础对话框

基于 Element Plus 的 Dialog 组件封装，提供更简单的 API。

## 基础用法

基础的对话框用法。

<div class="demo-block">
  <my-button @click="visible = true">打开对话框</my-button>
  <basic-dialog
    v-model="visible"
    title="基础对话框"
    width="30%"
  >
    <p>这是一个基础对话框的内容</p>
  </basic-dialog>
</div> 

## API

### 属性

| 属性名    | 说明     | 类型    | 可选值  | 默认值  |
|-----------|----------|---------|---------|---------|
| v-model   | 是否显示 | boolean | —       | false   |
| title     | 标题     | string  | —       | —       |
| width     | 宽度     | string  | —       | 50%     |
| fullscreen| 是否全屏 | boolean | —       | false   |
| top       | 距离顶部 | string  | —       | 15vh    |

### 事件

| 事件名  | 说明           | 回调参数 |
|---------|----------------|----------|
| open    | 打开时触发     | —        |
| close   | 关闭时触发     | —        |
| confirm | 点击确定时触发 | —        |
| cancel  | 点击取消时触发 | —        |

### 插槽

| 插槽名   | 说明           |
|----------|----------------|
| default  | 对话框的内容   |
| title    | 标题区的内容   |
| footer   | 底部按钮的内容 |