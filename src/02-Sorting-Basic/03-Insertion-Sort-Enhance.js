const assert = require('assert')

exports.insertSortEnhance = (array, cb) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  for (let i = 1; i < n; i++) {
    let e = array[i]
    let j = i
    // 寻找元素 array[i] 合适的插入位置
    for (; j > 0 && !cb(array[j - 1], e); j--) {
      array[j] = array[j - 1]
    }
    array[j] = e
  }
  return array
}

exports.insertSortPartial = (array, l, r, cb) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  for (let i = l + 1; i <= r; i++) {
    let e = array[i]
    let j
    for (j = i; j > l && !cb(array[j - 1], e); j--) {
      array[j] = array[j - 1]
    }
    array[j] = e
  }
  return array
}
