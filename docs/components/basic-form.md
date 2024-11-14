# BasicForm 基础表单

基于 Element Plus 的 Form 组件封装，提供更简单的配置式 API。

## 基础用法

基础的表单用法。

# 表单组件
* 应用： 新增、编辑界面，搜索栏
## 配置参数
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hideLabel | 是否隐藏label,在BasicSearchBar中默认为true | boolean | false |
| labelWidth | 表单label的统一宽度 | number | - |
| labelPosition | 表单label的对其方式 | string | "left" |
| model | 表单参数 | object | - |
| clearable | 表单中的input是否显示清空按钮 | boolean | true |
| rules | 表单项校验规则 | object |  |
| style | 表格整体样式配置，在el-form标签上 | object |  |
| options | 表单项配置 | array |  |
| disabled | 表单是否禁用 | boolean |  |

### options中单项的配置参数
| 参数 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--: | :--: |
| prop | 对应model中的字段 | string |  |
| label | 表单项的label | string |  |
| component | 表单项组件类型 | string | "Input", "Select", "DateRange", "Date", "Button", "RadioGroup", "SelectTree", "TreeSelect", "InputNumber","Text",  |
| slot | 表单项插槽 | string |  |
| style | 表单行样式, 可以在这里设置宽度来实现一行多个表单项 | object |  |
| hidden | 是否隐藏该表单项 | boolean | false |
| customAttribute | 自定义属性，作用在el-form-item上 | boolean | false |
| componentProps | 表单项参数配置, 内部参数会根据component | object |  |

### componentProps配置参数
#### Input

| 参数 | 说明 | 类型 | 默认值 |
| :--: | :--: | :--: | :--: |
| placeholder | 输入框占位符 | string |  |
| id | 自定义id | string |  |
| style | 输入框样式 | object |  |
| disabled | 是否禁用输入框 | boolean | false |
| minlength | 输入框允许输入的最小长度 | number | 0 |
| maxlength | 输入框允许输入的最大长度 | number |  |
| type | 输入框类型 | string | text |
| showWordLimit | 是否显示字符限制 | boolean | false |
| showPassword | 如果type为password，是否显示展示密码按钮 | boolean | false |
| click | 点击输入框回调函数 | function |  |
| clear | 点击清空按钮回调参数 | function |  |
| directiveName | 自定义指令名称 | string |  |
| unit | 单位 | object |  |
| unit.text | 单位文字 | string |  |
| unit.style | 单位样式 | object |  |

#### Select
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |
| filterable | 是否可筛选 | boolean | false |
| remote | 是否远程搜索 | boolean | false |
| remoteMethod | 远程搜索方法 | function |  |
| style | 下拉框样式，作用在el-select上 | object | {} |
| multiple | 是否多选 | boolean | false |
| collapseTags | 多选时选中标签是否省略显示 | boolean | false |
| customAttribute | 自定义属性 | object | {}  |
| placeholder | 默认占位文字 | string |  |
| change | 选中值改变的回调函数 | function |  |
| click | 点击下拉列表的回调函数 | function |  |
| options | 下拉列表选项 | array | [] |
| label | label的key | string |  |
| value | value的key | string |  |
| isDisabled | 是否禁用 | boolean | false |
| click | 点击选项的回调函数 | function |  |

### InputNumber
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 最小值 | number |  |
| max | 最大值 | number |  |
| placeholder | 占位文字 | string |  |
| style | 样式 | object | {} |

### Text
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文本值 | string |  |


### RadioGroup
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| change | change事件回调函数 | function |  |
| value | 选中值 | string |  |
| label | 选中值label | string |  |
| radioList | 选项列表 | array |  |

### SelectTree （存在数据回写问题， 一般情况可以使用TreeSelect代替）


### TreeSelect
> 基于el-tree-select组件封装  

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | array |  |
| value | 选中值 | string | "value" |
| label | 选中值label | string | "label" |
| children | 占位符 | string | "children" |
| valueKey | 树节点key | string | "value" |
| placeholder | 占位文字 | string |  |
| showTextKey | 更改选中值后改变model中指定的值为选中项的label | string |  |
| select | 树节点选中回调函数 | function |  |



### Button
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| customAttribute | 自定义属性 | object |  |
| type | 按钮类型 | string |  |
| circle | 是否是圆形按钮 | boolean | false |
| plain | 是否是朴素按钮 | boolean | false |
| style | 自定义style | string |  |
| icon | 自定义按钮icon | string |  |
| text | 自定义按钮文字 | string |  |

# Date


# DateRange


# 代码示例
```js

<template >
    <BasicForm :config="formConfig" >
        <template #courseTime={row} ></template>
    </BasicForm>
</template>

<script setup>

const formConfig =  {
    labelWidth：100, /* 表单项统一标签宽度 */
    model: {
      deptId: "",
      deptName: "",
      userName: "",
      lightLevel: "",
      exportTime: "",
      wifiState: "",
      weightNow: "",
      status: "",
      time: "",
      courseTime: '',
    },
    rules: { /* 校验规则 */
      memberName: [
        { required: true, trigger: "blur", message: "请输入用户名" },
      ],
      nickName: [{ required: true, trigger: "blur", message: "请输入昵称" }],
      memberPhone: [
        {
          required: true,
          validator: validatePass2,
          trigger: "blur",
        },
      ],
    },
    options: [
      { /* Input配置 */
        prop: "userName",
        value: "userName",
        component: "Input",
        componentProps: {
          placeholder: "用户名称",
        },
      },
      { /* SelectTree配置 */
        prop: 'deptId',
        value: 'deptId',
        label: '绑定机构',
        component: 'SelectTree',
        style: {width: '100%'},
        componentProps: {
          placeholder: '绑定机构',
          style: {width: '100%'},
          width: 512,
          get treeData() {
            return options.treeList
          },
          showTextKey: 'deptName' // 存储选中数据label的key
        }
      },
        { /* TreeSelect组件配置 */
        prop: "deptId",
        value: "deptId",
        label: "所属机构",
        component: "TreeSelect",
        style: {width: "100%"},
        componentProps: {
          width: "500px",
          placeholder: "请选择所属机构",
          style: {width: "100%"},
          value: "id",
          label: "label",
          get treeData() {
            return deptOptions.value
          },
          select: (item) => {
            nextTick(() => {
              const {label} = item;
              config.formConfig.model.deptName = label;
            })
          }
        },
      }
      { /* InputNumber配置 */
        prop: 'lightLevel',
        value: 'lightLevel',
        label: '亮度',
        component: 'InputNumber',
        style: {width: '100%'},
        componentProps: {
          placeholder: '请输入Logo地址',
          min: 0,
          max: 100,
        }
      },
      { /* Select下拉列表配置 */
        prop: "status",
        value: "status",
        component: "Select",
        componentProps: {
          placeholder: "用户状态",
          get options() {
            return sys_normal_disable;
          },
          label: "label",
          value: "value",
        },
      },
        { /* RadioGroup单选组配置信息*/
        prop: 'wifiState',
        value: 'wifiState',
        label: 'wifi开关',
        component: 'RadioGroup',
        style: {width: '100%'},
        componentProps: {
          radioList: [
            {
              label: '开',
              value: 1
            },
            {
              label: '关',
              value: 0
            }
          ]
        }
      },
      { /* DateRange日期范围配置 */
        prop: "time",
        value: "params",
        component: "DateRange",
        componentProps: {
          placeholder: "创建时间",
          rangeKeyStart: "params[beginTime]",
          rangeKeyEnd: "params[endTime]",
          startPlaceholder: "开始日期",
          endPlaceholder: "结束日期",
          rangeSeparator: "至",
          valueFormat: "YYYY-MM-DD",
          type: "daterange",
          customKey: true,
        },
      },
      { /* Date组件配置信息 */
        prop: "exportTime",
        label: "出库日期时间",
        value: "exportTime",
        component: "Date",
        componentProps: {
          placeholder: "请输入使用场景",
          type: "datetime",
          valueFormat: "YYYY-MM-DD HH:mm:ss",
        },
      },
      { /* Text 配置信息 */
        prop: 'weightNow',
        label: '设备重量',
        value: 'weightNow',
        component: 'Text',
        style: {width: '100%'},
        componentProps: {
          get text() {
            return deviceDetailData.value.weightNow
          }
        }
      },
     { /* 插槽自定义表单项 */
        prop: 'courseTime',
        label: '',
        value: 'courseTime',
        slot: 'courseTime',
        style: {width: '100%'}
      },
    ],
  },
</script>

```
