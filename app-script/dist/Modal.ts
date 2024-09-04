function modal({ sn, id, data, fn }: ReqParams, spread: GoogleAppsScript.Spreadsheet.Spreadsheet) {
    const sheet = spread.getSheetByName(sn)
    if (!sheet) throw new Error("Sheet tidak ditemukan !");

    const rows = sheet.getDataRange().getValues()
    const props = rows.shift()
    if (!props) throw new Error("Property kosong !");

    const datas = _getArrayData(props, rows)

    let indexs: number[] = []
    if (id) {
        indexs = id.map(id => {
            const index = datas.findIndex(d => d.id === id)
            if (index < 0) throw new Error("Id tidak ditemukan");
            return index
        })
    }

    let rowData: any[][] | undefined = undefined
    let oldDatas: typeof data
    if (data) {
        if (fn === 'update' && id) {
            oldDatas = indexs.map(i => datas[i])
        }
        data = data.map((d, i) => {
            if (fn === 'create') {
                d.id = Utilities.getUuid()
                d.created_at = new Date()
                if (sn === 'anggota') d.no = _getNoAnggota(rows.length + i, d.tanggal_masuk)
            }
            if (fn === 'update') {
                d.updated_at = new Date()
                if (oldDatas)
                    d = { ...oldDatas[i], ...d }

            }
            return d
        })
        rowData = data.map(d => {
            return props.map(p => {
                let value: any = d[p]
                // if (isValidBoolean(value)) return value
                // if (!isNaN(value)) return Number(value)
                // if (isValidDate(value)) return new Date(value)
                return value
            })
        })
    }

    return {
        rows, props, datas, indexs, rowData, sheet, newData: data
    }
}

function _getArrayData(props: string[], rows: any[][]) {
    const stringNumber = ['hp', 'nik', 'kk']
    let datas: Record<string, any>[] = []
    for (let i = 0; i < rows.length; i++) {
        if (!props) throw new Error("Properti belum ditentukan !");
        let temp: Record<string, any> = {}
        for (let j = 0; j < props.length; j++) {
            const prop = props[j];
            let row = rows[i][j];
            temp[prop] = row === "" ? undefined : stringNumber.includes(prop) ? "'" + row : row
        }
        datas.push(temp)
    }
    return datas
}


function isValidBoolean(bool: any) {
    return typeof bool === 'boolean' ||
        (typeof bool === 'object' &&
            bool !== null &&
            typeof bool.valueOf() === 'boolean');
}

function isValidDate(stringDate: any) {
    return !isNaN(Date.parse(stringDate));
}

function _getNoAnggota(count: number, tanggal_masuk: string | undefined) {
    if (!tanggal_masuk) throw new Error("Tanggal masuk kosong !");
    const d = new Date(tanggal_masuk)
    const th = d.getFullYear().toString().slice(2, 4)
    const bl = d.getMonth() + 1
    const bl1 = bl.toString().length === 2 ? bl.toString() : "0" + bl
    return "A" + (Number(th + bl1) * 1000 + count + 1)
}