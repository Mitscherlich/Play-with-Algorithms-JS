const { merge } = require('./02-Merge-Sort')

require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

/**
 * 自底向上的归并排序
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.mergeSortReverse = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let sz = 1; sz <= n; sz += sz) {
    for (let i = 0; i + sz < n; i += sz + sz) {
      // 对 arr[i...i+sz-1] 和 arr[i+sz...i+2*sz-1] 进行归并
      merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1), cb)
    }
  }
  return array
}

/**
 * Merge Sort Bottom Up 优化
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.mergeSortReverseEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  // 对于小数组, 使用插入排序优化
  for (let i = 0; i < n; i += 16) {
    Array.insertSortPartial(array, i, Math.min(i + 15, n - 1), cb)
  }

  for (let sz = 16; sz < n; sz += sz) {
    for (let i = 0; i + sz < n; i += sz + sz) {
      // 对于 arr[mid] <= arr[mid+1] 的情况, 不进行 merge
      if (!cb(array[i + sz - 1], array[i + sz])) {
        merge(array, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1), cb)
      }
    }
  }
  return array
}
