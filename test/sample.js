'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var index_1 = require('../index');
var userSchema = {
  name: 'User',
  props: [
    { name: 'name', optional: false, type: 'string' },
    { name: 'title', optional: true, type: 'string' },
    { name: 'houses', optional: false, type: { arrayElementType: 'string' } },
    { name: 'location', optional: false, type: 'Location' },
    { name: 'spouse', optional: true, type: 'User' },
    { name: 'children', optional: false, type: { arrayElementType: 'User' } },
    { name: 'previousLocations', optional: true, type: { arrayElementType: 'Location' } },
    { name: 'referrer', optional: false, type: null },
  ],
};
