import { Order, OrderDetail, Column } from '@/types/order';

const columnMap = {
    2: [
        'status',
        'order_id',
        'activity_id',
        'activity_name',
        'money',
        'order_user',
        'order_source',
        'order_time',
        'order_mobile',
        'refund_order_id',
        'refund_reason',
        'refund_money',
        'refund_type',
    ],
    3: [
        'status',
        'order_id',
        'activity_id',
        'activity_name',
        'money',
        'order_user',
        'order_source',
        'order_time',
        'order_mobile',
        'refund_order_id',
        'refund_reason',
        'refund_money',
        'refund_type',
        'refund_examine',
    ],
    default: [
        'status',
        'order_id',
        'activity_id',
        'activity_name',
        'money',
        'order_user',
        'order_source',
        'order_time',
        'order_mobile',
    ],
};
export const getOrderDetail = (row: Order, columns: Column[]) => {
    let list = columns.filter(item => item._view ?? true);
    let columnMapItem = columnMap[row.status] ?? columnMap['default'];
    let copyRow = { ...row, _origin: { ...row } };
    list = columnMapItem.reduce((acc, item) => {
        let column = list.find(i => i.prop === item);
        if (column) {
            acc.push(column);
            if (column._map) {
                copyRow[column.prop] = column._map?.[row[column.prop]] ?? row[column.prop];
            }
        }
        return acc;
    }, [] as Column[]);
    return {
        row: { ...copyRow },
        list,
    } as OrderDetail;
};
