Array.prototype.shellSort = function (cb) {
  const array = this.slice()
  const n = array.length
  // 计算 increment sequence: 1, 4, 13, 40, 121, 364, 1093...
  let h = 1
  while (h < n / 3) {
    h = 3 * h + 1
  }

  while (h >= 1) {
    // h-sort the array
    for (let i = h; i < n; i++) {
      // 对 arr[i], arr[i-h], arr[i-2*h], arr[i-3*h]... 使用插入排序
      let e = array[i]
      let j
      for (j = i; j >= h && cb(e, array[j - h]); j -= h) {
        array[j] = array[j - h]
      }
      array[j] = e
    }
    h = Math.floor(h /= 3)
  }
  return array
}
