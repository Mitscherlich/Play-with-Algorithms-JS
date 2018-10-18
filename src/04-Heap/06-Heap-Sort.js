/**
 * 原始的 shift down 过程
 * @param {Array} array 待排序的数组
 * @param {Number} n 元素个数
 * @param {Number} k 待 shift down 的元素位置
 */
const shiftDown = (array, n, k) => {
  while (2 * k + 1 < n) {
    let j = 2 * k + 1
    if (j + 1 < n && array[j + 1] > array[j]) {
      j++
    }

    if (array[k] >= array[j]) {
      break
    }

    // swap(arr[k] , arr[j])
    [array[k], array[j]] = [array[j], array[k]]
    k = j
  }
}

/**
 * 优化的 shiftDown 过程, 使用赋值的方式取代不断的 swap,
 * 该优化思想和我们之前对插入排序进行优化的思路是一致的
 * @param {Array} array 待排序的数组
 * @param {Number} n 元素个数
 * @param {Number} k 待 shift down 的元素位置
 */
const shiftDownEnhance = (array, n, k) => {
  const e = array[k]
  while (2 * k + 1 < n) {
    let j = 2 * k + 1
    if (j + 1 < n && array[j + 1] > array[j]) {
      j++
    }

    if (e >= array[j]) {
      break
    }

    array[k] = array[j]
    k = j
  }

  array[k] = e
}

/**
 * 不使用一个额外的最大堆, 直接在原数组上进行原地的堆排序
 */
Array.prototype.heapSort = function () {
  const array = this.slice()
  const n = array.length
  // heapify
  // 注意，此时我们的堆是从 0 开始索引的
  // 从(最后一个元素的索引-1)/2 开始
  // 最后一个元素的索引 = n-1
  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
    shiftDown(array, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    // swap(arr[0], arr[i])
    [array[0], array[i]] = [array[i], array[0]]
    shiftDown(array, i, 0)
  }
  return array
}

/**
 * 优化的堆排序
 */
Array.prototype.heapSortEnhance = function () {
  const array = this.slice()
  const n = array.length
  for (let i = Math.floor((n - 1) / 2); i >= 0; i--) {
    shiftDownEnhance(array, n, i)
  }

  for (let i = n - 1; i > 0; i--) {
    // swap(arr[0], arr[i])
    [array[0], array[i]] = [array[i], array[0]]
    shiftDownEnhance(array, i, 0)
  }
  return array
}
