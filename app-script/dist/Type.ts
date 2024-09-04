type Parameter = { parameter: { q?: string } };

type FN = "read" | "readById" | "create" | "update" | "delete";
type SN = "anggota" | 'simpanan_pokok';

type ReqParams = {
    sn: SN;
    fn: FN;
    id?: string[];
    data?: Record<string, any>[];
    _with?: string[]
    _includes?: string[];
    _where?: [string, any];
    _sort?: [string, "asc" | "desc"]
    _select?: string[]
    _unselect?: string[]
    _order?: [number, number]
};
