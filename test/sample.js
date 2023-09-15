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
    { name: 'marker', optional: false, type: { referenceName: 'google.maps.Marker' } },
  ],
};
console.log(JSON.stringify(userSchema, null, 2));
console.log('-'.repeat(80));
var specialSchema = {
  name: 'Special',
  props: [
    { name: 'null', optional: false, type: null },
    { name: 'any', optional: false, type: 'any' },
    { name: 'unknown', optional: false, type: 'unknown' },
  ],
};
console.log(JSON.stringify(specialSchema, null, 2));
console.log('-'.repeat(80));
var withTypeLiteralSchema = {
  name: 'WithTypeLiteral',
  props: [
    { name: 'value', optional: false, type: 'number' },
    {
      name: 'position',
      optional: false,
      type: {
        props: [
          { name: 'lat', optional: false, type: 'number' },
          { name: 'lng', optional: false, type: 'number' },
        ],
      },
    },
  ],
};
console.log(JSON.stringify(withTypeLiteralSchema, null, 2));
console.log('-'.repeat(80));
