/**
 * shift down 操作
 * @param {Array} data 保存堆的数组
 * @param {Number} k 待 shift down 的元素位置
 * @param {Number} count 堆的大小
 */
exports.shiftDown = (data, k, count) => {
  while (2 * k <= count) {
    let j = 2 * k // 此轮循环中, swap(data[k], data[j])
    if (j + 1 <= count && data[j + 1] > data[j]) {
      j++
    }
    if (data[k] >= data[j]) {
      break
    }
    // swap(data[k], data[j])
    [data[k], data[j]] = [data[j], data[k]]
    k = j
  }
}

/**
 * 优化 shift down 操作
 * @param {Array} data 保存堆的数组
 * @param {Number} k 待 shift down 的元素位置
 * @param {Number} count 堆的大小
 */
exports.shiftDownEnhance = (data, k, count) => {
  const e = data[k]
  while (2 * k <= count) {
    let j = 2 * k // 此轮循环中, swap(data[k], data[j])
    if (j + 1 <= count && data[j + 1] > data[j]) {
      j++
    }
    if (e >= data[j]) {
      break
    }
    // swap(data[k], data[j])
    data[k] = data[j]
    k = j
  }
  data[k] = e
}
