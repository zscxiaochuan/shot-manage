<template>
    <div class="table-box">
        <div class="table-content">
            <el-table
                class="mgb20"
                :style="{ width: '100%' }"
                height="100%"
                border
                :data="tableData"
                :row-key="rowKey"
                @selection-change="handleSelectionChange"
                table-layout="auto"
            >
                <template v-for="item in columns" :key="item.prop">
                    <el-table-column
                        v-if="item.visible"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :type="item.type"
                        :align="item.align || 'center'"
                    >
                        <template #default="{ row, column, $index }" v-if="item.type === 'index'">
                            {{ getIndex($index) }}
                        </template>
                        <template #default="{ row, column, $index }" v-if="!item.type">
                            <slot :name="item.prop" :rows="row" :index="$index">
                                <template v-if="item.prop == 'operator'">
                                    <el-button type="warning" size="small" :icon="View" @click="viewFunc(row)">
                                        查看
                                    </el-button>
                                    <el-button type="primary" size="small" :icon="Edit" @click="editFunc(row)">
                                        编辑
                                    </el-button>
                                    <el-button type="danger" size="small" :icon="Delete" @click="handleDelete(row)">
                                        删除
                                    </el-button>
                                </template>
                                <span v-else-if="item.formatter">
                                    {{ item.formatter(row[item.prop]) }}
                                </span>
                                <span v-else>
                                    {{ row[item.prop] }}
                                </span>
                            </slot>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div>
        <div class="table-pagination">
            <el-pagination
                v-if="hasPagination"
                :current-page="currentPage"
                :page-size="pageSize"
                :background="true"
                :layout="layout"
                :total="total"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs, PropType, ref } from 'vue';
import { Delete, Edit, View, Refresh } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';

const props = defineProps({
    // 表格相关
    tableData: {
        type: Array,
        default: [],
    },
    columns: {
        type: Array as PropType<any[]>,
        default: [],
    },
    rowKey: {
        type: String,
        default: 'id',
    },
    hasToolbar: {
        type: Boolean,
        default: true,
    },
    //  分页相关
    hasPagination: {
        type: Boolean,
        default: true,
    },
    total: {
        type: Number,
        default: 0,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
    pageSize: {
        type: Number,
        default: 10,
    },

    layout: {
        type: String,
        default: 'total, prev, pager, next',
    },
    delFunc: {
        type: Function,
        default: () => {},
    },
    viewFunc: {
        type: Function,
        default: () => {},
    },
    editFunc: {
        type: Function,
        default: () => {},
    },
    delSelection: {
        type: Function,
        default: () => {},
    },
    refresh: {
        type: Function,
        default: () => {},
    },
    changePage: {
        type: Function,
        default: () => {},
    },
});

let { tableData, columns, rowKey, hasToolbar, hasPagination, total, currentPage, pageSize, layout } = toRefs(props);

columns.value.forEach(item => {
    if (item.visible === undefined) {
        item.visible = true;
    }
});

// 当选择项发生变化时会触发该事件
const multipleSelection = ref([]);
const handleSelectionChange = (selection: any[]) => {
    multipleSelection.value = selection;
};

// 当前页码变化的事件
const handleCurrentChange = (val: number) => {
    props.changePage(val);
};

const handleDelete = row => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        type: 'warning',
    })
        .then(async () => {
            props.delFunc(row);
        })
        .catch(() => {});
};

const getIndex = (index: number) => {
    return index + 1 + (currentPage.value - 1) * pageSize.value;
};
</script>

<style lang="less">
.table-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .table-content {
        flex: 1;
        overflow: hidden;
    }
    .table-pagination {
        padding: 10px 0;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // --el-text-color-regular: #fff;
        // --el-pagination-bg-color: #fff;
        // --el-disabled-bg-color: transparent;
        // --el-text-color-placeholder: #fff;
    }
    .el-table {
        --el-table-bg-color: transparent;
        --el-table-tr-bg-color: transparent;
        --el-table-border-color: transparent;
        --el-table-row-hover-bg-color: transparent;
        --el-table-header-text-color: #fff;
        --el-table-body-text-color: #fff;
        --el-table-text-color: #fff;
        thead {
            --el-table-tr-bg-color: #010504;
        }
        th {
            background-color: transparent !important;
        }
    }
}
.table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
}

.columns-setting-icon {
    display: block;
    font-size: 18px;
    cursor: pointer;
    color: #676767;
}
</style>
<style>
.table-header .cell {
    color: #333;
}
</style>
