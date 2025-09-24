
export interface Order {
    order_id: string;
    activity_id: string;
    activity_name: string;
    money: number;
    order_user: string;
    order_source: string;
    order_time: string;
    order_time2: string;
    order_status: string;
    order_mobile: string;
    refund_order_id: string;
    refund_reason: string;
    refund_money: number;
    refund_type: string;
    refund_examine: string;
    status: number;
    _origin: Order;
}

export interface Column {
    prop: string;
    label: string;
    type?: string;
    _list?: boolean;
    _export?: boolean;
    _view?: boolean;
    width?: number;
    align?: string;
    span?: number;
    _map?: { [key: string]: string };
}

export interface OrderDetail {
    row: Order;
    list: Column[];
}