'use strict'

const filter = ( adapter, node, predicate ) => {
  const result = []

  adapter.walk( node, current => {
    if( predicate( current ) )
      result.push( current )
  })

  return result
}

module.exports = filter
