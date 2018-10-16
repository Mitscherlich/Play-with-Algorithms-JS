Array.prototype.insertSort = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 1; i < n; i++) {
    // 寻找元素 array[i] 合适的插入位置
    for (let j = i; j > 0 && !cb(array[j - 1], array[j]); j--) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]]
    }
  }
  return array
}
