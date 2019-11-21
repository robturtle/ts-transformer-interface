import { schema } from '../index';

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
}

const userSchema = schema<User>();