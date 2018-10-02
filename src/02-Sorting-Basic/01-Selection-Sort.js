const assert = require('assert')

exports.selectionSort = (array, cb) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  for (let i = 0; i < n; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (cb(array[j], array[minIndex])) {
        minIndex = j
      }
    }
    // es6 解构赋值: 需要 node ≥ 6
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
  return array
}
