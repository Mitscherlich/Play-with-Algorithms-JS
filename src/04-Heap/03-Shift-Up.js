/**
 * shift up 操作
 * @param {Array} data 保存堆的数组
 * @param {Number} k 待 shift up 的元素位置
 */
exports.shiftUp = (data, k) => {
  while (k > 1 && data[Math.floor(k / 2)] < data[k]) {
    // swap(data[k/2], data[k])
    [data[Math.floor(k / 2)], data[k]] = [data[k], data[Math.floor(k / 2)]]
    k = Math.floor(k /= 2)
  }
}

/**
 * 优化 shift up 操作
 * @param {Array} data 保存堆的数组
 * @param {Number} k 待 shift up 的元素位置
 */
exports.shiftUpEnhance = (data, k) => {
  const e = data[k]
  while (k > 1 && data[Math.floor(k / 2)] < e) {
    // swap(data[k/2], data[k])
    data[k] = data[Math.floor(k / 2)]
    k = Math.floor(k /= 2)
  }
  data[k] = e
}
