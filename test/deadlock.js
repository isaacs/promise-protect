const protect = require('../')
const t = require('tap')

let i = 0
const fn = () => i++ < 10 ? protect(fn, 'deadlock') : 5

t.test('does not deadlock', t => protect(fn, 'deadlock'))
