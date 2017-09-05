'use strict'

const domUtils = require( '@mojule/dom-utils' )
const is = require( '@mojule/is' )

const { getAttributes, setAttributes } = domUtils

const getValue = node => {
  const { nodeType } = node

  if( nodeType === 1 ){
    const tagName = node.tagName.toLowerCase()
    const attributes = getAttributes( node )

    return { nodeType, tagName, attributes }
  }

  if( nodeType === 3 ) return node.nodeValue

  if( nodeType === 8 ){
    const { nodeValue } = node

    return { nodeType, nodeValue }
  }

  if( nodeType === 10 ){
    const { name, publicId, systemId } = node

    return { nodeType, name, publicId, systemId }
  }

  return { nodeType }
}

const getChildren = node => Array.from( node.childNodes )

const appendChild = ( node, child ) => node.appendChild( child )

const removeChild = ( node, child ) => node.removeChild( child )

const insertBefore = ( node, child, reference ) =>
  node.insertBefore( child, reference )

const insertAfter = ( node, child, reference ) =>
  node.insertAfter( child, reference )

const DomAdapter = document => {
  const createNode = value => {
    if( is.string( value ) )
      return document.createTextNode( value )

    const { nodeType } = value

    if( nodeType === 1 ){
      const { tagName, attributes = {} } = value
      const element = document.createElement( tagName )

      setAttributes( element, attributes )

      return element
    }

    if( nodeType === 8 ){
      const { nodeValue } = value
      const comment = document.createComment( nodeValue )

      return comment
    }

    if( nodeType === 9 ){
      const doc = document.implementation.createDocument( 'http://www.w3.org/1999/xhtml', 'html' )

      while( doc.firstChild )
        doc.removeChild( doc.firstChild )

      return doc
    }

    if( nodeType === 10 ){
      const { name = 'html', publicId = '', systemId = '' } = value
      const doctype = document.implementation.createDocumentType( name, publicId, systemId )

      return doctype
    }

    if( nodeType === 11 )
      return document.createDocumentFragment()

    throw Error( 'Unexpected node' )
  }

  return {
    getValue, getChildren, createNode, appendChild, removeChild, insertBefore,
    insertAfter
  }
}

module.exports = DomAdapter
