export namespace runtime {
  export type Type = null | string | ArrayType | ReferenceType | ParameterizedType | GenericType;

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

  export interface ParameterizedType {
    selfType: string;
    typeArgumentType: Type;
  }

  export interface GenericType {
    genericParameterName: string;
    genericParameterType: Type;
  }

  export interface Schema {
    name: string;
    props: Property[];
  }
}

export function schema<T extends object>(): runtime.Schema;
