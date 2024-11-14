# 名称：按钮组组件
* 应用：<span style="background: #7d7d7d50;">搜索组件的功能按钮渲染</span>、<span style="background: #7d7d7d50;">表格组件的操作按钮渲染</span>
## 配置参数
| 参数 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--: | :--: |
| style | 按钮组盒子样式 | string |   |
| key | 单个按钮的key, refresh,add,download,delete为保留key，对应有默认样式 | Array | [] |
| directiveName | 按钮的自定义指令名称 | string |  |
| directiveValue | 按钮的自定义指令值 | String |  |
| click | 点击按钮回调方法 | Function | () => {} |
| loading | 点击按钮时候有loading状态 | boolean | false |
| disabled | 按钮是否禁用 | boolean | false |
| plain | 按钮是否朴素 | boolean | false |
 | string | left |
| text | 按钮文字 | string |  |
| customAttribute | 自定义按钮属性 | object | {} |

## 代码示例

```
<template>
    <ActionBtnGroup :style="style", :btnConfigData="btnConfigData" />
</template>
<script setup>
const style = reactive({
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}) 
const btnConfigData = reactive([
    {
        key: 'add',
        text: '添加',
        customAttribute: {
            readonly: true
        },
        disabled: false,
        loading: false,
        click: () => {
            console.log('add')
        },
        style: {
            width: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        plain: false,
        directiveName: 'v-focus',
        directiveVal: () => {
            console.log('focus')
        }
    }
]) 
</script>
```