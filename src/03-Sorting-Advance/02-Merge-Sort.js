// 将 arr[l...mid] 和 arr[mid+1...r] 两部分进行归并
const __merge__ = (array, l, mid, r, cb) => {
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

exports.merge = __merge__

// 递归使用归并排序, 对 arr[l...r] 的范围进行排序
// eslint-disable-next-line
const __merge_sort__ = (array, l, r, cb) => {
  if (l >= r) {
    return
  }
  const mid = Math.floor((l + r) / 2)
  __merge_sort__(array, l, mid, cb)
  __merge_sort__(array, mid + 1, r, cb)
  __merge__(array, l, mid, r, cb)
}

exports.mergeSort = (array, cb) => {
  const n = array.length
  __merge_sort__(array, 0, n - 1, cb)
  return array
}
