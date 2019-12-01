import * as ts from 'typescript';
import { inspectNode } from './inspect';
import * as fs from 'fs';

const source = `
  interface Compound {
    position: {
      lat: number;
      lng: number;
    };
    driver: User;
    orders: Paginated<Order>;
    marker: google.maps.Marker;
  }
`;

const sourceFile = ts.createSourceFile('sample.ts', source, ts.ScriptTarget.ES5, true);
inspectNode(sourceFile);
