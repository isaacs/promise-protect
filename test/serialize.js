const protect = require('../')
const t = require('tap')

let going = false
const fn = x => {
  if (going)
    throw new Error('calling in parallel')
  going = true
  return new Promise(r => setTimeout(() => {
    going = false
    r(x)
  }))
}

t.test('no parallels', t => Promise.all([
  protect(fn, 'xyz', 1),
  protect(fn, 'xyz', 2),
  protect(fn, 'xyz', 3),
  protect(fn, 'xyz', 4),
  protect(fn, 'xyz', 5),
  protect(fn, 'xyz', 6),
  protect(fn, 'xyz', 7),
  protect(fn, 'xyz', 8),
  protect(fn, 'xyz', 9),
  protect(fn, 'xyz', 10),
  protect(fn, 'xyz', 11),
  protect(fn, 'xyz', 12),
  protect(fn, 'xyz', 13),
  protect(fn, 'xyz', 14),
  protect(fn, 'xyz', 15),
  protect(fn, 'xyz', 16),
]).then(values => t.strictSame(values, [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
])))
