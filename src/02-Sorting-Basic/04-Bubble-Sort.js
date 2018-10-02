const assert = require('assert')

exports.bubbleSort = (array, cb) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  let n = array.length
  let swapped
  do {
    swapped = false
    for (let i = 0; i < n; i++) {
      if (!cb(array[i - 1], array[i])) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]]
        swapped = true
      }
    }
    n--
  } while (swapped)
  return array
}
