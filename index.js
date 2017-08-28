'use strict'

const ArrayAdapter = require( './src/adapters/array' )
const ObjectAdapter = require( './src/adapters/object' )
const DomAdapter = require( './src/adapters/dom' )
const Mapper = require( './src/mapper' )
const mixins = require( './src/mixins' )

const treeUtils = {
  ArrayAdapter,
  ObjectAdapter,
  DomAdapter,
  Mapper,
  mixins
}

module.exports = treeUtils
