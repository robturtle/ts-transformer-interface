export namespace runtime {
  export type Type = null | string | ArrayType;

  export interface Property {
    name: string;
    optional: boolean;
    type: Type;
  }

  export interface ArrayType {
    arrayElementType: Type;
  }

  export interface Schema {
    name: string;
    props: Property[];
  }
}

export function schema<T extends object>(): runtime.Schema;
