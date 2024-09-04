type Parameter = { parameter: { q?: string } };

type FN = "read" | "readById" | "create" | "update" | "delete";
type SN = "anggota";

type ReqParams = {
    sn: SN;
    fn: FN;
    id?: string[];
    data?: Record<string, any>[];
    _where?: [string, any];
    _includes?: string[];
};
