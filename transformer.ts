import * as ts from 'typescript';
import * as path from 'path';
import { runtime } from './index.d';

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => (file: ts.SourceFile) =>
    visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(
  node: ts.SourceFile,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.SourceFile;

function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.Node;

function visitNodeAndChildren(
  node: ts.Node,
  program: ts.Program,
  context: ts.TransformationContext,
): ts.Node {
  return ts.visitEachChild(
    visitNode(node, program),
    child => visitNodeAndChildren(child, program, context),
    context,
  );
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
  const typeChecker = program.getTypeChecker();
  if (!isRuntimeTypeCallExpression(node, typeChecker)) {
    return node;
  }
  if (!node.typeArguments) {
    return ts.createArrayLiteral([]);
  }
  return ts.createRegularExpressionLiteral(JSON.stringify(buildInterface(node, typeChecker)));
}

const indexTs = path.join(__dirname, 'index.d.ts');

function isRuntimeTypeCallExpression(
  node: ts.Node,
  typeChecker: ts.TypeChecker,
): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) {
    return false;
  }
  const signature = typeChecker.getResolvedSignature(node);
  if (signature === undefined) {
    return false;
  }
  const { declaration } = signature;
  return (
    !!declaration &&
    !ts.isJSDocSignature(declaration) &&
    path.join(declaration.getSourceFile().fileName) === indexTs &&
    !!declaration.name &&
    declaration.name.getText() === 'schema'
  );
}

function buildInterface(node: ts.CallExpression, typeChecker: ts.TypeChecker): runtime.Schema {
  if (node.typeArguments === undefined) {
    throw 'type argument is undefined';
  }
  const type: ts.Type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
  const symbols = typeChecker.getPropertiesOfType(type);
  return {
    name: type.symbol.getName(),
    props: symbols.map(s => buildInterfaceProperty(s, typeChecker)),
  };
}

function buildInterfaceProperty(symbol: ts.Symbol, typeChecker: ts.TypeChecker): runtime.Property {
  return {
    name: symbol.getName(),
    optional: propertyOptional(symbol, typeChecker),
    type: propertyType(symbol, typeChecker),
  };
}

function propertyOptional(symbol: ts.Symbol, typeChecker: ts.TypeChecker): boolean {
  return !symbol.declarations.some(d => (d as ts.PropertySignature).questionToken === undefined);
}

function propertyType(symbol: ts.Symbol, typeChecker: ts.TypeChecker): runtime.Type {
  const declarations = symbol.declarations;
  if (declarations.length === 0) {
    return null;
  }
  const propertySignature = (declarations[0] as any).type;
  return getTypeFromSignature(propertySignature, typeChecker);
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
      return propertySignature.getText();
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
