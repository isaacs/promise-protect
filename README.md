# promise-protect

Protect promise-returning functions from being called more than once in
parallel.

Written during [this twitter
exchange](https://twitter.com/creationix/status/1252798589136326656).

## USAGE

```js
const protect = require('promise-protect')

protect(fn, 'name', some, args).then(result => {})
// won't call fn until the last one resolves
protect(fn, 'name', other, args).then(otherResult => {})
```
