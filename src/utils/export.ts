import * as XLSX from 'xlsx';

interface ExportOptions {
    columns: any[];
    data: any[];
    fileName: string;
}

export const exportXlsx = ({ columns, data, fileName }: ExportOptions) => {
    console.log(columns, data, fileName);
    const list = {
        header: columns.map((item) => item.label),
        body: []
    };
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let arr = [];
        for (let j = 0; j < columns.length; j++) {
            let col = columns[j];
            if (col.type === 'index') {
                arr[j] = i + 1;
            } else {
                let curData = (item[col.prop] ?? '') + '';
                if (col._map) {
                    let realData = col._map[curData];
                    arr[j] = realData || curData;
                } else {
                    arr[j] = curData;
                }
            }
        }
        list.body.push(arr);
    }
    let workSheetdata = [list.header, ...list.body];
    let WorkSheet = XLSX.utils.aoa_to_sheet(workSheetdata);
    let new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, WorkSheet, '第一页');
    XLSX.writeFile(new_workbook, `${fileName}.xlsx`);
}
