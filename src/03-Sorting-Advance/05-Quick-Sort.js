const { THRESHOLD } = require('./03-Merge-Sort-Enhance')
require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

/**
 * 对 arr[l...r] 部分进行 partition 操作
 * @param {Array} array 待划分的数组
 * @param {Number} l 待划分部分的左端点
 * @param {Number} r 待划分部分的右端点
 * @param {Function} cb 排序时的回调接口
 * @returns {Number} 返回 p, 使得 arr[l...p-1] < arr[p]; arr[p+1...r] > arr[p]
 */
function partition (array, l, r, cb) {
  const v = array[l]
  let j = l // arr[l+1...j] < v ; arr[j+1...i) > v
  for (let i = l + 1; i <= r; i++) {
    if (cb(array[i], v)) {
      j++
      [array[j], array[i]] = [array[i], array[j]]
    }
  }
  [array[l], array[j]] = [array[j], array[l]]
  return j
}

/**
 * 对 arr[l...r] 部分进行快速排序
 * @param {Array} array 待排序的数组
 * @param {Number} l 待排序数组的左端点
 * @param {Number} r 待排序数组的右端点
 * @param {Function} cb 排序时的回调接口
 */
function quickSort (array, l, r, cb) {
  if (l >= r) {
    return
  }
  const p = partition(array, l, r, cb)
  quickSort(array, l, p - 1, cb)
  quickSort(array, p + 1, r, cb)
}

/**
 * 快速排序
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.quickSort = function (cb) {
  const array = this.slice()
  const n = array.length
  quickSort(array, 0, n - 1, cb)
  return array
}

/**
 * 优化，对 arr[l...r] 部分进行快速排序
 * @param {Array} array 待排序的数组
 * @param {Number} l 待排序数组的左端点
 * @param {Number} r 待排序数组的右端点
 * @param {Function} cb 排序时的回调接口
 */
function quickSortEnhance (array, l, r, cb) {
  if (r - l <= THRESHOLD) {
    Array.insertSortPartial(array, l, r, cb)
    return
  }
  const p = partition(array, l, r, cb)
  quickSort(array, l, p - 1, cb)
  quickSort(array, p + 1, r, cb)
}

/**
 * 优化快速排序
 * @param {Function} cb 排序时的回调接口
 */
Array.prototype.quickSortEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  quickSortEnhance(array, 0, n - 1, cb)
  return array
}
