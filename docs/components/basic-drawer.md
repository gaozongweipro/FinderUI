# BasicDrawer 基础抽屉

基于 Element Plus 的 Drawer 组件封装，提供更简单的 API。

## 基础用法

基础的抽屉用法。

## 配置参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 抽屉标题 | string | '' |
| size | 抽屉尺寸 | string | 'middle', 'large' |
| visible | 抽屉收起展开 | boolean | false |
| slots | 所有的自定义插槽名称 | array | [] |
| actionBtnConfig | 操作按钮配置 | object | {} |
| searchConfig | 搜索组件配置参数 | object | {} |
| formConfig | 表单参数 | object| {} |
| tableConfig | 表格配置参数 | object | {} |
| btnConfig | 搜索栏组件的actionBtnConfigData配置参数 | object | {} |
| footer | 抽屉地步操作按钮配置 | object | {} |
| footer.show | 是否展示底部操作按钮 | boolean | true |
| footer.btns | 底部操作按钮配置参数 | array | [] |
| footer.btns.class | 操作按钮class | String | '' |
| footer.btns.customAttribute | 自定义属性 | object | {} |
| footer.btns.disabled | 是否禁用按钮 | boolean | false |
| footer.btns.type | 按钮类型 | string | '' |
| footer.btns.key | 按钮key | string | '' |
| footer.btns.text | 按钮文本 | string | '' |
| footer.btns.icon | 按钮图标 | string | '' |
| footer.btns.click | 按钮点击事件 | function | () => {} |

## Method事件

| 方法名 | 说明 | 参数 | 说明 |
| --- | --- | --- | --- |
| show | 打开抽屉 | - | 控制抽屉的展开 |
| hide | 关闭抽屉 | - | 控制抽屉的关闭 |
| validate | 抽屉展开关闭回调函数 | callback | 抽屉展开关闭的回调函数 |
| getSelectData | 获取表格中的选中数据 | boolean | false |
| getCurrentSelectRow | 获取当前表格中选中行数据 | array | [] |


## 代码示例
```


```