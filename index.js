const locks = new Map()
const get = n => locks.get(n) || Promise.resolve()
module.exports = (fn, n, ...args) => {
  const lock = get(n).then(() => {
    const lock = locks.get(n)
    locks.delete(n)
    try {
      return fn(...args)
    } finally {
      get(n).then(() => lock)
    }
  })
  locks.set(n, lock)
  return lock
}
