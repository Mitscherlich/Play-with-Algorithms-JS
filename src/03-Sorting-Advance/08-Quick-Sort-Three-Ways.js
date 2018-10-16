const { THRESHOLD } = require('./03-Merge-Sort-Enhance')
require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

// 递归的三路快速排序处理 arr[l...r]
// 将 arr[l...r] 分为 <v; == v; >v 三部分
// 之后地归对 <v; >v 两部分继续进行三路快排
function quickSort (array, l, r, cb) {
  // 对于小规模数组, 使用插入排序进行优化
  if (r - l <= THRESHOLD) {
    Array.insertSortPartial(array, l, r, cb)
    return
  }
  // partition
  // 随机在 arr[l...r] 的范围中, 选择一个数值作为标定点 pivot
  const k = Math.floor(Math.random() * (r - l + 1) + l)
  ;[array[l], array[k]] = [array[k], array[l]]
  const v = array[l]

  let lt = l // arr[l+1...lt] < v
  let gt = r + 1 // arr[gt...r] > v
  let i = l + 1 // arr[lt+1...i] == v
  while (i < gt) {
    if (cb(array[i], v)) {
      [array[i], array[lt + 1]] = [array[lt + 1], array[i]]
      lt++
      i++
    } else if (cb(v, array[i])) {
      [array[i], array[gt - 1]] = [array[gt - 1], array[i]]
      gt--
    } else { // arr[i] == v
      i++
    }
  }
  [array[l], array[lt]] = [array[lt], array[l]]

  quickSort(array, l, lt - 1, cb)
  quickSort(array, gt, r, cb)
}

Array.prototype.quickSort3Ways = function (cb) {
  const array = this.slice()
  const n = array.length
  quickSort(array, 0, n - 1, cb)
  return array
}
