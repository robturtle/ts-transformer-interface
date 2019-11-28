import * as ts from 'typescript';
import { runtime } from './index.d';

export function buildInterface(type: ts.Type, typeChecker: ts.TypeChecker): runtime.Schema {
  const symbols = typeChecker.getPropertiesOfType(type);
  return {
    name: type.symbol.getName(),
    props: symbols.map(s => buildInterfaceProperty(s, typeChecker)),
  };
}

function buildInterfaceProperty(symbol: ts.Symbol, typeChecker: ts.TypeChecker): runtime.Property {
  return {
    name: symbol.getName(),
    optional: propertyOptional(symbol),
    type: propertyType(symbol, typeChecker),
  };
}

function propertyOptional(symbol: ts.Symbol): boolean {
  return !symbol.declarations.some(d => (d as ts.PropertySignature).questionToken === undefined);
}

function propertyType(symbol: ts.Symbol, typeChecker: ts.TypeChecker): runtime.Type {
  const declarations = symbol.declarations;
  if (declarations.length === 0) {
    return null;
  }
  const declaration = declarations[0];
  const typeParameters = (declaration as any)?.parent?.typeParameters;
  const propertySignature = (declaration as any).type;
  if (typeParameters && typeParameters.length > 0) {
    const typeParam = typeParameters[0];
    return {
      genericParameterName: typeParam.getText(),
      genericParameterType: getTypeFromSignature(propertySignature, typeChecker),
    };
  } else {
    return getTypeFromSignature(propertySignature, typeChecker);
  }
}

function getTypeFromSignature(
  propertySignature: ts.PropertySignature,
  typeChecker: ts.TypeChecker,
): runtime.Type {
  const kind = propertySignature.kind as ts.SyntaxKind;
  switch (kind) {
    case ts.SyntaxKind.StringKeyword:
      return 'string';
    case ts.SyntaxKind.NumberKeyword:
      return 'number';
    case ts.SyntaxKind.BooleanKeyword:
      return 'boolean';
    case ts.SyntaxKind.FunctionKeyword:
      return 'function';
    case ts.SyntaxKind.ObjectKeyword:
      return 'object';
    case ts.SyntaxKind.NullKeyword:
      return 'null';
    case ts.SyntaxKind.TypeReference:
      const typeArgs: ts.Node[] = (propertySignature as any).typeArguments;
      if (typeArgs && typeArgs.length > 0) {
        const typeName = (propertySignature as any).typeName;
        const typeArg = typeArgs[0] as ts.PropertySignature;
        return {
          selfType: typeName.escapedText,
          typeArgumentType: getTypeFromSignature(typeArg, typeChecker),
        };
      } else {
        return {
          referenceName: propertySignature.getText(),
        };
      }
    case ts.SyntaxKind.ArrayType:
      return {
        arrayElementType: getTypeFromSignature(
          (<ts.ArrayTypeNode>(propertySignature as any)).elementType as any,
          typeChecker,
        ),
      };
    default:
      return null;
  }
}
