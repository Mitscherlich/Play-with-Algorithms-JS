const assert = require('assert')

// 二分查找法,在有序数组 arr 中,查找 target
// 如果找到 target, 返回相应的索引 index
// 如果没有找到 target, 返回 -1
exports.binarySearch1 = (array, target) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  // 在 arr[l...r] 之中查找 target
  let l = 0
  let r = n - 1
  while (l <= r) {
    // let mid = Math.floor((l + r) / 2)
    // 防止极端情况下的整形溢出，使用下面的逻辑求出 mid
    const mid = l + Math.floor((r - l) / 2)
    if (array[mid] === target) {
      return mid
    }
    if (target < array[mid]) {
      // 在 arr[l...mid] 之中查找 target
      r = mid - 1
    } else {
      // 在 arr[mid...r] 之中查找 target
      l = mid + 1
    }
  }
  return -1
}

const binarySearch = (array, l, r, target) => {
  if (l > r) {
    return -1
  }
  // let mid = Math.floor((l + r) / 2)
  // 防止极端情况下的整形溢出，使用下面的逻辑求出 mid
  const mid = l + Math.floor((r - l) / 2)
  if (array[mid] === target) {
    return mid
  } else if (target < array[mid]) {
    // 在 arr[l...mid] 之中查找 target
    return binarySearch(array, l, mid - 1, target)
  } else {
    // 在 arr[mid...r] 之中查找 target
    return binarySearch(array, mid + 1, r, target)
  }
}

// 用递归的方式写二分查找法
exports.binarySearch2 = (array, target) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  return binarySearch(array, 0, n - 1, target)
}

// 二分查找法, 在有序数组 arr 中, 查找 target
// 如果找到 target, 返回第一个 target 相应的索引 index
// 如果没有找到 target, 返回比 target 小的最大值相应的索引, 如果这个最大值有多个, 返回最大索引
// 如果这个 target 比整个数组的最小元素值还要小, 则不存在这个 target 的 floor 值, 返回 -1
exports.floor = (array, target) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  assert(n >= 0, 'Array is empty!')
  // 寻找比 target 小的最大索引
  let l = -1
  let r = n - 1
  while (l < r) {
    // 使用向上取整避免死循环
    const mid = l + (r - l + 1) / 2
    if (array[mid] >= target) {
      r = mid - 1
    } else {
      l = mid
    }
  }
  assert.strictEqual(l, r)
  // 如果该索引+1 就是 target 本身, 该索引+1 即为返回值
  if (l + 1 < n && array[l + 1] === target) {
    return l + 1
  }
  // 否则, 该索引即为返回值
  return l
}

// 二分查找法, 在有序数组 arr 中, 查找 target
// 如果找到 target, 返回最后一个 target 相应的索引 index
// 如果没有找到 target, 返回比 target 大的最小值相应的索引, 如果这个最小值有多个, 返回最小的索引
// 如果这个 target 比整个数组的最大元素值还要大, 则不存在这个 target 的 ceil 值, 返回整个数组元素个数 n
exports.floor = (array, target) => {
  assert(Array.isArray(array), '\'array\' should be an Array!')
  const n = array.length
  assert(n >= 0, 'Array is empty!')
  // 寻找比 target 大的最小索引值
  let l = 0
  let r = n
  while (l < r) {
    // 使用普通的向下取整即可避免死循环
    const mid = l + (r - l + 1) / 2
    if (array[mid] >= target) {
      l = mid + 1
    } else {
      r = mid
    }
  }
  assert.strictEqual(l, r)
  // 如果该索引-1 就是 target 本身, 该索引-1 即为返回值
  if (r - 1 < n && array[r - 1] === target) {
    return r - 1
  }
  // 否则, 该索引即为返回值
  return r
}
