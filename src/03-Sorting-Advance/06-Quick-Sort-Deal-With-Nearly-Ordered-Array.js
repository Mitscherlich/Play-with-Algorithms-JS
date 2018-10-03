const { THRESHOLD } = require('./03-Merge-Sort-Enhance')
const { insertSortPartial } = require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

// 对 arr[l...r] 部分进行 partition 操作
// 返回 p, 使得 arr[l...p-1] < arr[p]; arr[p+1...r] > arr[p]
// eslint-disable-next-line
const __partition__ = (array, l, r, cb) => {
  const k = Math.floor(Math.random() * (r - l + 1) + l)
  ;[array[l], array[k]] = [array[k], array[l]]
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

exports.partition = __partition__

// 对 arr[l...r] 部分进行快速排序
// eslint-disable-next-line
const __quick_sort__ = (array, l, r, cb) => {
  if (r - l <= THRESHOLD) {
    insertSortPartial(array, l, r, cb)
    return
  }
  const p = __partition__(array, l, r, cb)
  __quick_sort__(array, l, p - 1, cb)
  __quick_sort__(array, p + 1, r, cb)
}

exports.quickSortWithNOA = (array, cb) => {
  const n = array.length
  __quick_sort__(array, 0, n - 1, cb)
  return array
}
