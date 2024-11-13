<template>
    <div class="paginationAll">
        <div style="
          width: 100%;
          position: relative;
          height: 48px;
          display: flex;
          align-items: end;
        ">
            <el-pagination :current-page="message.data.pageNum" :page-size="message.data.pageSize"
                :page-sizes="[5, 10, 20, 30, 50]" :small="small" :background="background"
                layout="slot, prev, pager, next, sizes, jumper" :total="message.data.pagecount"
                @current-change="handleCurrentChange" @size-change="handleSizeChange"
                style="position: absolute; right: 20px">
                <span style="color: #404d61">共
                    <span style="color: #174bff">{{ message.data.pagecount }} </span>
                    条</span>
            </el-pagination>
        </div>
    </div>
</template>

<script setup>
import { ElPagination } from 'element-plus'
import { defineEmits, reactive, watch, ref, onBeforeMount } from "vue";

const emits = defineEmits(["tables"], ["tablesize"]); //获取父组件传递的函数

const prop = defineProps(["message"]); //获取父组件传递的数据

const background = ref(true);

const datas = ref("");

//分页字段
const message = reactive({
    data: { ...prop.message },
});

onBeforeMount(() => {
    message.data = prop.message;
});
defineOptions({
  name: 'PaginationAll'
})
//调用父组件的函数
const handleCurrentChange = (val) => {
    message.data.pageNum = val;
    emits("tables", message.data);
};

// 切换单页显示数量后回到第一页显示
const handleSizeChange = (val) => {
    message.data.pageSize = val;
    message.data.pageNum = 1;
    emits("tablesize", message.data);
};

//监听prop
watch(
    () => prop.message,
    (oldval, newval) => {
        message.data = prop.message;
    }
);
</script>

<style lang="scss" scoped>
.paginationAll {
    :deep(.el-pagination) {
        background-color: #ffffff !important;
        color: #174bff;

        .number {
            background: #ffffff;
            border: 1px solid #d9d9d9;
            color: rgba(0, 0, 0, 0.85);
        }

        .more {
            background: none !important;
            color: #bfbfbf;
        }

        .is-active {
            border: 1px solid #174bff;
            color: #174bff !important;
            background: #ffffff !important;
        }

        button {
            background: none !important;
            border: 1px solid #d9d9d9;
        }
    }
}
</style>