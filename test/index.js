'use strict'

const assert = require( 'assert' )
const domUtils = require( '@mojule/dom-utils' )
const treeUtils = require( '../' )
const document = require( './fixtures/document' )
const DomData = require( './fixtures/dom-data' )
const expectDom = require( './fixtures/expect-dom' )
const expectArray = require( './fixtures/expect-array' )
const expectObject = require( './fixtures/expect-object' )

const { ArrayAdapter, ObjectAdapter, DomAdapter, Mapper } = treeUtils

const arrayAdapter = ArrayAdapter()
const objectAdapter = ObjectAdapter()
const domAdapter = DomAdapter( document )

const domData = DomData()
const { stringify } = domUtils

describe( 'Mapper', () => {
  const domToArray = Mapper( domAdapter, arrayAdapter )
  const domToObject = Mapper( domAdapter, objectAdapter )
  const arrayToObject = Mapper( arrayAdapter, objectAdapter )
  const arrayToDom = Mapper( arrayAdapter, domAdapter )
  const objectToArray = Mapper( objectAdapter, arrayAdapter )
  const objectToDom = Mapper( objectAdapter, domAdapter )

  const arr = domToArray( domData )
  const obj = domToObject( domData )

  it( 'dom to array', () => {
    assert.deepEqual( expectArray, arr )
  })

  it( 'dom to object', () => {
    assert.deepEqual( expectObject, obj )
  })

  it( 'array to object', () => {
    const obj = arrayToObject( arr )
    assert.deepEqual( expectObject, obj )
  })

  it( 'array to DOM', () => {
    const dom = arrayToDom( arr )
    assert.strictEqual( expectDom, stringify( dom ) )
  })

  it( 'object to array', () => {
    const arr = objectToArray( obj )
    assert.deepEqual( expectArray, arr )
  })

  it( 'object to dom', () => {
    const dom = objectToDom( obj )
    assert.strictEqual( expectDom, stringify( dom ) )
  })
})
