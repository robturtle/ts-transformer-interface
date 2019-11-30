import { schema } from '../index';

interface Location {
  lat: number;
  lng: number;
}

interface Box<T> {
  // generic type 1
  data: T;
}

interface BigBox<T> {
  // generic type with parameterized type
  box: Box<T>;
}

namespace google {
  export namespace maps {
    export interface Marker {
      value: string;
    }
  }
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
  box: Box<Box<User[]>>; // parameterized type
  marker: google.maps.Marker; // scoped type
}

// const boxSchema = schema<Box<any>>();
// console.log(JSON.stringify(boxSchema, null, 2));
// console.log('-'.repeat(80));

// const bigboxSchema = schema<BigBox<any>>();
// console.log(JSON.stringify(bigboxSchema, null, 2));
// console.log('-'.repeat(80));

const markerSchema = schema<google.maps.Marker>();
console.log(JSON.stringify(markerSchema, null, 2));

// const userSchema = schema<User>();
// console.log(JSON.stringify(userSchema, null, 2));
// console.log('-'.repeat(80));
