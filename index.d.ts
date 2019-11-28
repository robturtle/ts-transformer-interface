export namespace runtime {
  export type Type = null | string | ArrayType | ReferenceType | GenericType;

  export interface Property {
    name: string;
    optional: boolean;
    type: Type;
  }

  export interface ArrayType {
    arrayElementType: Type;
  }

  export interface ReferenceType {
    referenceName: string;
  }

  export interface GenericType {
    selfType: string;
    typeArgumentType: string;
  }

  export interface Schema {
    name: string;
    props: Property[];
  }
}

export function schema<T extends object>(): runtime.Schema;
