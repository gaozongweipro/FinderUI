<template>
  <el-button
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script setup>
import { ElButton } from 'element-plus'

const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: value => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: value => ['large', 'default', 'small'].includes(value)
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = evt => {
  emit('click', evt)
}
</script>
