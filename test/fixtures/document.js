'use strict'

const { JSDOM } = require( 'jsdom' )

const dom = new JSDOM( '<!doctype html>' )
const { document } = dom.window

module.exports = document
