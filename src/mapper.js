'use strict'

const Mapper = ( sourceAdapter, targetAdapter ) => {
  const map = ( source, targetMapper = ( source, target ) => target ) => {
    const value = sourceAdapter.getValue( source )
    const target = targetAdapter.createNode( value )

    sourceAdapter.getChildren( source ).forEach( current =>
      targetAdapter.appendChild( target, map( current ) )
    )

    return targetMapper( source, target )
  }

  return map
}

module.exports = Mapper
