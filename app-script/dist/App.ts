const app: Record<ReqParams['fn'], (req: ReqParams, spread: GoogleAppsScript.Spreadsheet.Spreadsheet) => void> = {
    read(req, spread) {
        const { datas } = modal(req, spread)
        return datas
    },

    readById(req, spread) {
        if (!req.id) throw new Error("Id kosong !");
        const { datas, indexs } = modal(req, spread)
        return datas[indexs[0]]
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

