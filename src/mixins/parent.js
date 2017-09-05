'use strict'

const parentSymbol = require( '../parent-symbol' )

const parent = node => node[ parentSymbol ]

module.exports = parent
