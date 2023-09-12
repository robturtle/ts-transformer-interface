## 2.0.0

- supports typescript 5

## 1.5.0

- supports type literal
  ```TypeScript
  interface Order {
    position: {
      lat: number;
      lng: number;
    } // now supported
  }
  ```

## 1.4.0

- handles any keyword
- handles unknown keyword

## 1.3.0

- show full scoped type name
  - before: 'Marker', now: 'google.maps.Marker'
  - before: 'Box', now: 'Box<any>'

## 1.2.0

- supports generic type with single type parameter

## 1.1.0

- supports parameterized type with single type argument

## 1.0.0

- output interface change:
  - type reference from `'User'` to `{ referenceName: 'User' }`
- (for other transformers) export buildInterface(ts.Type, ts.typeChecker)

## 0.1.0

- type supports
  - primitive types
  - array
  - type reference
  - NOT supporting union types as intended for now
