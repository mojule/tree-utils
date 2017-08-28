'use strict'

const walk = ( adapter, node, callback ) => {
  if( callback( node ) ) return true

  return adapter.getChildren( node ).some( child =>
    walk( adapter, child, callback )
  )
}

module.exports = walk
