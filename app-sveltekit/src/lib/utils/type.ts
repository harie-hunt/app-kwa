export type SchemaTable = {
    label: string;
    name: string
    func?: (arg: any) => void;
    right?: boolean;
    center?: boolean;
};