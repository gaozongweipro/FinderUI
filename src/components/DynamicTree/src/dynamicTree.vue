<template>
    <div class="dynamic-tree">
      <!-- 顶部区域 -->
      <div class="tree-header">
        <h3 class="title">{{ title }}</h3>
        <div class="header-actions">
          <el-icon class="add-icon" @click="handleAddRoot">
            <Plus />
          </el-icon>
        </div>
      </div>
  
      <!-- 搜索区域 -->
      <div v-if="showSearch" class="search-area">
        <el-input v-model="searchText" :placeholder="searchPlaceholder" clearable size="default" @input="debounceSearch">
          <template #suffix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>
      </div>
  
      <!-- 树形结构 -->
      <div class="tree-content">
        <el-tree ref="treeRef" :data="treeData" :props="defaultProps" :filter-node-method="filterNode"
          :expand-on-click-node="false" :draggable="draggable" :allow-drag="allowDrag" :allow-drop="allowDrop"
          default-expand-all node-key="id" highlight-current :empty-text="emptyText" @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-end="handleDragEnd"
          @node-drop="handleDrop" @node-click="handleNodeClick" @node-contextmenu="handleContextMenu">
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="node-content">
                <el-icon v-if="data.icon">
                  <component :is="data.icon" />
                </el-icon>
                <span class="node-label" :title="data[props.labelKey]">{{ data[props.labelKey] }}</span>
              </span>
              <span v-if="data.children" class="operation">
                <div class="operation-wide">
                  <el-icon class="operation-icon" @click.stop="handleAdd(data)">
                    <Plus />
                  </el-icon>
                  <el-dropdown trigger="hover" @command="(command) => handleCommand(command, data)">
                    <el-icon class="operation-icon">
                      <More />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="edit">
                          <el-icon>
                            <Edit />
                          </el-icon>编辑
                        </el-dropdown-item>
                        <el-dropdown-item command="delete" class="danger">
                          <el-icon>
                            <Delete />
                          </el-icon>删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
  
                <div class="operation-narrow">
                  <el-dropdown trigger="hover" @command="(command) => handleCommand(command, data)">
                    <el-icon class="operation-icon">
                      <More />
                    </el-icon>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="add">
                          <el-icon>
                            <Plus />
                          </el-icon>新增
                        </el-dropdown-item>
                        <el-dropdown-item command="edit">
                          <el-icon>
                            <Edit />
                          </el-icon>编辑
                        </el-dropdown-item>
                        <el-dropdown-item command="delete" class="danger">
                          <el-icon>
                            <Delete />
                          </el-icon>删除
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </span>
            </div>
          </template>
        </el-tree>
      </div>
  
      <!-- 右键菜单 -->
      <div v-show="contextMenu.visible" class="context-menu" :style="contextMenuStyle">
        <ul>
          <li @click="handleContextMenuCommand('add')">
            <el-icon>
              <Plus />
            </el-icon>新增子节点
          </li>
          <li @click="handleContextMenuCommand('edit')">
            <el-icon>
              <Edit />
            </el-icon>编辑节点
          </li>
          <li class="danger" @click="handleContextMenuCommand('delete')">
            <el-icon>
              <Delete />
            </el-icon>删除节点
          </li>
        </ul>
      </div>
  
      <!-- 新增/编辑弹窗 -->
      <el-dialog v-model="dialogVisible" :title="dialogType === 'add' ? (currentNode ? '新增子节点' : '新增根节点') : '编辑节点'"
        width="500px" destroy-on-close>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入节点名称" />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-select v-model="form.icon" clearable placeholder="请选择图标">
              <el-option v-for="icon in iconList" :key="icon" :label="icon" :value="icon">
                <el-icon>
                  <component :is="icon" />
                </el-icon>
                <span style="margin-left: 8px">{{ icon }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入节点描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :loading="submitting">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Plus, More, Search, Edit, Delete } from '@element-plus/icons-vue'
  import { debounce } from 'lodash-es'
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'
  
  const props = defineProps({
    title: {
      type: String,
      default: '树形结构'
    },
    treeData: {
      type: Array,
      required: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showExpandAll: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: '请输入关键字搜索'
    },
    hoverShowButtons: {
      type: Boolean,
      default: false, // 默认不开启悬浮显示
    },
    draggable: {
      type: Boolean,
      default: false, // 默认不允许拖拽
    },
    dragConfig: {
      type: Object,
      default: () => ({
        allowDrag: () => true, // 默认允许所有节点拖拽
        allowDrop: () => true, // 默认允许所有位置放置
      })
    },
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'id'
    }
  })
  
  const emit = defineEmits([
    'add',
    'edit',
    'delete',
    'node-click',
    'node-drag',
    'select-change'
  ])
  
  // 树实例
  const treeRef = ref(null)
  const searchText = ref('')
  const dialogVisible = ref(false)
  const dialogType = ref('add')
  const currentNode = ref(null)
  const submitting = ref(false)
  const isExpandAll = ref(false)
  const selectedKeys = ref([])
  
  // 右键菜单
  const contextMenu = ref({
    visible: false,
    x: 0,
    y: 0,
    node: null
  })
  
  // 图标列表
  const iconList = ref(Object.keys(ElementPlusIconsVue))
  
  // 计算右键菜单样式
  const contextMenuStyle = computed(() => {
    return {
      left: contextMenu.value.x + 'px',
      top: contextMenu.value.y + 'px'
    }
  })
  
  // 空状态文本
  const emptyText = computed(() => {
    return searchText.value ? '暂无搜索结果' : '暂无数据'
  })
  
  // 表单相关
  const formRef = ref(null)
  const form = ref({
    name: '',
    icon: '',
    description: ''
  })
  
  const rules = {
    name: [
      { required: true, message: '请输入节点名称', trigger: 'blur' },
      { min: 2, max: 50, message: '在 2 到 50 个字符', trigger: 'blur' }
    ]
  }
  
  const defaultProps = computed(() => ({
    children: 'children',
    label: props.labelKey
  }))
  
  // 搜索功能
  const debounceSearch = debounce((val) => {
    handleSearch()
  }, 300)
  
  const handleSearch = () => {
    treeRef.value?.filter(searchText.value)
  }
  
  // 节点过滤
  const filterNode = (value, data) => {
    if (!value) return true
    return data[props.labelKey].toLowerCase().includes(value.toLowerCase())
  }
  
  // 展开/收起所有
  const toggleExpand = () => {
    isExpandAll.value = !isExpandAll.value
    if (isExpandAll.value) {
      treeRef.value?.expandAll()
    } else {
      treeRef.value?.collapseAll()
    }
  }
  
  // 拖拽相关
  const allowDrag = (node) => {
    if (!props.draggable) return false
    return props.dragConfig.allowDrag(node)
  }
  
  const allowDrop = (draggingNode, dropNode, type) => {
    if (!props.draggable) return false
    return props.dragConfig.allowDrop(draggingNode, dropNode, type)
  }
  
  const handleDragStart = (node, ev) => {
    emit('node-drag', { type: 'start', node, event: ev })
  }
  
  const handleDragEnter = (draggingNode, dropNode, ev) => {
    emit('node-drag', { type: 'enter', draggingNode, dropNode, event: ev })
  }
  
  const handleDragLeave = (draggingNode, dropNode, ev) => {
    emit('node-drag', { type: 'leave', draggingNode, dropNode, event: ev })
  }
  
  const handleDragEnd = (draggingNode, dropNode, dropType, ev) => {
    emit('node-drag', { type: 'end', draggingNode, dropNode, dropType, event: ev })
  }
  
  const handleDrop = (draggingNode, dropNode, dropType, ev) => {
    emit('node-drag', { type: 'drop', draggingNode, dropNode, dropType, event: ev })
  }
  
  // 节点点击
  const handleNodeClick = (data, node) => {
    emit('node-click', data, node)
  }
  
  // 右键菜单
  const handleContextMenu = (event, data, node) => {
    event.preventDefault()
    contextMenu.value = {
      visible: true,
      x: event.clientX,
      y: event.clientY,
      node: { data, node }
    }
  }
  
  const handleContextMenuCommand = (command) => {
    const { data } = contextMenu.value.node
    if (command === 'add') {
      handleAdd(data)
    } else if (command === 'edit') {
      handleEdit(data)
    } else if (command === 'delete') {
      handleDelete(data)
    }
    contextMenu.value.visible = false
  }
  
  // 点击空白处关闭右键菜单
  const closeContextMenu = (e) => {
    if (!e.target.closest('.context-menu')) {
      contextMenu.value.visible = false
    }
  }
  
  // 生命周期钩子
  onMounted(() => {
    document.addEventListener('click', closeContextMenu)
  })
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeContextMenu)
  })
  
  // 新增根节点
  const handleAddRoot = () => {
    dialogType.value = 'add'
    currentNode.value = null
    form.value = {
      name: '',
      description: ''
    }
    dialogVisible.value = true
  }
  
  // 新增子节点
  const handleAdd = (data) => {
    dialogType.value = 'add'
    currentNode.value = data
    form.value = {
      name: '',
      description: ''
    }
    dialogVisible.value = true
  }
  
  // 处理更多菜单命令
  const handleCommand = (command, data) => {
    if (command === 'edit') {
      handleEdit(data)
    } else if (command === 'delete') {
      handleDelete(data)
    }
  }
  
  // 编辑节点
  const handleEdit = (data) => {
    dialogType.value = 'edit'
    currentNode.value = data
    form.value = {
      name: data[props.labelKey],
      description: data.description || ''
    }
    dialogVisible.value = true
  }
  
  // 删除节点
  const handleDelete = (data) => {
    ElMessageBox.confirm(
      '确认删除该节点及其所有子节点吗？此操作不可恢复',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'el-button--danger'
      }
    ).then(() => {
      emit('delete', data)
      ElMessage.success('删除成功')
    }).catch(() => { })
  }
  
  // 取消表单
  const handleCancel = () => {
    dialogVisible.value = false
    formRef.value?.resetFields()
  }
  
  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return
  
    try {
      submitting.value = true
      await formRef.value.validate()
  
      const data = {
        ...form.value,
        [props.valueKey]: currentNode.value?.[props.valueKey]
      }
  
      if (dialogType.value === 'add') {
        emit('add', data)
      } else {
        emit('edit', { ...currentNode.value, ...data })
      }
  
      dialogVisible.value = false
      ElMessage.success(dialogType.value === 'add' ? '添加成功' : '编辑成功')
      formRef.value.resetFields()
    } catch (error) {
      console.error('表单验证失败:', error)
    } finally {
      submitting.value = false
    }
  }
  
  // 对外露的方法
  defineExpose({
    expandAll: () => {
      treeRef.value?.expandAll()
    },
    collapseAll: () => {
      treeRef.value?.collapseAll()
    },
    // 获取当前选中节点
    getSelectedNode: () => {
      return treeRef.value?.getCurrentNode()
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .dynamic-tree {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 230px; // 设置最小宽度
  
    .tree-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      margin-bottom: 8px; // 增加与搜索框的间距
  
      .title {
        margin: 0;
        font-size: 16px; // 改为16px
        font-weight: 500; // 调整字重
        color: #1D2129; // 改为指定颜色
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
  
      .header-actions {
        display: flex;
        gap: 4px;
        flex-shrink: 0;
  
        .add-icon {
          cursor: pointer;
          font-size: 18px; // 增大图标大小
          color: #4080FF;
          transition: all 0.3s;
          width: 32px; // 设置固定宽度
          height: 32px; // 设置固定高度
          display: flex;
          align-items: center;
          justify-content: center;
  
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  
    .search-area {
      padding: 0 12px 12px; // 移除上内边距，保持左右和下内边距
  
      :deep(.el-input__wrapper) {
        padding: 0 8px;
        height: 32px; // 改为32px高度
        border-radius: 6px; // 改为6px圆角
        box-shadow: 0 0 0 1px #dcdfe6 inset;
  
        &.is-focus {
          box-shadow: 0 0 0 1px var(--el-color-primary) inset;
        }
      }
  
      :deep(.el-input__inner) {
        font-size: 14px;
        height: 32px; // 确保输入框高度一致
      }
  
      :deep(.el-input__prefix) {
        display: none; // 隐藏左侧图标
      }
  
      :deep(.el-input__suffix) {
        right: 8px; // 调整右侧图标位置
      }
  
      :deep(.el-input__icon) {
        line-height: 32px; // 调整图标垂直居中
      }
    }
  
    .tree-content {
      flex: 1;
      overflow: auto;
      padding: 12px;
    }
  
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding-right: 4px;
  
      .node-content {
        display: flex;
        align-items: center;
        gap: 4px;
        min-width: 0; // 确保文本可以正确截断
        flex: 1;
  
        .node-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
  
        .el-icon {
          flex-shrink: 0;
        }
      }
  
      .operation {
        opacity: v-bind('hoverShowButtons ? 0 : 1');
        transition: opacity 0.3s;
        flex-shrink: 0;
        margin-left: 4px;
        display: flex;
        align-items: center;
  
        .operation-icon {
          cursor: pointer;
          color: #C9CDD4;
          font-size: 14px; // 减小图标大
          padding: 4px; // 减小内边距
          border-radius: 4px;
          background-color: #F7F8FA;
          transition: all 0.3s;
          width: 24px; // 减小固定宽度
          height: 24px; // 减小固定高度
          display: flex;
          align-items: center;
          justify-content: center;
  
          &:hover {
            background-color: #E8E9EB;
            color: #A3A6AD;
          }
  
          &:active {
            background-color: #DADBDD;
            color: #8B8E95;
          }
        }
  
        // 宽屏显示
        .operation-wide {
          display: flex;
          align-items: center;
          gap: 6px; // 减小按钮间距
  
          @media screen and (max-width: 280px) {
            display: none;
          }
        }
  
        // 窄屏显示
        .operation-narrow {
          display: none;
  
          @media screen and (max-width: 280px) {
            display: block;
          }
        }
      }
  
      &:hover .operation {
        opacity: 1;
      }
    }
  
    // 调整右键菜单样式
    .context-menu {
      ul li {
        font-size: 12px;
        padding: 6px 12px;
      }
    }
  }
  
  :deep(.el-tree-node__content) {
    height: 32px; // 减小节点高度
    padding-right: 4px;
  }
  
  :deep(.el-tree) {
    font-size: 12px; // 减小树的字体大小
    color: #1D2129; // 设置所有节点文字颜色
  
    // 修改展开图标的显示逻辑
    .el-tree-node__expand-icon {
      color: #1D2129;
  
      &.is-leaf {
        display: none; // 没有子节点时完全隐藏图标
      }
    }
  
    .el-tree-node {
  
      // 父节点样式
      &:not(.is-leaf)>.el-tree-node__content {
        .node-label {
          font-weight: 500;
        }
      }
  
      // 选中状态
      &.is-current>.el-tree-node__content {
        background-color: #F7F9FF !important;
        color: #4080FF;
        position: relative;
  
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: #2468F2;
          clip-path: polygon(0 0, 100% 15%, 100% 85%, 0 100%); // 使用 clip-path 创建梯形
        }
  
        // 选中状态下的展开图标颜色
        .el-tree-node__expand-icon:not(.is-leaf) {
          color: #4080FF;
        }
      }
  
      .el-tree-node__content {
        padding-left: 10px; // 调整没有展开图标时的缩进
  
        &:hover {
          background-color: #F7F9FF;
        }
      }
  
      // 有子节点的节点保持原有缩进
      &:not(.is-leaf) {
        .el-tree-node__content {
          padding-left: 0;
        }
      }
    }
  }
  
  :deep(.el-button--small) {
    padding: 4px 8px;
  }
  
  :deep(.el-dropdown-menu) {
    min-width: 90px; // 设置下拉菜单最小宽度
  
    .el-dropdown-menu__item {
      .el-icon {
        color: #C9CDD4;
      }
  
      &:hover {
        .el-icon {
          color: #A3A6AD;
        }
      }
  
      &.danger {
        &:hover {
          .el-icon {
            color: #f56c6c;
          }
        }
      }
    }
  }
  
  // 优化拖拽样式
  :deep(.el-tree-node.is-drop-inner > .el-tree-node__content) {
    background-color: var(--el-color-primary-light-9);
  }
  
  // 优化图标大小
  :deep(.el-icon) {
    font-size: 14px;
  }
  </style>