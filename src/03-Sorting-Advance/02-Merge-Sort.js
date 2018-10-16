const assert = require('assert')

// 将 arr[l...mid] 和 arr[mid+1...r] 两部分进行归并
function merge (array, l, mid, r, cb) {
  assert(Array.isArray(array), `'array' should be an Array but got a '${typeof array}'`)
  const aux = new Array(r - l + 1)
  for (let i = l; i <= r; i++) {
    aux[i - l] = array[i]
  }
  // 初始化，i 指向左半部分的起始索引位置 l；j 指向右半部分起始索引位置 mid+1
  let i = l
  let j = mid + 1
  for (let k = l; k <= r; k++) {
    if (i > mid) { // 如果左半部分元素已经全部处理完毕
      array[k] = aux[j++ - l]
    } else if (j > r) { // 如果右半部分元素已经全部处理完毕
      array[k] = aux[i++ - l]
    } else if (cb(aux[i - l], aux[j - l])) { // 左半部分所指元素 < 右半部分所指元素
      array[k] = aux[i++ - l]
    } else { // 左半部分所指元素 >= 右半部分所指元素
      array[k] = aux[j++ - l]
    }
  }
}

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
function mergeSort (array, l, r, cb) {
  if (l >= r) {
    return
  }
  const mid = Math.floor((l + r) / 2)
  mergeSort(array, l, mid, cb)
  mergeSort(array, mid + 1, r, cb)
  merge(array, l, mid, r, cb)
}

Array.prototype.mergeSort = function (cb) {
  const array = this.slice()
  const n = array.length
  mergeSort(array, 0, n - 1, cb)
  return array
}

module.exports = { merge }
