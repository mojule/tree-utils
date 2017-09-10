'use strict'

const parentSymbol = require( '../parent-symbol' )

const ObjectAdapter = () => {
  const adapter = {
    getValue: node => node.value,
    getChildren: node => node.children || [],
    createNode: value => ({
      value,
      children: []
    }),
    appendChild: ( node, child ) => {
      if( child[ parentSymbol ] )
        adapter.removeChild( child[ parentSymbol ], child )

      node.children.push( child )

      child[ parentSymbol ] = node

      return child
    },
    removeChild: ( node, child ) => {
      const index = node.children.indexOf( child )

      if( index === -1 )
        throw Error( 'child not found in node' )

      child[ parentSymbol ] = null

      node.children.splice( index, 1 )
    },
    insertBefore: ( node, child, reference ) => {
      const index = node.children.indexOf( reference )

      if( index === -1 )
        throw Error( 'reference not found in node' )

      if( child[ parentSymbol ] )
        adapter.removeChild( child[ parentSymbol ], child )

      child[ parentSymbol ] = node

      node.children.splice( index, 0, child )
    },
    insertAfter: ( node, child, reference ) => {
      const index = node.children.indexOf( reference )

      if( index === -1 )
        throw Error( 'reference not found in node' )

      if( child[ parentSymbol ] )
        adapter.removeChild( child[ parentSymbol ], child )

      child[ parentSymbol ] = node

      node.children.splice( index + 1, 0, child )
    }
  }

  return adapter
}

module.exports = ObjectAdapter
