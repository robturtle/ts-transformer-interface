# ts-transformer-interface

A TypeScript custom transformer generating runtime interface info. This is mainly for the runtime JSON schema validation.
So only a subset of TypeScript types are handled. They're

1. primitive types (string, number, boolean, etc)
1. special types (null, any, unknown)
1. type reference (other interface/class)
1. array type
1. parameterized type (Box<Box<User[]>>)

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
  referrer: User | string; // union type
  box: Box<Box<User[]>>; // parameterized type
  marker: google.maps.Marker; // scoped type
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
    { name: 'referrer', optional: false, type: { union: [{ referenceName: 'User' }, 'string'] } },
    {
      name: 'box',
      optional: false,
      type: {
        selfType: 'Box',
        typeArgumentType: {
          selfType: 'Box',
          typeArgumentType: { arrayElementType: { referenceName: 'User' } },
        },
      },
    },
    { name: 'marker', optional: false, type: { referenceName: 'google.maps.Marker' }
  ],
};
```

## Generic types (WIP)

### Type definition

```typescript
interface Box<T> {
  // generic type 1
  data: T;
}

interface BigBox<T> {
  // generic type with parameterized type
  box: Box<T>;
}

// NOTE: since we need a concrete type here so we need to parameterize with `any` as placeholder
const boxSchema = schema<Box<any>>();
const bigboxSchema = schema<BigBox<any>>();
```

output

```javascript
var boxSchema = {
  name: 'Box',
  props: [
    {
      name: 'data',
      optional: false,
      type: { genericParameterName: 'T', genericParameterType: { referenceName: 'T' } },
    },
  ],
};

var bigboxSchema = {
  name: 'BigBox',
  props: [
    {
      name: 'box',
      optional: false,
      type: {
        genericParameterName: 'T',
        genericParameterType: { selfType: 'Box', typeArgumentType: { referenceName: 'T' } },
      },
    },
  ],
};
```

### Concrete generic types

```TypeScript
interface User {
  // ...
  box: Box<Box<User[]>>; // parameterized type
}
```

output

```javascript
{
  name: "User",
  props: [
    // ...
    {
      name: 'box',
      optional: false,
      type: {
        selfType: 'Box',
        typeArgumentType: {
          selfType: 'Box',
          typeArgumentType: { arrayElementType: { referenceName: 'User' } },
        },
      },
    }
  ]
}
```

Reads as: `box` if of type `a Box of a Box of an Array of User`.

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
