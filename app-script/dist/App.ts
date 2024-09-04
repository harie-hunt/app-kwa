const app: Record<ReqParams['fn'], (req: ReqParams, spread: GoogleAppsScript.Spreadsheet.Spreadsheet) => void> = {
    read(req, spread) {
        const { datas } = modal(req, spread)
        const expand = new Expand(req, datas, spread)
        expand.where().sort().select().unselect().order().with()
        return expand.data
    },

    readById(req, spread) {
        if (!req.id) throw new Error("Id kosong !");
        const { datas, indexs } = modal(req, spread)


        let data = indexs.map(i => {
            return datas[i]
        })
        if (req._includes) {
            const mod = req._includes.map(inc => {
                const sn = inc as SN

                return modal({ fn: req.fn, sn }, spread).datas
            })

            const inc = req._includes

            data = data.map(d => {
                mod.forEach((mod, i) => {
                    d[inc[i] + 's'] = mod.filter(m => m[req.sn + "_id"] == d.id)
                })
                return d
            })
        }
        return data
    },

    create(req, spread) {
        const { rowData, sheet, newData } = modal(req, spread)
        if (!rowData) throw new Error("Data kosong !");

        for (let i = 0; i < rowData.length; i++) {
            try {
                sheet.appendRow(rowData[i])
            } catch (error) {
                throw new Error(error);
            }
        }
        return newData
    },

    update(req, spread) {
        const { rowData, sheet, newData, indexs } = modal(req, spread)
        if (!rowData) throw new Error("Data kosong !");
        for (let i = 0; i < rowData.length; i++) {
            try {
                sheet.getRange(indexs[i] + 2, 1, 1, sheet.getLastColumn()).setValues([rowData[i]])
            } catch (error) {
                throw new Error(error);
            }

        }
        return newData
    },

    delete(req, spread) {
        const { sheet, indexs } = modal(req, spread)
        indexs.sort()
        let j = 3
        for (let i = 0; i < indexs.length; i++) {
            j -= 1
            try {
                sheet.deleteRow(indexs[i] + j)
            } catch (error) {
                throw new Error(error);
            }
        }
        return true
    }
}

class Expand {
    req: ReqParams;
    data: Record<string, any>[];
    count: number
    limit: number
    page: number
    more: boolean
    spread: GoogleAppsScript.Spreadsheet.Spreadsheet

    constructor(_req: ReqParams, _data: Record<string, any>[], spread: GoogleAppsScript.Spreadsheet.Spreadsheet) {
        this.spread = spread
        this.req = _req
        this.data = _data
        this.count = _data.length
        this.limit = this.count
        this.page = 1
        this.more = false
    }

    where() {
        const { _where } = this.req
        if (!_where) return this
        const [key, value] = _where

        this.data = this.data.filter(d => String(d[key]).toLowerCase() == String(value).toLowerCase())
        return this
    }

    sort() {
        const { _sort } = this.req
        if (!_sort) return this
        const [key, value] = _sort

        this.data.sort((a, b) => _handleSort(a, b, key, value))

        return this
    }

    select() {
        const { _select } = this.req
        if (!_select) return this
        this.data = this.data.map(d => _pickObj(d, _select))

        return this
    }

    unselect() {
        const { _unselect } = this.req
        if (!_unselect) return this
        this.data = this.data.map(d => _omitObj(d, _unselect))

        return this
    }

    order() {
        const { _order } = this.req
        if (!_order) return this
        const [start, end] = _order

        this.data = this.data.filter((_, i) => i >= start && i < end)

        return this
    }

    with() {
        const { _with } = this.req
        if (!_with) return this
        let withs = _with.map(val => {
            const sn = val as SN
            const { datas } = modal({ ...this.req, sn }, this.spread)
            return datas
        })

        this.data = this.data.map(d => {
            const inc = withs.map((w, i) => {
                let res = w.filter(v => v.id == d[_with[i] + "_id"])[0]
                res = _pickObj(res, ['no', 'nama'])
                return res
            })

            inc.forEach((inc, i) => {
                d[_with[i]] = inc
            })
            return d
        })

        return this
    }
}

