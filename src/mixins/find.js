'use strict'

const find = ( adapter, node, predicate ) => {
  let target

  adapter.walk( node, current => {
    if( predicate( current ) ){
      target = current
      return true
    }
  })

  return target
}

module.exports = find
