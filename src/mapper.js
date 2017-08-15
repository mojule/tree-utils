'use strict'

const Mapper = ( sourceAdapter, targetAdapter ) => {
  const map = source => {
    const value = sourceAdapter.getValue( source )
    const target = targetAdapter.createNode( value )

    sourceAdapter.getChildren( source ).forEach( current =>
      targetAdapter.appendChild( target, map( current ) )
    )

    return target
  }

  return map
}

module.exports = Mapper
