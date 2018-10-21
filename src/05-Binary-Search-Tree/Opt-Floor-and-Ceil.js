const assert = require('assert')

/**
 * 二分查找法, 在有序数组 arr 中, 查找 target
 * 如果找到 target, 返回相应的索引 index
 * 如果没有找到 target, 返回 -1
 *
 * @param {*} target 待查找的元素
 * @return {Number} 索引
 */
Array.prototype.find = function find (target) {
  // 在 arr[l...r] 之中查找 target
  let l = 0
  let r = this.length - 1
  while (l <= r) {
    // int mid = (l + r)/2;
    // 防止极端情况下的整形溢出，使用下面的逻辑求出 mid
    const mid = l + (r - l) / 2

    if (this[mid] === target) {
      return mid
    }

    if (this[mid] > target) {
      r = mid - 1
    } else {
      l = mid + 1
    }
  }

  return -1
}

/**
 * 二分查找法, 在有序数组 arr 中, 查找 target
 * 如果找到 target, 返回第一个 target 相应的索引 index
 * 如果没有找到 target, 返回比 target 小的最大值相应的索引, 如果这个最大值有多个, 返回最大索引
 * 如果这个 target 比整个数组的最小元素值还要小, 则不存在这个 target 的 floor 值, 返回 -1
 *
 * @param {*} target 待查找的元素
 * @return {Number} 索引
 */
Array.prototype.floor = function floor (target) {
  // 寻找比 target 小的最大索引
  let l = -1
  let r = this.length - 1
  while (l < r) {
    // 使用向上取整避免死循环
    const mid = l + (r - l) / 2
    if (this[mid] >= target) {
      r = mid - 1
    } else {
      l = mid
    }
  }

  assert(l === r)

  // 如果该索引 + 1 就是 target 本身, 该索引 + 1 即为返回值
  if (l + 1 < this.length && this[l + 1] === target) {
    return l + 1
  }
  // 否则, 该索引即为返回值
  return l
}

/**
 * 二分查找法, 在有序数组 arr 中, 查找 target
 * 如果找到 target, 返回最后一个 target 相应的索引 index
 * 如果没有找到 target, 返回比 target 大的最小值相应的索引, 如果这个最小值有多个, 返回最小的索引
 * 如果这个 target 比整个数组的最大元素值还要大, 则不存在这个 target 的 ceil 值, 返回整个数组元素个数 n
 *
 * @param {*} target 待查找的元素
 * @return {Number} 索引
 */
Array.prototype.ceil = function ceil (target) {
  // 寻找比 target 小的最大索引
  let l = 0
  let r = this.length
  while (l < r) {
    // 使用向上取整避免死循环
    const mid = l + (r - l) / 2
    if (this[mid] <= target) {
      l = mid + 1
    } else { // arr[mid] > target
      r = mid
    }
  }

  assert(l === r)

  // 如果该索引 - 1 就是 target 本身, 该索引 + 1 即为返回值
  if (r - 1 >= 0 && this[r - 1] === target) {
    return r - 1
  }
  // 否则, 该索引即为返回值
  return r
}
