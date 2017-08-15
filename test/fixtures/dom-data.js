'use strict'

const treeUtils = require( '../..' )
const document = require( './document' )

const { DomAdapter } = treeUtils
const domAdapter = DomAdapter( document )
const { createNode, appendChild } = domAdapter

const createEl = tagName => createNode({ nodeType: 1, tagName })

const DomData = () => {
  const doc = createNode({ nodeType: 9 })
  const doctype = createNode({ nodeType: 10, name: 'html' })
  const html = createEl( 'html' )

  appendChild( doc, doctype )
  appendChild( doc, html )

  const head = createEl( 'head' )
  const body = createEl( 'body' )

  appendChild( html, head )
  appendChild( html, body )

  const title = createEl( 'title' )
  const titleText = createNode( 'Hello' )

  appendChild( title, titleText )
  appendChild( head, title )

  const h1 = createEl( 'h1' )
  const h1Text = createNode( 'World' )

  appendChild( h1, h1Text )
  appendChild( body, h1 )

  return doc
}

module.exports = DomData
