'use strict'

const filter = require( './filter' )
const find = require( './find' )
const walk = require( './walk' )
const parent = require( './parent' )

const mixins = adapter => {
  adapter.filter = ( node, predicate ) => filter( adapter, node, predicate )
  adapter.find = ( node, predicate ) => find( adapter, node, predicate )
  adapter.walk = ( node, callback ) => walk( adapter, node, callback )
  adapter.parent = parent
}

module.exports = mixins
