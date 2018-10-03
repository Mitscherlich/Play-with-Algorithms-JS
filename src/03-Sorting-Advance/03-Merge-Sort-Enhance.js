const { insertSortPartial } = require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

const THRESHOLD = 15

exports.THRESHOLD = THRESHOLD

const __merge__ = require('./02-Merge-Sort').merge

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
// eslint-disable-next-line
const __merge_sort__ = (array, l, r, cb) => {
  // 优化 1: 对于小规模数组, 使用插入排序
  if (r - l <= THRESHOLD) {
    array = insertSortPartial(array, l, r, cb)
    return
  }
  const mid = Math.floor((l + r) / 2)
  __merge_sort__(array, l, mid, cb)
  __merge_sort__(array, mid + 1, r, cb)
  // 优化 2: 对于 arr[mid] <= arr[mid+1] 的情况, 不进行 merge
  // 对于近乎有序的数组非常有效, 但是对于一般情况, 有一定的性能损失
  if (!cb(array[mid], array[mid + 1])) {
    __merge__(array, l, mid, r, cb)
  }
}

exports.mergeSortEnhance = (array, cb) => {
  const n = array.length
  __merge_sort__(array, 0, n - 1, cb)
  return array
}
