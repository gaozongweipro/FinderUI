<template>
    <el-form ref="formRef" :model="_formData" label-width="100px" :rules="rules" :style="formStyle" v-bind="$attrs"
        :disabled="loading">
        <template v-for="item in formItemConfig" :key="item.value">
            <el-form-item :prop="item.value" v-bind="item" v-show="!item.hidden">
                <!-- 表单项label -->
                <template v-if="item.label || item.labelSlot" #label>
                    <slot v-if="item.labelSlot" :name="item.labelSlot" :scoped="item"></slot>
                    <span v-else :style="labelStyle || item.labelStyle" v-html="item.label"></span>
                </template>
                <slot v-if="item && item.slot" :name="item.slot" :scoped="item"></slot>
                <!-- 表单项内容 -->
                <el-input v-if="item.component === 'Input'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps" :type="item?.componentProps?.type"
                    :style="item?.componentProps?.style"></el-input>
                <el-select v-if="item.component === 'Select'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps" :style="item?.componentProps?.style">
                    <el-option v-for="option in item?.componentProps?.options" v-bind="option"></el-option>
                </el-select>
                <el-switch v-if="item.component === 'Switch'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps" :style="item?.componentProps?.style">
                </el-switch>
                <el-date-picker v-if="item.component === 'DatePicker'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps" :style="item?.componentProps?.style"></el-date-picker>
                <el-input v-if="item.component === 'Textarea'" v-model="_formData[item.value]" type="textarea"
                    v-bind="item?.componentProps" :style="item?.componentProps?.style"></el-input>
                <el-checkbox v-if="item.component === 'CheckBox'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps"></el-checkbox>
                <el-checkbox-group v-if="item.component === 'CheckBoxGroup'" v-model="_formData[item.value]"
                    v-bind="item?.componentProps">
                    <el-checkbox v-for="(option, index) in item?.componentProps?.options" :key="option.value || index"
                        v-bind="option">
                    </el-checkbox>
                </el-checkbox-group>
                <el-divider v-if="item.component === 'Divider'" v-bind="item?.componentProps"></el-divider>
            </el-form-item>
        </template>
    </el-form>
</template>
<script setup>
// 定义表单项配置类型
// interface FormItemOption {
//     label?: string
//     value: string
//     component: 'Input' | 'Select' | 'Switch' | 'DatePicker' | 'Textarea' | 'CheckBox' | 'CheckBoxGroup' | 'Divider'
//     style?: Record<string, any>
//     labelStyle?: Record<string, any>
//     labelSlot?: string
//     slot?: string
//     componentProps?: Record<string, any>
// }

const props = defineProps({
    formItemConfig: {
        type: Array,
        default: () => [],
        validator: (value) => {
            return value.every(item => item.value !== undefined && item.component !== undefined)
        }
    },
    formData: {
        type: Object,
        required: true
    },
    rules: {
        type: Object,
        default: () => ({})
    },
    labelStyle: {
        type: Object,
        default: () => ({})
    },
    formStyle: {
        type: Object,
        default: () => ({})
    },
    formItemStyle: {
        type: Object,
        default: () => ({})
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:formData'])

const _formData = computed({
    get: () => props.formData,
    set: (val) => emit('update:formData', val)
})

const formRef = ref(null)

// 表单验证方法
const validate = () => {
    return new Promise((resolve, reject) => {
        formRef.value?.validate((valid, fields) => {
            if (valid) {
                resolve(true)
            } else {
                reject(fields)
            }
        })
    })
}

// 重置表单
const resetFields = () => {
    formRef.value?.resetFields()
}

// 清除单个表单项
const clearField = (field) => {
    formRef.value?.clearValidate(field)
}

defineExpose({
    validate,
    resetFields,
    clearField
})

</script>
<style scoped lang="scss"></style>
