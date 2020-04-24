const protect = require('../')
const t = require('tap')

let i = 0
const fn = () => i++ < 10 ? protect(fn, '__proto__') : 5

t.test('does not get weird with __proto__', t => protect(fn, '__proto__'))
