import { schema } from '../index';

interface Location {
  lat: number;
  lng: number;
}

interface Box<T> {
  data: T;
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
console.log(JSON.stringify(userSchema, null, 2));
