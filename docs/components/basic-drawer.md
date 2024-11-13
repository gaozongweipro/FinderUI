# BasicDrawer 基础抽屉

基于 Element Plus 的 Drawer 组件封装，提供更简单的 API。

## 基础用法

基础的抽屉用法。

<div class="demo-block">
  <my-button @click="visible = true">打开抽屉</my-button>
  <basic-drawer
    v-model="visible"
    title="基础抽屉"
    size="30%"
  >
    <p>这是一个基础抽屉的内容</p>
  </basic-drawer>
</div> 

## API

### 属性

| 属性名    | 说明       | 类型    | 可选值                | 默认值  |
|-----------|------------|---------|----------------------|---------|
| v-model   | 是否显示   | boolean | —                    | false   |
| title     | 标题       | string  | —                    | —       |
| size      | 大小       | string  | —                    | 30%     |
| direction | 打开方向   | string  | rtl/ltr/ttb/btt      | rtl     |
| withHeader| 是否显示头部| boolean | —                    | true    |

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
| default  | 抽屉的内容     |
| title    | 标题区的内容   |
| footer   | 底部按钮的内容 |