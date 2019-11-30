import * as ts from 'typescript';

export function inspectNode(node: ts.Node, showText: boolean = true, depth = 0) {
  const parts = [new Array(depth + 1).join('--'), ts.SyntaxKind[node.kind], node.pos, node.end];
  if (showText) {
    parts.push(node.getText());
  }
  console.log(parts.join(' '));
  depth++;
  node.getChildren().forEach(c => inspectNode(c, showText, depth));
}
