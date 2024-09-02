export type SchemaTable<T extends Record<string, any>> = {
    label: string;
    name: keyof T;
    func?: (arg: any) => void;
    right?: boolean;
    center?: boolean;
};