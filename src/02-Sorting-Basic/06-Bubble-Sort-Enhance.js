/**
 * 优化冒泡排序
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.bubbleSortEnhance = function (cb) {
  const array = this.slice()
  let n = array.length
  let rear
  do {
    rear = 0
    for (let i = 1; i < n; i++) {
      if (!cb(array[i - 1], array[i])) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]]
        // 记录最后一次的交换位置, 在此之后的元素在下一轮扫描中均不考虑
        rear = i
      }
    }
    n = rear
  } while (n > 0)
  return array
}
