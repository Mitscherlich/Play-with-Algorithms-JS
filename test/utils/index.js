const assert = require('assert')

exports.SIZE = 10000
exports.MIN = 0
exports.MAX = 100000
exports.SWAP_TIMES = 100

exports.generateRandomArray = (size, min, max) => {
  assert(min <= max)
  const array = []
  for (let i = 0; i < size ; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return array
}

exports.generateNearlyOrderedArray = (size, swapTimes) => {
  const array = []
  for (let i = 0; i < size; i++) {
    array.push(i)
  }
  for (let i = 0; i < swapTimes; i++) {
    const posx = Math.floor(Math.random() * size)
    const posy = Math.floor(Math.random() * size)
    const tmp = array[posx]
    array[posy] = array[posx]
    array[posx] = tmp
  }
  return array
}

exports.isSorted = (array, cb) => {
  const size = array.length
  for (let i = 0; i < size - 1; i++) {
    if (cb(array[i], array[i + 1])) {
      return false
    }
  }
  return true
}
