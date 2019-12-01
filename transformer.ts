import * as ts from 'typescript';
import * as path from 'path';
import { buildInterface } from './runtime-schema';
import { inspectNode } from './test/inspect/inspect';

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

const badInterface = ts.createRegularExpressionLiteral(
  JSON.stringify({
    name: 'never',
    props: [],
  }),
);

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
  const typeChecker = program.getTypeChecker();
  if (!isRuntimeTypeCallExpression(node, typeChecker)) {
    return node;
  }
  if (!node.typeArguments || node.typeArguments.length === 0) {
    return badInterface;
  } else {
    // inspectNode(node);
    const typeNode = node.typeArguments[0];
    const type = typeChecker.getTypeFromTypeNode(typeNode);
    return ts.createRegularExpressionLiteral(
      JSON.stringify(buildInterface(typeNode.getText(), type, typeChecker)),
    );
  }
}

const indexDTs = path.join(__dirname, 'index.d.ts');
const indexTs = path.join(__dirname, 'index.ts');

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
    (path.join(declaration.getSourceFile().fileName) === indexTs ||
      path.join(declaration.getSourceFile().fileName) === indexDTs) &&
    !!declaration.name &&
    declaration.name.getText() === 'schema'
  );
}
