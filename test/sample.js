'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var index_1 = require('../index');
// const boxSchema = schema<Box<any>>();
// console.log(JSON.stringify(boxSchema, null, 2));
// console.log('-'.repeat(80));
// const bigboxSchema = schema<BigBox<any>>();
// console.log(JSON.stringify(bigboxSchema, null, 2));
// console.log('-'.repeat(80));
var markerSchema = {
  name: 'google.maps.Marker',
  props: [{ name: 'value', optional: false, type: 'string' }],
};
console.log(JSON.stringify(markerSchema, null, 2));
// const userSchema = schema<User>();
// console.log(JSON.stringify(userSchema, null, 2));
// console.log('-'.repeat(80));
