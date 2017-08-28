'use strict'

const parentSymbol = require( '../parent-symbol' )

const ArrayAdapter = () => {
  const adapter = {
    getValue: node => node[ 0 ],
    getChildren: node => node.slice( 1 ),
    createNode: value => [ value ],
    appendChild: ( node, child ) => {
      if( child[ parentSymbol ] )
        adapter.removeChild( child[ parentSymbol ], child )

      node.push( child )

      child[ parentSymbol ] = node

      return child
    },
    removeChild: ( node, child ) => {
      const index = node.indexOf( child )

      if( index === -1 )
        throw Error( 'child not found in node' )

      child[ parentSymbol ] = null

      node.splice( index, 1 )
    },
    insertBefore: ( node, child, reference ) => {
      const index = node.indexOf( reference )

      if( index === -1 )
        throw Error( 'reference not found in node' )

      if( child[ parentSymbol ] )
        adapter.removeChild( child[ parentSymbol ], child )

      child[ parentSymbol ] = node

      node.splice( index, 0, child )
    }
  }

  return adapter
}

module.exports = ArrayAdapter
