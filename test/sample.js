'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var index_1 = require('../index');
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
console.log(JSON.stringify(boxSchema, null, 2));
console.log('-'.repeat(80));
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
console.log(JSON.stringify(bigboxSchema, null, 2));
console.log('-'.repeat(80));
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
    {
      name: 'box',
      optional: false,
      type: {
        selfType: 'BigBox',
        typeArgumentType: {
          selfType: 'Box',
          typeArgumentType: { arrayElementType: { referenceName: 'User' } },
        },
      },
    },
  ],
};
console.log(JSON.stringify(userSchema, null, 2));
console.log('-'.repeat(80));
