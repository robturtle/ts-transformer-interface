import * as ts from 'typescript';
import { runtime } from './index.d';
export declare function buildInterface(
  name: string,
  type: ts.Type,
  typeChecker: ts.TypeChecker,
): runtime.Schema;
