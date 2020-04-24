const protect = require('../')
const t = require('tap')
const saw = []
const fn = i => {
  saw.push(i)
  // try to throw it off by the timing being unpredictable
  return i < 10 ? new Promise(r => {
    setTimeout(() => r(protect(fn, 'deadlock', i + 1)), Math.floor(Math.random() * 100))
  }) : i
}
t.test('does not deadlock', t => protect(fn, 'deadlock', 0).then(i => {
  t.strictSame(saw, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  t.equal(i, 10)
}))
