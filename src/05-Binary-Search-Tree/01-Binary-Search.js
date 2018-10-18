/**
 * 二分查找法,在有序数组 arr 中,查找 target
 * 如果找到 target, 返回相应的索引 index
 * 如果没有找到 target, 返回 -1
 * @param {Array} array 待查找的数组
 * @param {*} target 待查找的目标元素
 */
Array.prototype.binarySearch1 = function (target) {
  const n = this.length
  // 在 arr[l...r] 之中查找 target
  let l = 0
  let r = n - 1
  while (l <= r) {
    // let mid = Math.floor((l + r) / 2)
    // 防止极端情况下的整形溢出，使用下面的逻辑求出 mid
    const mid = l + Math.floor((r - l) / 2)
    if (this[mid] === target) {
      return mid
    }
    if (target < this[mid]) {
      // 在 arr[l...mid] 之中查找 target
      r = mid - 1
    } else {
      // 在 arr[mid...r] 之中查找 target
      l = mid + 1
    }
  }
  return -1
}

/**
 * 递归的二分查找
 * @param {Array} array 待查找的数组
 * @param {Number} l 查找左起位置
 * @param {Number} r 查找右止位置
 * @param {*} target 待查找的目标元素
 */
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
Array.prototype.binarySearch2 = function (target) {
  const n = this.length
  return binarySearch(this, 0, n - 1, target)
}
