require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

const THRESHOLD = 15

const merge = require('./02-Merge-Sort').merge

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
function mergeSort (array, l, r, cb) {
  // 优化 1: 对于小规模数组, 使用插入排序
  if (r - l <= THRESHOLD) {
    array = Array.insertSortPartial(array, l, r, cb)
    return
  }
  const mid = Math.floor((l + r) / 2)
  mergeSort(array, l, mid, cb)
  mergeSort(array, mid + 1, r, cb)
  // 优化 2: 对于 arr[mid] <= arr[mid+1] 的情况, 不进行 merge
  // 对于近乎有序的数组非常有效, 但是对于一般情况, 有一定的性能损失
  if (!cb(array[mid], array[mid + 1])) {
    merge(array, l, mid, r, cb)
  }
}

Array.prototype.mergeSortEnhance = function (cb) {
  const array = this.slice()
  const n = array.length
  mergeSort(array, 0, n - 1, cb)
  return array
}

module.exports = { THRESHOLD }
