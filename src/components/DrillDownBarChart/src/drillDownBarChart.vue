<template>
    <div class="card">
        <div class="card-header">
            <span class="card-title">{{ title }}</span>
            <el-breadcrumb :separator="'/'">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbList" @click="handleSwitchLevel(index, item)">{{
                    item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="card-body">
            <div :id="id ? id : 'bar'" class='bar'></div>
        </div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
import { onMounted, ref, reactive, computed, defineProps } from 'vue';
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    customOptions: {
        type: Object,
        default: () => ({})
    },
    sourceData: {
        type: Array,
        default: () => []
    },
    id: {
        type: String,
        default: ''
    },
    xKey: {
        type: String,
        default: 'name'
    },
    yKey: {
        type: String,
        default: 'value'
    },
    color: {
        type: String,
        default: '#6395FA'
    }
})
const chartDom = ref(null)
const barChart = ref(null)
const renderData = ref([])
const xData = computed(() => {
    return renderData.value.map(item => item[props.xKey])
})
const seriesData = computed(() => {
    return renderData.value.map(item => item[props.yKey])
})
const breadcrumbList = ref([])
const sourceData = ref([
    {
        "name": "root1",
        "value": 0,
        "children": [
            {
                "name": "child1_1",
                "value": 1,
                "children": [
                    {
                        "name": "grandchild1_1",
                        "value": 2
                    },
                    {
                        "name": "grandchild1_2",
                        "value": 3
                    }
                ]
            },
            {
                "name": "child1_2",
                "value": 4,
                "children": [
                    {
                        "name": "grandchild1_3",
                        "value": 5
                    },
                    {
                        "name": "grandchild1_4",
                        "value": 6
                    }
                ]
            }
        ]
    },
    {
        "name": "root2",
        "value": 7,
        "children": [
            {
                "name": "child2_1",
                "value": 8,
                "children": [
                    {
                        "name": "grandchild2_1",
                        "value": 9
                    },
                    {
                        "name": "grandchild2_2",
                        "value": 10
                    }
                ]
            },
            {
                "name": "child2_2",
                "value": 11,
                "children": [
                    {
                        "name": "grandchild2_3",
                        "value": 12
                    },
                    {
                        "name": "grandchild2_4",
                        "value": 13
                    }
                ]
            }
        ]
    }
])
const option = reactive({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '1%', // 左边距为 5%
        right: '5%', // 右边距为 5%
        bottom: '5%',
        top: '4%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        // data: ['色谱仪器', '样品处理仪器', '力学试验仪器', '物性测量仪器', '物性测量仪器', '光谱仪器', '样品处理仪器', '力学试验仪器'],
        data: [],
        axisLabel: {
            color: '#86909C'
        },
        axisTick: {
            alignWithLabel: true
        },
        axisLine: {
            lineStyle: {
                color: '#86909C'
            }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: '#F2F3F5'
            },
            axisLabel: {
                color: '#4E5969'
            }
        }
    },
    series: [
        {
            // data: [120, 200, 150, 80, 70, 110, 130, 30],
            data: [],
            type: 'bar',
            // showBackground: true,
            backgroundStyle: {
                color: '#F5F7FD'
            },
            barWidth: '20%',

            // barWidth: 50,
            // barWidth: '40%',
            itemStyle: {
                borderColor: '#F5F7FD',
                // borderWidth: 15,
                color: props.color
            }
        }
    ]
})

// 点击面包屑切换展示数据层级
function handleSwitchLevel(index, item) {
    console.log(item)
    breadcrumbList.value.splice(index)
    renderData.value = item.value
    updateChartData()
}

// 计算下级数据并刷新图表
function updateChartData() {
    // 更新面包屑
    barChart.value.setOption({
        xAxis: {
            data: xData.value
        },
        series: [{
            data: seriesData.value
        }]
    })
}

function setOption(data) {
    renderData.value = data
    updateChartData()
}

onMounted(() => {
    chartDom.value = document.getElementById(props.id ? props.id : 'bar')
    barChart.value = echarts.init(chartDom.value)
    renderData.value = props.sourceData ? props.sourceData : sourceData.value
    console.log('renderData', renderData.value)
    barChart.value.setOption(option)
    barChart.value.setOption(props.customOptions ? props.customOptions : {}) // 自定义配置覆盖默认配置
    updateChartData()

    // 为柱状图添加点击事件
    barChart.value.on('click', (params) => {
        if (params.componentType === 'series' && params.seriesType === 'bar') {
            // 判断当前点击的柱子是否有子级
            const index = params.dataIndex
            if (renderData.value[index].children?.length > 0) {
                // 更新面包屑数据, 注意要在更新renderData之前操作
                breadcrumbList.value = [...breadcrumbList.value, {
                    name: params.name,
                    value: renderData.value
                }]
                renderData.value = renderData.value[index].children
                updateChartData()
            } else {
                // 给出没有子级的提示信息
                ElMessage.warning('没有下级数据')
            }
        }
    });
    window.addEventListener('resize', () => {
        barChart.value.resize()
    })
})

defineExpose({
    setOption
})
</script>
<style scoped lang='scss'>
.card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid #f7f7f7;
    padding: 16px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;

    .card-header {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .card-title {
            color: #1D2129;
            font-size: 16px;
            line-height: 24px;
            height: 24px;
            font-weight: 500;
        }

    }

    .card-body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .bar {
            height: 100%;
            width: 100%;
        }
    }
}

:deep(.el-breadcrumb__item) {
    cursor: pointer;
    color: #1D2129;
    font-size: 14px;
    height: 20px;
    line-height: 20px;

    &:hover .el-breadcrumb__inner {
        color: #409eff;
        cursor: pointer;
    }
}
</style>