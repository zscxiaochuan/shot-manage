<template>
    <div>
        <TableSearch
            :btn-permission="['export']"
            :query="query"
            :options="searchOpt"
            :search="handleSearch"
            :export="exportFunc"
        />
        <div class="container">
            <TableCustom
                :current-page="page.index"
                :page-size="page.size"
                :columns="listColumns"
                :tableData="tableData"
                :total="page.total"
                :viewFunc="handleView"
                :delFunc="handleDelete"
                :changePage="changePage"
                :editFunc="handleEdit"
            >
                <template #operator="{ rows }">
                    <el-button type="warning" size="small" :icon="View" @click="handleView(rows)"> 详情 </el-button>
                </template>
                <template #status="{ rows, column }">
                    <div>{{ column._map?.[rows.status % 5] ?? '' }}</div>
                </template>
            </TableCustom>
        </div>
        <el-dialog
            :title="isEdit ? '编辑' : '新增'"
            v-model="visible"
            width="700px"
            destroy-on-close
            :close-on-click-modal="false"
            @close="closeDialog"
        >
            <TableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
        </el-dialog>
        <el-dialog class="order-detail" title="订单详情" v-model="visible1" width="800px" destroy-on-close>
            <TableDetail :data="viewData">
                <template #refund_examine>
                    <el-radio-group class="refund-radio-group" v-model="refundOpt.isAgreeRefund">
                        <el-radio :value="1">同意</el-radio>
                        <div class="refund-radio-no">
                            <el-radio :value="2">拒绝</el-radio>
                            <el-input class="refund-input" v-if="refundOpt.isAgreeRefund === 2" v-model="refundOpt.refundReason" maxlength="100" placeholder="请输入拒绝理由" />
                        </div>
                    </el-radio-group>
                </template>
                <template #footer="{ row }">
                    <div v-if="row._origin && row._origin.status === 2" class="detail-btn">
                        <el-button type="primary">确定</el-button>
                    </div>
                </template>
            </TableDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="order-manager">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Order, Column } from '@/types/order';
import { fetchOrderData } from '@/api';
import TableCustom from '@/components/table-custom.vue';
import TableDetail from '@/components/table-detail.vue';
import TableSearch from '@/components/table-search.vue';
import { FormOption, FormOptionList } from '@/types/form-option';
import { exportXlsx } from '@/utils/export';
import { View } from '@element-plus/icons-vue';
import { getOrderDetail } from './detail';

// 查询相关
const query = reactive({
    name: '',
});
const searchOpt = ref<FormOptionList[]>([
    { type: 'input', prop: 'name', placeholder: '请输入玩家名称' },
    { type: 'input', prop: 'mobile', placeholder: '请输入玩家手机号' },
]);
const handleSearch = () => {
    changePage(1);
};
const refundOpt = ref({
    isAgreeRefund: 1,
    refundReason: '',
});
// 表格相关
let columns = ref<Column[]>([
    { type: 'index', _view: false, label: '序号', width: 55, align: 'center', prop: 'index' },
    { prop: 'order_id', label: '订单号' },
    { prop: 'activity_id', label: '活动ID' },
    { prop: 'activity_name', label: '活动名称' },
    { prop: 'money', label: '支付金额' },
    { prop: 'order_user', label: '付款用户' },
    { prop: 'order_user', label: '玩家名称' },
    { prop: 'order_source', label: '支付方式' },
    { prop: 'order_time', label: '下单时间' },
    { prop: 'order_time2', label: '支付时间' },
    { prop: 'refund_order_id', _list: false, label: '退款订单号' },
    { prop: 'refund_reason', _list: false, label: '退款理由' },
    { prop: 'refund_money', _list: false, label: '退款金额' },
    { prop: 'refund_type', _list: false, label: '退款方式' },
    { prop: 'refund_examine', _list: false, label: '退款审批', _export: false },
    { prop: 'status', label: '订单状态', _map: { 0: '已完成', 1: '待支付', 2: '已退款', 3: '申请退款', 4: '已取消' } },
    { prop: 'operator', _export: false, _view: false, label: '操作', width: 100 },
]);
let listColumns = columns.value.filter(item => item._list ?? true);
const page = reactive({
    index: 1,
    size: 10,
    total: 100,
});
const tableData = ref<Order[]>([]);
const getData = async () => {
    const res = await fetchOrderData();
    tableData.value = res.data.list;
    page.total = res.data.pageTotal;
};
getData();

const changePage = (val: number) => {
    page.index = val;
    getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
    labelWidth: '100px',
    span: 12,
    list: [
        { type: 'input', label: '用户名', prop: 'name', required: true },
        { type: 'input', label: '手机号', prop: 'phone', required: true },
        { type: 'input', label: '密码', prop: 'password', required: true },
        { type: 'input', label: '邮箱', prop: 'email', required: true },
        { type: 'input', label: '角色', prop: 'role', required: true },
    ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Order, $index: number) => {
    rowData.value = { ...row, index: $index };
    isEdit.value = true;
    visible.value = true;
};
const updateData = () => {
    closeDialog();
    getData();
};

const closeDialog = () => {
    visible.value = false;
    isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
    row: {},
    list: [],
});
const handleView = (row: Order) => {
    let orderDetail = getOrderDetail(row, columns.value);
    console.log(orderDetail);
    viewData.value.row = orderDetail.row;
    viewData.value.list = orderDetail.list;
    visible1.value = true;
};

// 删除相关
const handleDelete = (row: Order) => {
    ElMessage.success('删除成功');
};
const exportFunc = () => {
    exportXlsx({
        columns: columns.value.filter(item => item._export ?? true),
        fileName: '订单管理',
        data: tableData.value,
    });
};
</script>

<style lang="less">
.order-detail {
    .detail-btn {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
    }
}
.refund-radio-group {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .refund-input {
        width: 300px;
    }
    .refund-radio-no {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>
