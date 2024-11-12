<template>
  <div class="basicTable">
    <el-table ref="basicTable" :id="config.id" v-bind="config?.customAttribute" :data="config?.tableData"
      :height="config?.height ? config.height : '100%'" :style="config?.style" :cell-style="config?.cellStyle"
      :header-cell-style="config?.headerCellStyle" :header-row-style="config?.headerRowStyle" :border="config?.border"
      :tree-props="config?.treeProps" :row-key="config?.rowValue" header-row-class-name="basicTableHeader"
      :default-expand-all="config?.defaultExpandAll" @expand-change="config?.expandChange" @row-click="handleRowClick"
      @select-all="selectAll" :selectable="canSelect" @click.stop>
      <template #empty>
        <div v-if="config.loading" class="loading">
          <!-- <img src="@/assets/img/loading.svg" alt="" /> -->
          <div style="
                text-align: center;
                font-weight: 400;
                flex: 1;
                font-size: 14px;
                line-height: 24px;
                color: #8e8e93;
                transform: translateY(-250%);
              ">
            搜索中...
          </div>
        </div>
        <div v-else class="noData">
          <!-- <img src="@/assets/img/empty.svg" alt="" /> -->
          <div style="
                text-align: center;
                font-weight: 400;
                flex: 1;
                font-size: 14px;
                line-height: 24px;
                color: #8e8e93;
                transform: translateY(-250%);
              ">
            暂无数据
          </div>
        </div>
      </template>
      <!-- 展开按钮 -->
      <el-table-column v-if="config.showExpand" type="expand" label="" width="50" fixed="left">
        <template #default="{ row }">
          <slot name="expand" :row="row"></slot>
        </template>
      </el-table-column>
      <!-- 单选框 -->
      <el-table-column v-if="config.showRadio && config.rowValue" width="50" fixed="left">
        <template #default="{ row }">
          <el-radio :id="`checkbox${row[config.rowValue]}`" v-model="currentSelectRow" :label="row[config.rowValue]"
            :disabled="config.disabledCheck ? config.disabledCheck(row) : row.disabled" readonly @click.stop
            @change=" (config.disabledCheck && config.disabledCheck(row)) ? () => { } : handleCheckBoxClick($event, row, $index)">{{
              " " }}</el-radio>
          <!-- @change="handleCheckBoxClick($event, row, $index)" -->
        </template>
      </el-table-column>
      <!-- 多选框 -->
      <el-table-column v-if="config.multiple && config.rowValue" type="selection" fixed="left">
        <template #default="{ row, $index }">
          <el-checkbox v-model="row.checked" :id="`checkbox${row[config.rowValue]}`"
            :disabled="config.disabledCheck ? config.disabledCheck(row) : row.disabled" readonly
            style="pointer-events: none"
            @change=" (config.disabledCheck && config.disabledCheck(row)) ? () => { } : handleCheckBoxClick($event, row, $index)"></el-checkbox>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <el-table-column v-if="config.showIndex" type="index" label="序号" width="60" fixed="left" align="center"
        class-name="indexColumn" style="text-align: center"></el-table-column>
      <template v-for="col in config.columns" :key="col.prop">
        <el-table-column v-bind="col.customAttribute" :label="col.label" :prop="col.prop" :width="col.width"
          :min-width="col.minWidth" :header-align="'center'" :formatter="col.formatter"
          :show-overflow-tooltip="!col.hideToolTip" :align="col?.align" :fixed="col.fixed" :style="col?.style"
          :class="col?.class">
          <template #default="{ row }">
            <slot v-if="col.slot" :name="col.slot" :row="row" :col="col"></slot>
            <StateCell v-if="col.showCellType" :presetType="col.showCellType(row[col.prop])"></StateCell>
          </template>
        </el-table-column>
      </template>
      <template v-if="config.actionBtnConfig && !config.actionBtnConfig.length">
        <el-table-column :label="config.actionBtnConfig.label" class-name="actionColumn"
          :fixed="config.actionBtnConfig.fixed" :width="config.actionBtnConfig.width" :align="'center'"
          :style="{ textAlign: 'center' }" :header-align="'center'">
          <template #default="scoped">
            <div v-if="!config.actionBtnConfig.dropdown" class="customCell">
              <template v-for="item in config.actionBtnConfig.btnsConfig" :key="item.key">
                <template v-if="!item.hidden || !item.hidden(scoped.row)">
                  <el-popover v-if="item.key === 'delete'" placement="top" :width="250" :trigger="'click'"
                    :visible="showIndex">
                    <div class="title" style="
                          font-weight: 400;
                          font-size: 16px;
                          color: #333333;
                          display: flex;
                          align-items: center;
                          gap: 5px;
                        ">
                      <el-icon size="17px" color="#ff6961">
                        <warning-filled />
                      </el-icon>
                      <span>提示</span>
                    </div>
                    <p style="
                          text-align: center;
                          font-weight: 400;
                          font-size: 14px;
                          color: #333333;
                        ">
                      {{ `操作不可撤销，确认${item.label}吗？` }}
                    </p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="showIndex = false">取消</el-button>
                      <el-button class="deletePopover" type="danger" size="mini" plain
                        @click="handleDelete(scoped.row, item)">{{ item.label }}</el-button>
                    </div>
                    <template #reference>
                      <el-button v-bind="item.customAttribute" :type="item.key === 'delete' ? 'danger' : item.type"
                        :icon="item.icon" :[item.directiveName]="item.directiveValue"
                        @click.stop="showIndex = scoped.index" class="tableActionBtn">
                        <svg-icon v-if="item.svgIcon" style="font-size: 20px; margin-right: 5px"
                          :icon-class="item.svgIcon"></svg-icon>
                        {{ item.label }}
                      </el-button>
                    </template>
                  </el-popover>
                  <el-button v-else v-bind="item.customAttribute" :type="item.type" :icon="item.icon"
                    :[item.directiveName]="item.directiveValue" @click.stop="item.click(scoped.row)"
                    class="tableActionBtn">
                    <svg-icon v-if="item.svgIcon" style="font-size: 20px; margin-right: 5px"
                      :icon-class="item.svgIcon"></svg-icon>
                    {{ item.label }}
                  </el-button>
                </template>
              </template>
            </div>


            <div v-else class="customCell">
              <template v-for="item in config.actionBtnConfig.btnsConfig" :key="item.key">
                <template v-if="item.show">
                  <template v-if="(!item.hidden || !item.hidden(scoped.row))">
                    <el-popover v-if="item.key === 'delete'" placement="top" :width="250" :trigger="'click'"
                      :visible="showIndex">
                      <div class="title" style="
                          font-weight: 400;
                          font-size: 16px;
                          color: #333333;
                          display: flex;
                          align-items: center;
                          gap: 5px;
                        ">
                        <el-icon size="17px" color="#ff6961">
                          <warning-filled />
                        </el-icon>
                        <span>提示</span>
                      </div>
                      <p style="
                          text-align: center;
                          font-weight: 400;
                          font-size: 14px;
                          color: #333333;
                        ">
                        {{ `操作不可撤销，确认${item.label}吗？` }}
                      </p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="showIndex = false">取消</el-button>
                        <el-button class="deletePopover" type="danger" size="mini" plain
                          @click="handleDelete(scoped.row, item)">{{ item.label }}</el-button>
                      </div>
                      <template #reference>
                        <el-button v-bind="item.customAttribute" :type="item.key === 'delete' ? 'danger' : item.type"
                          :icon="item.icon" :[item.directiveName]="item.directiveValue"
                          @click.stop="showIndex = scoped.index" class="tableActionBtn">
                          <svg-icon v-if="item.svgIcon" style="font-size: 20px; margin-right: 5px"
                            :icon-class="item.svgIcon"></svg-icon>
                          {{ item.label }}
                        </el-button>
                      </template>
                    </el-popover>
                    <el-button v-else v-bind="item.customAttribute" :type="item.type" :icon="item.icon"
                      :[item.directiveName]="item.directiveValue" @click.stop="item.click(scoped.row)"
                      class="tableActionBtn">
                      <svg-icon v-if="item.svgIcon" style="font-size: 20px; margin-right: 5px"
                        :icon-class="item.svgIcon"></svg-icon>
                      {{ item.label }}
                    </el-button>
                  </template>
                </template>
              </template>
              <el-dropdown>
                <el-button class="tableActionBtn">
                  <svg-icon style="font-size: 20px; margin-right: 5px" :icon-class="'select'"></svg-icon>
                  更多
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <template v-for="item in config.actionBtnConfig.btnsConfig" :key="item.key">
                      <template v-if="!item.show">
                        <el-dropdown-item v-if="item.key === 'delete'">
                          <el-popover v-if="item.key === 'delete'" placement="top" :width="250" :trigger="'click'"
                            :visible="showIndex">
                            <div class="title" style="
                                          font-weight: 400;
                                          font-size: 16px;
                                          color: #333333;
                                          display: flex;
                                          align-items: center;
                                          gap: 5px;
                                        ">
                              <el-icon size="17px" color="#ff6961">
                                <warning-filled />
                              </el-icon>
                              <span>提示</span>
                            </div>
                            <p style="
                                          text-align: center;
                                          font-weight: 400;
                                          font-size: 14px;
                                          color: #333333;
                                        ">
                              {{ `操作不可撤销，确认${item.label}吗？` }}
                            </p>
                            <div style="text-align: right; margin: 0">
                              <el-button size="mini" type="text" @click="showIndex = false">取消</el-button>
                              <el-button class="deletePopover" type="danger" size="mini" plain
                                @click="handleDelete(scoped.row, item)">{{ item.label }}</el-button>
                            </div>
                            <template #reference>
                              <div @click.stop="showIndex = scoped.index">
                                {{ item.label }}
                              </div>

                            </template>
                          </el-popover>
                        </el-dropdown-item>
                        <el-dropdown-item v-else @click.stop="item.click(scoped.row)">{{ item.label
                          }}</el-dropdown-item>
                      </template>
                    </template>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </template>
      <template v-if="config.actionBtnConfig && config.actionBtnConfig.length">
        <el-table-column v-for="action in config.actionBtnConfig" :key="action.label" :label="action.label"
          class-name="actionColumn" :fixed="action.fixed" :width="action.width" :align="'center'"
          :style="{ textAlign: 'center' }" :header-align="'center'">
          <template #default="scoped">
            <div class="customCell">
              <template v-for="item in action.btnsConfig" :key="item.key">
                <template v-if="!item.hidden || !item.hidden(scoped.row)">
                  <el-popover v-if="item.key === 'delete'" placement="top" :width="250" :trigger="'click'"
                    :visible="showIndex">
                    <div class="title" style="
                          font-weight: 400;
                          font-size: 16px;
                          color: #333333;
                          display: flex;
                          align-items: center;
                          gap: 5px;
                        ">
                      <el-icon size="17px" color="#ff6961">
                        <warning-filled />
                      </el-icon>
                      <span>提示</span>
                    </div>
                    <p style="
                          text-align: center;
                          font-weight: 400;
                          font-size: 14px;
                          color: #333333;
                        ">
                      {{ `操作不可撤销，确认${item.label}吗？` }}
                    </p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="showIndex = false">取消</el-button>
                      <el-button class="deletePopover" type="danger" size="mini" plain
                        @click="handleDelete(scoped.row, item)">{{ item.label }}</el-button>
                    </div>
                    <template #reference>
                      <el-button v-bind="item.customAttribute" :type="item.type" :icon="item.icon"
                        :[item.directiveName]="item.directiveValue" @click.stop="showIndex = scoped.index"
                        class="tableActionBtn">
                        <svg-icon v-if="item.svgIcon" style="font-size: 20px; margin-right: 5px"
                          :icon-class="item.svgIcon"></svg-icon>
                        {{ item.label }}
                      </el-button>
                    </template>
                  </el-popover>

                  <el-button v-else v-bind="item.customAttribute" :loading="item.loading" :type="item.type"
                    :icon="item.icon" :[item.directiveName]="item.directiveValue" @click.stop="item.click(scoped.row)"
                    class="tableActionBtn">
                    <svg-icon v-if="item.svgIcon && !item.loading" style="font-size: 20px; margin-right: 5px"
                      :icon-class="item.svgIcon"></svg-icon>
                    {{ item.loading ? (item.loadingText ? item.loadingText : '加载中') : item.label }}
                  </el-button>
                </template>
              </template>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <PaginationAll v-if="config?.showPagination" @tables="paginationChange" @tablesize="paginationChange"
    :message="{ ...paginationMessage, pagecount: config.pageCount }"></PaginationAll>
</template>
<script setup>
import { ElButton, ElTable, ElTableColumn, ElPopover, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import {
  ref,
  reactive,
  defineEmits,
  defineProps,
  onBeforeMount,
  computed,
  defineExpose,
  watch,
} from "vue";
import PaginationAll from "../../pagination/src/pagination.vue";
import { transformObjectKey } from '../../../utils/index.js'

const emit = defineEmits(["rowClick", "changePageSize", "changePageNum"]);
const props = defineProps(["tableConfig"]);
const allSelectedRows = ref({}); // key-value形式保存所有已选中的数据
const currentSelectRow = ref({}); // 当前选中行的key
const currentSelectRowData = ref({}); // 当前选中行的数据
const disabledRows = ref([]); // 禁用状态的行
const basicTable = ref(null);
const showIndex = ref(false);
const paginationMessage = computed({
  get: () => {
    const res = transformObjectKey(config.message, config.paginationKeyMap);
    return res;
  },
});

const canSelect = (row) => {
  if (config.multiple && hasCheckedItems.indexOf(row[config.rowValue]) > -1) {
    return false;
  } else {
    return true;
  }
};
// 行key
const allSelectedData = computed({
  get: () => {
    Object.values(allSelectedRows.value);
  },
});

const config = reactive({
  id: "tables",
  tableData: [],
  selectSinglePage: false, // 是否跨页选中
  defaultSelectKeys: [], // 默认选中数聚keys List
  defaultSelectNodes: [], // 默认选中数聚keys List
  style: {
    width: "100%",
    // marginTop: '15px',
  },
  border: true,
  height: "100%",
  rowValue: "", // 表格数据的唯一key
  multiple: false, // 是否支持多选, 在指定当选或多选的时候一定要设置rowValue,否则会导致选中异常
  cellStyle: {
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 400,
    // borderLeft: "2px solid #FFFFFF00",
    whiteSpace: "nowrap",
  },
  headerRowStyle: {
    overflow: "hidden",
  },
  headerCellStyle: {
    fontSize: "14px",
    fontFamily: "Microsoft YaHei",
    textAlign: "left",
    background: "#F7F7F9 !important",
  },
  customAttribute: {},
  showIndex: true, // 是否显示行索引
  showExpand: false, // 是否显示展开按钮，如果为true的话，通过expand插槽定义展开内容
  hasCheckedItems: [], // 多选状态下已经选中的行的key
  message: {},
  showPagination: true,
  paginationKeyMap: {
    pageNum: "page",
    pageSize: "limit",
  },
  /**
   * 行点击回调
   * @param {当前行数据} row
   * @param {所有选中行数据} selectRows
   * @param {当前行状态 true 选中； false 取消选中} selected
   */
  rowClick: (row, selectRows, selected) => { },
  paginationChange: () => { },
  columns: [],
});

/**
 * 点击删除按钮处理
 * @param row 当前行的数据
 * @param item 当前按钮的配置参数
 */
function handleDelete(row, item) {
  // 关闭提示框
  showIndex.value = false;
  // 调用配置的点击事件
  item.click && item.click(row);
}

function handleCheckBoxClick(checked, data, index) {
  console.log(checked);
  console.log(data);
  console.log(index);
  if (config.showRadio || config.multiple) {
    // 获取当前行的key
    const key = data[config.rowValue];

    // 存储当前点击行的数据
    // 判断当前行是要选中还是取消选中
    if (config.multiple) {
      console.log("multipe");
      // 如果当前点击的行是禁用行，就不进行操作
      if (disabledRows.value.indexOf(key) !== -1) return false;
      if (allSelectedRows.value[key]) {
        // 进行取消选中操作
        delete allSelectedRows.value[key];
      } else {
        allSelectedRows.value[key] = data;
      }
      // 设置对应的数据的点击状态
      config.tableData[index].checked = !!allSelectedRows.value[key];
    } else {
      currentSelectRow.value = checked;
      currentSelectRowData.value = data;
    }
    config.rowClick && config.rowClick(data);
  }
}

function handleRowClick(data) {
  if ((config.showRadio || config.multiple) && config.rowValue) {
    const key = data[config.rowValue];
    currentSelectRowData.value = data;
    if (config.showRadio) {
      currentSelectRow.value = key;
      config.rowClick && config.rowClick(data);
    } else {
      const changeEvent = new Event("change", { bubbles: true }); // 创建一个 change 事件
      document.getElementById(`checkbox${key}`).dispatchEvent(changeEvent);
    }
  }
}

function paginationChange(data) {
  if (config.selectSinglePage) {
    allSelectedRows.value = [];
  }
  config.paginationChange && config.paginationChange(data);
}

// 全选/取消全选
function selectAll(selection) {
  config.tableData.forEach((data) => {
    const key = data[config.rowValue];
    // 首先判断是不是禁用数据
    if (disabledRows.value.indexOf(key) === -1) {
      // 有长度表示全选，否则表示取消全选
      if (selection.length) {
        allSelectedRows.value[key] = data;
      } else {
        delete allSelectedRows.value[key];
      }
    }
  });
  setState();
}

/**
 * 设置指定行的选中状态
 * @param {row List} arr
 * @param {状态，默认为选中} selected
 */
function setRowSelection(arr, selected = true) {
  allSelectedRows.value = {};
  if (arr) {
    if (config.multiple) {
      let res = [];
      arr.forEach((data) => {
        res.push(data[config.rowValue]);
      });
      disabledRows.value = res;
    }
    setState();
  }
}

// 设置当前页数据的状态包括勾选和禁用
function setState() {
  config.tableData &&
    config.tableData.map((item) => {
      const key = item[config.rowValue]?.toString();
      item["checked"] =
        !!allSelectedRows.value[key] ||
        !!(disabledRows.value.indexOf(key) > -1);
      item["disabled"] = !!(disabledRows.value.indexOf(key) > -1);
      return item;
    });
}

// 重置分页状态
function initPagination() { }

function toggleRowExpansion(row, expanded) {
  basicTable.value.toggleRowExpansion(row, expanded);
}

// 单选状态下设置选中状态
function setCurrentRow(data) {
  currentSelectRow.value = data ? data : [];
}

onBeforeMount(() => {
  Object.assign(config, props.tableConfig);
});
watch(props.tableConfig, (val) => {
  Object.assign(config, val);
  setState();
});

defineExpose({
  setRowSelection,
  setCurrentRow,
  allSelectedData,
  allSelectedRows, // 表格选中数据
  currentSelectRow, // 单选选中行数据
  currentSelectRowData,
  initPagination,
  toggleRowExpansion,
});
</script>
<style lang="scss" scoped>
.basicTable {
  flex: 1;
  overflow: hidden;
  // margin: 16px 0;
}

// 操作按钮样式
.actionColumn {
  .el-button {
    color: #525d75;
    font-weight: 400;
    font-size: 14px;
    height: 100%;
    border: none !important;
    background: transparent !important;
  }

  .el-button:hover {
    color: #409cff !important;
    background: transparent !important;
  }

  .el-button:active {
    color: #2468f2 !important;
    background: transparent !important;
  }

  .el-button--danger:hover {
    color: #ff6961 !important;
    background: transparent !important;
  }

  .el-button--danger:active {
    color: #f42d22 !important;
    background: transparent !important;
  }
}

.customCell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>