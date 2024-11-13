# BasicForm 基础表单

基于 Element Plus 的 Form 组件封装，提供更简单的配置式 API。

## 基础用法

基础的表单用法。

<div class="demo-block">
  <basic-form
    :model="formData"
    :schemas="schemas"
    label-width="100px"
    @submit="onSubmit"
  />
</div> 

## API

### 属性

| 属性名      | 说明         | 类型     | 可选值  | 默认值  |
|-------------|-------------|----------|---------|---------|
| model       | 表单数据     | object   | —       | —       |
| schemas     | 表单配置     | array    | —       | []      |
| labelWidth  | 标签宽度     | string   | —       | auto    |
| labelPosition| 标签位置    | string   | right/left/top | right |
| inline      | 行内表单     | boolean  | —       | false   |

### 事件

| 事件名   | 说明           | 回调参数        |
|----------|----------------|----------------|
| submit   | 提交时触发     | formData       |
| reset    | 重置时触发     | —              |
| validate | 校验时触发     | valid, invalid |

### Schema 配置

| 参数名    | 说明         | 类型     | 可选值  | 默认值  |
|-----------|-------------|----------|---------|---------|
| field     | 字段名      | string   | —       | —       |
| label     | 标签文本    | string   | —       | —       |
| component | 组件类型    | string   | Input/Select/... | Input |
| required  | 是否必填    | boolean  | —       | false   |
| rules     | 校验规则    | array    | —       | []      |