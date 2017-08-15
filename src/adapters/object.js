'use strict'

const ObjectAdapter = () =>({
  getValue: node => node.value,
  getChildren: node => node.children,
  createNode: value => ({
    value,
    children: []
  }),
  appendChild: ( node, child ) => node.children.push( child ),
  removeChild: ( node, child ) => {
    const index = node.children.indexOf( child )

    if( index === -1 )
      throw Error( 'child not found in node' )

    node.children.splice( index, 1 )
  },
  insertBefore: ( node, child, reference ) => {
    const index = node.children.indexOf( reference )

    if( index === -1 )
      throw Error( 'reference not found in node' )

    node.children.splice( index, 0, child )
  }
})

module.exports = ObjectAdapter
