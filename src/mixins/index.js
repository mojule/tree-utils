'use strict'

const filter = require( './filter' )
const find = require( './find' )
const walk = require( './walk' )

const mixins = adapter => {
  adapter.filter = ( ...args ) => filter( adapter, ...args )
  adapter.find = ( ...args ) => find( adapter, ...args )
  adapter.walk = ( ...args ) => walk( adapter, ...args )
}

module.exports = mixins
