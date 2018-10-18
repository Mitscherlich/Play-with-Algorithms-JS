/**
 * 冒泡排序：大概是大部分教材上的实现
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.bubbleSortOrigin = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!cb(array[j], array[j + 1])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
      }
    }
  }
  return array
}
