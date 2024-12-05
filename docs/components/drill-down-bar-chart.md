# DrillDownBarChart 下钻柱状图

基于 ECharts 的可下钻柱状图组件。

## 基础用法

基础的下钻柱状图用法。

<div class="demo-block">
  <drill-down-bar-chart
    :data="chartData"
    :options="chartOptions"
    @drill-down="handleDrillDown"
    @drill-up="handleDrillUp"
  />
</div> 


## API

### 属性

| 属性名   | 说明     | 类型   | 默认值 |
|----------|----------|--------|--------|
| data     | 图表数据 | array  | []     |
| options  | 图表配置 | object | {}     |
| height   | 图表高度 | string | 400px  |
| loading  | 加载状态 | boolean| false  |

### 事件

| 事件名     | 说明     | 回调参数 |
|------------|----------|----------|
| drill-down | 下钻事件 | (params: object) 下钻参数 |
| drill-up   | 返回上级 | -        |

### Options 配置项

| 参数名    | 说明     | 类型   | 默认值 |
|-----------|----------|--------|--------|
| title     | 图表标题 | string | -      |
| xAxisName | X轴名称  | string | -      |
| yAxisName | Y轴名称  | string | -      |