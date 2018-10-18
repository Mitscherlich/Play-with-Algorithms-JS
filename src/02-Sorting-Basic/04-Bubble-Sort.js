/**
 * 冒泡排序
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.bubbleSort = function (cb) {
  const array = this.slice()
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
