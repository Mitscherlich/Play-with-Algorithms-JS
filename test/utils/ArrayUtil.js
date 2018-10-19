const assert = require('assert')

Array.generateRandomArray = (size, min, max) => {
  assert(min <= max)
  const array = []
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return array
}

Array.generateNearlyOrderedArray = (size, swapTimes) => {
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

Array.prototype.isSorted = function (cb) {
  const size = this.length
  for (let i = 0; i < size - 1; i++) {
    if (cb(this[i], this[i + 1])) {
      return false
    }
  }
  return true
}
