const { THRESHOLD } = require('./03-Merge-Sort-Enhance')
require('../02-Sorting-Basic/03-Insertion-Sort-Enhance')

// 双路快速排序的 partition
// 返回 p, 使得 arr[l...p-1] < arr[p]; arr[p+1...r] > arr[p]
function partition (array, l, r, cb) {
  const k = Math.floor(Math.random() * (r - l + 1) + l)
  ;[array[l], array[k]] = [array[k], array[l]]
  const v = array[l]

  // arr[l+1...i) <= v; arr(j...r] >= v
  let i = l + 1
  let j = r

  while (true) {
    // 注意这里的边界, arr[i] < v, 不能是 arr[i] <= v
    while (i <= r && cb(array[i], v)) {
      i++
    }
    // 注意这里的边界, arr[j] > v, 不能是arr[j] >= v
    while (j >= l + 1 && cb(v, array[j])) {
      j--
    }
    // 对于上面的两个边界的设定, 有的同学在课程的问答区有很好的回答 :)
    // 大家可以参考: http://coding.imooc.com/learn/questiondetail/4920.html
    if (i > j) {
      break
    }
    [array[i], array[j]] = [array[j], array[i]]
    i++
    j--
  }
  [array[l], array[j]] = [array[j], array[l]]
  return j
}

// 对 arr[l...r] 部分进行快速排序
function quickSort (array, l, r, cb) {
  if (r - l <= THRESHOLD) {
    Array.insertSortPartial(array, l, r, cb)
    return
  }
  const p = partition(array, l, r, cb)
  quickSort(array, l, p - 1, cb)
  quickSort(array, p + 1, r, cb)
}

Array.prototype.quickSortWithIK = function (cb) {
  const array = this.slice()
  const n = array.length
  quickSort(array, 0, n - 1, cb)
  return array
}
