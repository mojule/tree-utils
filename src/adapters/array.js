'use strict'

const ArrayAdapter = () => ({
  getValue: node => node[ 0 ],
  getChildren: node => node.slice( 1 ),
  createNode: value => [ value ],
  appendChild: ( node, child ) => node.push( child ),
  removeChild: ( node, child ) => {
    const index = node.indexOf( child )

    if( index === -1 )
      throw Error( 'child not found in node' )

    node.splice( index, 1 )
  },
  insertBefore: ( node, child, reference ) => {
    const index = node.indexOf( reference )

    if( index === -1 )
      throw Error( 'reference not found in node' )

    node.splice( index, 0, child )
  }
})

module.exports = ArrayAdapter
