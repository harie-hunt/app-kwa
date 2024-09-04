function doGet(e: Parameter) {
    const DEV = true;
    try {
        const req = _getReq(e, DEV);
        const spread = _getSpread();
        const result = app[req.fn](req, spread)
        return _responseJson(result)
    } catch (e: unknown) {
        console.log(e);

        if (e instanceof Error)
            return _responseJson({ error: "Error : " + e.message });
        if (e instanceof TypeError)
            return _responseJson({ error: "TypeError : " + e.message });
        return _responseJson({ error: "Custom Error : Ada kesalahan !", e });
    }
}

function _getReq(e: Parameter, dev: boolean): ReqParams {
    if (dev) {
        return {
            sn: "anggota",
            fn: "create",
            data: [
                {
                    nama: 'naning',
                    tanggal_masuk: '05/09/2024'
                },
                {
                    nama: 'putra',
                    tanggal_masuk: '2023-08-25'
                }
            ],
            // id: ['a1']
        };
    } else {
        const q = e.parameter.q;
        if (!q) throw new Error("Parameter query kosong !");
        return JSON.parse(q);
    }
}

function _responseJson(result: unknown) {
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(
        ContentService.MimeType.JSON
    );
}

function _getSpread() {
    const sid = PropertiesService.getScriptProperties().getProperty("spread-id");
    if (!sid) throw new Error("Spread Id kosong !");
    return SpreadsheetApp.openById(sid);
}