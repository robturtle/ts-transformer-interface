'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var index_1 = require('../index');
var boxSchema = {
  name: 'Box<any>',
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
var markerSchema = {
  name: 'google.maps.Marker',
  props: [{ name: 'value', optional: false, type: 'string' }],
};
console.log(JSON.stringify(markerSchema, null, 2));
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
        selfType: 'Box',
        typeArgumentType: {
          selfType: 'Box',
          typeArgumentType: { arrayElementType: { referenceName: 'User' } },
        },
      },
    },
    { name: 'marker', optional: false, type: { referenceName: 'google.maps.Marker' } },
  ],
};
console.log(JSON.stringify(userSchema, null, 2));
console.log('-'.repeat(80));
