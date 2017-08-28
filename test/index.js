'use strict'

const assert = require( 'assert' )
const domUtils = require( '@mojule/dom-utils' )
const treeUtils = require( '../' )
const mixins = require( '../src/mixins' )
const document = require( './fixtures/document' )
const DomData = require( './fixtures/dom-data' )
const expectDom = require( './fixtures/expect-dom' )
const expectArray = require( './fixtures/expect-array' )
const expectObject = require( './fixtures/expect-object' )

const { ArrayAdapter, ObjectAdapter, DomAdapter, Mapper } = treeUtils

const arrayAdapter = ArrayAdapter()
const objectAdapter = ObjectAdapter()
const domAdapter = DomAdapter( document )

mixins( arrayAdapter )

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

describe( 'adapters', () => {
  describe( 'array', () => {
    it( 'appendChild', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )
      const child3 = arrayAdapter.createNode( 'child3' )

      const expect = [
        'root',
        [ 'child1' ],
        [ 'child2' ],
        [ 'child3' ]
      ]

      arrayAdapter.appendChild( root, child1 )
      arrayAdapter.appendChild( root, child2 )
      arrayAdapter.appendChild( root, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'appendChild moves', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )
      const grandchild1 = arrayAdapter.createNode( 'grandchild1' )

      const expect = [
        'root',
        [ 'child1' ],
        [
          'child2',
          [ 'grandchild1' ]
        ]
      ]

      arrayAdapter.appendChild( root, child1 )
      arrayAdapter.appendChild( root, child2 )
      arrayAdapter.appendChild( root, grandchild1 )
      arrayAdapter.appendChild( child2, grandchild1 )

      assert.deepEqual( expect, root )
    })

    it( 'appendChild moves between roots', () => {
      const root1 = arrayAdapter.createNode( 'root1' )
      const root2 = arrayAdapter.createNode( 'root2' )

      const child1 = arrayAdapter.createNode( 'child1' )

      const expectRoot1 = [ 'root1' ]
      const expectRoot2 = [ 'root2', [ 'child1' ] ]
      arrayAdapter.appendChild( root1, child1 )
      arrayAdapter.appendChild( root2, child1 )

      assert.deepEqual( expectRoot1, root1 )
      assert.deepEqual( expectRoot2, root2 )
    })

    it( 'insertBefore', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )
      const child3 = arrayAdapter.createNode( 'child3' )

      const expect = [
        'root',
        [ 'child1' ],
        [ 'child2' ],
        [ 'child3' ]
      ]

      arrayAdapter.appendChild( root, child1 )
      arrayAdapter.appendChild( root, child3 )
      arrayAdapter.insertBefore( root, child2, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'insertBefore moves', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )
      const child3 = arrayAdapter.createNode( 'child3' )

      const expect = [
        'root',
        [ 'child1' ],
        [ 'child2' ],
        [ 'child3' ]
      ]

      arrayAdapter.appendChild( root, child1 )
      arrayAdapter.appendChild( root, child3 )
      arrayAdapter.appendChild( root, child2 )
      arrayAdapter.insertBefore( root, child2, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'insertBefore throws when not a child', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )

      assert.throws( () => arrayAdapter.insertBefore( root, child1, child2 ) )
    })

    it( 'removeChild', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )
      const child2 = arrayAdapter.createNode( 'child2' )
      const child3 = arrayAdapter.createNode( 'child3' )

      arrayAdapter.appendChild( root, child1 )
      arrayAdapter.appendChild( root, child2 )
      arrayAdapter.appendChild( root, child3 )

      arrayAdapter.removeChild( root, child2 )

      const expect = [
        'root',
        [ 'child1' ],
        [ 'child3' ]
      ]

      assert.deepEqual( root, expect )
    })

    it( 'removeChild throws when not a child', () => {
      const root = arrayAdapter.createNode( 'root' )
      const child1 = arrayAdapter.createNode( 'child1' )

      assert.throws( () => arrayAdapter.removeChild( root, child1 ) )
    })
  })

  describe( 'dom', () => {
    it( 'comment value', () => {
      const value = { nodeType: 8, nodeValue: 'Hello' }
      const comment = domAdapter.createNode( value )

      assert.deepEqual( value, domAdapter.getValue( comment ) )
    })

    it( 'removeChild', () => {
      const div = domAdapter.createNode({ nodeType: 1, tagName: 'div' })
      const text = domAdapter.createNode( 'Hello' )

      domAdapter.appendChild( div, text )

      assert.strictEqual( domAdapter.getChildren( div ).length, 1 )

      domAdapter.removeChild( div, text )

      assert.strictEqual( domAdapter.getChildren( div ).length, 0 )
    })

    it( 'insertBefore', () => {
      const div = domAdapter.createNode({ nodeType: 1, tagName: 'div' })
      const hello = domAdapter.createNode( 'Hello' )
      const world = domAdapter.createNode( 'World' )
      const space = domAdapter.createNode( ' ' )

      domAdapter.appendChild( div, hello )
      domAdapter.appendChild( div, world )
      domAdapter.insertBefore( div, space, world )

      assert.strictEqual( div.innerHTML, 'Hello World' )
    })

    it( 'fragment', () => {
      const fragment = domAdapter.createNode({ nodeType: 11 })

      assert( fragment )
    })

    it( 'bad node', () => {
      assert.throws( () => domAdapter.createNode({ nodeType: 12 }))
    })

    it( 'text node children', () => {
      const text = domAdapter.createNode( 'Hello' )

      assert.deepEqual( [], domAdapter.getChildren( text ) )
    })
  })

  describe( 'object', () => {
    it( 'appendChild', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )
      const child3 = objectAdapter.createNode( 'child3' )

      const expect = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: []
          },
          {
            value: 'child2',
            children: []
          },
          {
            value: 'child3',
            children: []
          }
        ]
      }

      objectAdapter.appendChild( root, child1 )
      objectAdapter.appendChild( root, child2 )
      objectAdapter.appendChild( root, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'appendChild moves', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )
      const grandchild1 = objectAdapter.createNode( 'grandchild1' )

      const expect = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: []
          },
          {
            value: 'child2',
            children: [
              {
                value: 'grandchild1',
                children: []
              }
            ]
          }
        ]
      }

      objectAdapter.appendChild( root, child1 )
      objectAdapter.appendChild( root, child2 )
      objectAdapter.appendChild( root, grandchild1 )
      objectAdapter.appendChild( child2, grandchild1 )

      assert.deepEqual( expect, root )
    })

    it( 'appendChild moves between roots', () => {
      const root1 = objectAdapter.createNode( 'root1' )
      const root2 = objectAdapter.createNode( 'root2' )

      const child1 = objectAdapter.createNode( 'child1' )

      const expectRoot1 = { value: 'root1', children: [] }
      const expectRoot2 = {
        value: 'root2',
        children: [
          { value: 'child1', children: [] }
        ]
      }
      objectAdapter.appendChild( root1, child1 )
      objectAdapter.appendChild( root2, child1 )

      assert.deepEqual( expectRoot1, root1 )
      assert.deepEqual( expectRoot2, root2 )
    })

    it( 'insertBefore', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )
      const child3 = objectAdapter.createNode( 'child3' )

      const expect = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: []
          },
          {
            value: 'child2',
            children: []
          },
          {
            value: 'child3',
            children: []
          }
        ]
      }

      objectAdapter.appendChild( root, child1 )
      objectAdapter.appendChild( root, child3 )
      objectAdapter.insertBefore( root, child2, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'insertBefore moves', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )
      const child3 = objectAdapter.createNode( 'child3' )

      const expect = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: []
          },
          {
            value: 'child2',
            children: []
          },
          {
            value: 'child3',
            children: []
          }
        ]
      }

      objectAdapter.appendChild( root, child1 )
      objectAdapter.appendChild( root, child3 )
      objectAdapter.appendChild( root, child2 )
      objectAdapter.insertBefore( root, child2, child3 )

      assert.deepEqual( expect, root )
    })

    it( 'insertBefore throws when not a child', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )

      assert.throws( () => objectAdapter.insertBefore( root, child1, child2 ) )
    })

    it( 'removeChild', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )
      const child2 = objectAdapter.createNode( 'child2' )
      const child3 = objectAdapter.createNode( 'child3' )

      objectAdapter.appendChild( root, child1 )
      objectAdapter.appendChild( root, child2 )
      objectAdapter.appendChild( root, child3 )

      objectAdapter.removeChild( root, child2 )

      const expect = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: []
          },
          {
            value: 'child3',
            children: []
          }
        ]
      }

      assert.deepEqual( root, expect )
    })

    it( 'removeChild throws when not a child', () => {
      const root = objectAdapter.createNode( 'root' )
      const child1 = objectAdapter.createNode( 'child1' )

      assert.throws( () => objectAdapter.removeChild( root, child1 ) )
    })
  })
})

describe( 'mixins', () => {
  it( 'filter', () => {
    const n1 = arrayAdapter.createNode( 1 )
    const n2 = arrayAdapter.createNode( 2 )
    const n3 = arrayAdapter.createNode( 3 )
    const n4 = arrayAdapter.createNode( 4 )

    arrayAdapter.appendChild( n1, n2 )
    arrayAdapter.appendChild( n2, n3 )
    arrayAdapter.appendChild( n3, n4 )

    const even = arrayAdapter.filter( n1, current => arrayAdapter.getValue( current ) % 2 === 0 )
    const values = even.map( arrayAdapter.getValue )

    assert.deepEqual( values, [ 2, 4 ] )
  })

  it( 'find', () => {
    const n1 = arrayAdapter.createNode( 1 )
    const n2 = arrayAdapter.createNode( 2 )
    const n3 = arrayAdapter.createNode( 3 )
    const n4 = arrayAdapter.createNode( 4 )

    arrayAdapter.appendChild( n1, n2 )
    arrayAdapter.appendChild( n2, n3 )
    arrayAdapter.appendChild( n3, n4 )

    const even = arrayAdapter.find( n1, current => arrayAdapter.getValue( current ) % 2 === 0 )

    assert.deepEqual( arrayAdapter.getValue( even ), 2 )
  })
})