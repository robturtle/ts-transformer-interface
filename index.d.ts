export namespace runtime {
  /** @since 1.5.0 */
  export type Type =
    | null
    | string
    | ArrayType
    | ReferenceType
    | ParameterizedType
    | GenericType
    | LiteralType;

  /** @since 1.0.0 */
  export interface Property {
    name: string;
    optional: boolean;
    type: Type;
  }

  /** @since 1.0.0 */
  export interface ArrayType {
    arrayElementType: Type;
  }

  /** @since 1.0.0 */
  export interface ReferenceType {
    referenceName: string;
  }

  /** @since 1.2.0 */
  export interface ParameterizedType {
    selfType: string;
    typeArgumentType: Type;
  }

  /** @since 1.2.0 */
  export interface GenericType {
    genericParameterName: string;
    genericParameterType: Type;
  }

  /** @since 1.5.0 */
  export interface LiteralType {
    props: Property[];
  }

  /** @since 1.0.0 */
  export interface Schema {
    name: string;
    props: Property[];
  }
}

/** @since 1.0.0 */
export function schema<T extends object>(): runtime.Schema;
