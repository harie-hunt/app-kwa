function doGet(e: Parameter) {
    const DEV = true;
    try {
        const req = _getReq(e, DEV);
        const spread = _getSpread();
        const result = app[req.fn](req, spread);
        return _responseJson(result);
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
            fn: "readById",
            _includes: ['simpanan_pokok'],
            // _with: ['anggota']
            // _sort: ["created_at", "desc"],
            // _select: ["nama", "no"],
            // _order: [0, 4]
            // _unselect: ['tanggal_masuk']
            // data: [
            //     {
            //         tanggal: '05/25/2024',
            //         anggota_id: '7ec37334-ec81-4fbf-a365-78a3173726fb',
            //         nilai: 100000,
            //         tahun: 2024,
            //     },
            //     {
            //         tanggal: '05/12/2024',
            //         anggota_id: 'dd7a044c-935f-419d-8438-c95f385e671b',
            //         nilai: 200000,
            //         tahun: 2024,
            //     }
            // ],
            id: ['7ec37334-ec81-4fbf-a365-78a3173726fb']
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

function _pickObj(obj: Record<string, any>, arr: string[]) {
    return Object.fromEntries(
        Object.entries(obj).filter(([k]) => arr.includes(k))
    );
}

function _omitObj(obj: Record<string, any>, arr: string[]) {
    return Object.fromEntries(
        Object.entries(obj).filter(([k]) => !arr.includes(k))
    );
}

function _handleSort(
    a: Record<string, any>,
    b: Record<string, any>,
    key: string,
    value: "asc" | "desc"
) {

    const ak = a[key]
    const bk = b[key]

    if (!isNaN(ak)) {
        return value === "asc" ? ak - bk : bk - ak
    } else if (typeof ak === 'object') {
        const da = new Date(ak)
        const db = new Date(bk)
        let res = da > db ? 1 : da < db ? -1 : 0
        if (value === 'desc') res *= -1
        return res
    }

    return value === "asc"
        ? String(a[key]).localeCompare(b[key])
        : String(b[key]).localeCompare(a[key]);
}
