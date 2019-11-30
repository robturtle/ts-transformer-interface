import * as ts from 'typescript';

export function inspect(node: ts.Node, depth = 0) {
  console.log(
    new Array(depth + 1).join('--'),
    ts.SyntaxKind[node.kind],
    node.pos,
    node.end,
    node.getText(),
  );
  depth++;
  node.getChildren().forEach(c => inspect(c, depth));
}
