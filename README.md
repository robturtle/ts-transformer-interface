# ts-transformer-interface

A TypeScript custom transformer generating runtime interface info. This is mainly for the runtime JSON schema validation.
So only a subset of TypeScript types are handled. They're

1. primitive types (string, number, boolean, etc)
2. type reference (other interface/class)
3. array of (primitive type | type reference)

## Example

Input

```typescript
import { schema } from 'ts-transformer-interface';

interface Location {
  lat: number;
  lng: number;
}

interface User {
  name: string; // required primitive
  title?: string; // optional primitive
  houses: string[]; // required array
  location: Location; // type reference
  spouse?: User; // optional type reference
  children: User[]; // type reference array
  previousLocations?: Location[]; // optional type reference array
  referrer: User | string; // union type not supported, will become null
  box: Box<User>; // generic type
}

const userSchema = schema<User>();
```

Output

```javascript
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var index_1 = require('../index');
var userSchema = {
  name: 'User',
  props: [
    { name: 'name', optional: false, type: 'string' },
    { name: 'title', optional: true, type: 'string' },
    { name: 'houses', optional: false, type: { arrayElementType: 'string' } },
    { name: 'location', optional: false, type: { referenceName: 'Location' } },
    { name: 'spouse', optional: true, type: { referenceName: 'User' } },
    { name: 'children', optional: false, type: { arrayElementType: { referenceName: 'User' } } },
    {
      name: 'previousLocations',
      optional: true,
      type: { arrayElementType: { referenceName: 'Location' } },
    },
    { name: 'referrer', optional: false, type: null },
    { name: 'box', optional: false, type: { selfType: 'Box', typeArgumentType: 'User' } },
  ],
};
```

## Installation

### ttypescript

I personally use [ts-patch](https://www.npmjs.com/package/ts-patch) to install all the transformers.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "plugins": [{ "transform": "ts-transformer-interface/transformer" }]
  }
  // ...
}
```
