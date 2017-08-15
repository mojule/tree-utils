'use strict'

const ArrayAdapter = require( './src/adapters/array' )
const ObjectAdapter = require( './src/adapters/object' )
const DomAdapter = require( './src/adapters/dom' )
const Mapper = require( './src/mapper' )

const treeUtils = {
  ArrayAdapter,
  ObjectAdapter,
  DomAdapter,
  Mapper
}

module.exports = treeUtils
