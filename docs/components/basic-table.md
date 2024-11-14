# BasicTable组件

## 配置参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 表格id，当同时使用多个表格是用来区分 | string | '' |
| columns | 表格列配置 | Array | [] |
| loading | 表格加载状态 | boolean | false |
| tableColumns | 表格列配置 | Array | [] |
| tableData | 表格数据 | Array | [] |
| pageCount | 表格数据 | Array | [] |
| columns | 表格列配置 | Array | [] |
| rowValue | 行key | String | id |
| showRadio | 是否展示单选框 | boolean | false |
| showCheckbox | 是否展示复选框 | boolean | false |
| rowKey | String | id |
| multiple | 是否是多选 | boolean | false |
| showIndex | 是否展示索引 | boolean | true |
| showExpand | 是否行折叠按钮 | boolean | false |
| showPagination | 是否显示分页 | boolean | true |
| message | 分页搜索参数 | object | {} |
| customAttributes | 自定义属性 | object | {} |
| border | 是否显示边框 | boolean | true |
| cellStyle | 单元格样式 | object | {} |
| headerRowStyle | 行头样式 | object | {} |
| headerCellStyle | 行单元格样式 | object | {} |
| paginationKeyMap | 分页搜索参数的key | object | {} |
| rowClick | 单行点击回调函数 | function | () => {} |
| actionBtnConfig | 行操作按钮配置 | object | {} |
| disabledCheck| 条件设置行禁用状态| function| row => {}|
### columns 行数据

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 列key | string | '' |
| customAttribute | 自定义属性 | object | {} |
| label | 列名称 | string | '' |
| width | 列宽度 | number |  |
| minWidth | 列最小宽度 | number |  |
| formatter | 格式化显示内容 | function | (row) => {}|
| align | 单元格内文字对其方式 | string | 'left' |
| fixed | 当前列是否锚定 | boolean |  |
| style | 当前列自定义样式 | object | {} |
| hideToolTip | 是否隐藏tooltip | boolean |  false |
| showCellType | 单元格内以颜色块展示内容 | function | (row[col.prop]) => {} |
| slot | 自定义插槽 | function | (row[col.prop]) => {} |
### actionBtnConfig操作按钮配置参数
当actioniBtnConfig是array的时候表示有多个操作按钮列；当为object的时候表示只有一个操作按钮列
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fixed | 固定按钮 | string | right |
| label | 操作列标题 | string |  |
| width | 操作列宽度 | string | 100px |
| hidden | 是否隐藏 | boolean | false |
| btnsConfig | 操作按钮配置参数 | object | {} |
| btnsConfig.key | 操作按钮的key，其中为'delete'时会有提示弹窗 | string | '' |
| btnsConfig.label | 操作按钮名称 | string | '' |
| btnsConfig.icon | 操作按钮图标 | string | '' |
| btnsConfig.type | 操作按钮类型 | string | '' |
| btnsConfig.svgIcon | 操作按钮图标名称 | string | '' |
| btnsConfig.customAttribute | 操作按钮自定义属性 | string | '' |

## Method
| 参数 | 说明 | 参数 | 参数说明 |
| --- | --- | --- | --- |
| setRowSelection | 设置指定行的选中状态 | arr, selected | arr: 要选中的行数据列表， 选中状态，true：选中，false: 不选中 |
| setCurrentRow | 设置单选状态下行的选中状态 | data | 要设置的选中行的数据 |
| allSelectedData | 所有选中行的数据 | array | [] |
| allSelectedRows | 所有选中行的数据，key:value的形式存储 | {} | '' |
| currentSelectRow | 当前按钮选中行数据的key | string | '' |
| currentSelectRowData | 操作按钮的key，其中为'delete'时会有提示弹窗 | object | {} |
| initPagination | 操作按钮名称 | string | '' |
| toggleRowExpansion | 展开折叠的行 | row, expanded | row：展开行数据，expanded：是否展开  |

## 代码示例
```js
const tableConfig = reactive({
  tableData,
  pageCount,
  message: {limit, page},
  paginationChange: onPageChange,
  actionBtnConfig: {
    label: "配置详情",
    show: true,
    fixed: "right",
    width: 100,
    btnsConfig: [
      {
        key: "config",
        label: "设置",
        svgIcon: "config",
        click: toolsbtn,
      },
    ],
  },
  columns: [
    {
      prop: "deviceCode",
      value: "deviceCode",
      label: "设备编号",
      minWidth: 120,
      fixed: "left",
    },
    {
      prop: "deviceName",
      value: "deviceName",
      minWidth: 120,
      label: "设备名称",
    },
    {
      prop: "deviceStatus",
      value: "deviceStatus",
      label: "运营状态",
      minWidth: "100",
      showCellType: val => val == 1 ? '激活' : '未激活'
    },
    {
      prop: "deviceType",
      value: "deviceType",
      label: "设备类型",
      minWidth: "100",
      formatter: (row) => options.typeMap[row.deviceType],
    },
    {
      prop: "model",
      value: "model",
      minWidth: 150,
      label: "设备型号",
      showCellType: val => options.modelMap[val]
    },
    {
      prop: "networkStatus",
      label: "网络状态",
      minWidth: "100",
      showCellType: val => val.toString() === '0' ? '离线' : '在线'
    },
    {
      prop: "deptName",
      value: "deptName",
      minWidth: 120,
      label: "所属机构",
    },
    {
      prop: "address",
      value: "address",
      minWidth: 150,
      label: "地址",
    },
    {
      prop: "remark",
      value: "remark",
      label: "备注",
    },
  ],
});
```

## 表格相关hooks
```
// 表格初始化
const {
  resData, // 表格参数返回到所有参数，用来显示设备统计卡片数据
  tableData, // 表格数据
  pageCount, // 表格数据宗条数
  loading, // 表格是否loading
  search, // 表格搜索接口
  refresh, // 表格搜索接口
  reset, // 表格重置接口
  page, // 当前页码
  limit, // 一页显示的数据条数
  fetchData, // 获取表格数据
  onPageChange, // 页面改变的回调，通常放在tableConfig中的paginationChange中
} = useTable(
    resourceinfo, // 表格数据请求接口
    { // 表格搜索参数
      get deviceCode() {
        return deviceCode.value
      },
      recordType: 'image'
    }, { // 表格返回数据字段指定
      data: 'data.dataArr',
      total: 'total',
      pageKey: 'pageNum',
      limitKey: 'pageSize',
    },
    5, // 自定义表格一页显示条数
     handleInfo, // 固定的回调函数，在fetchData,search, refresh, reset执行都会执行该回调函数
     isFormData, // 搜索参数是否以表单形式提交
     errorCallFn, // 表格数据请求接口报错回调函数
)

```