const { PrintableMaxHeap } = require('./02-Max-Heap-Class-Basic')

/**
 * heapSort1, 将所有的元素依次添加到堆中, 在将所有元素从堆中依次取出来, 即完成了排序
 * 无论是创建堆的过程, 还是从堆中依次取出元素的过程, 时间复杂度均为 O(nlogn)
 * 整个堆排序的整体时间复杂度为 O(nlogn)
 * @param {Array} array 待排序的数组
 */
Array.prototype.heapSort1 = function () {
  const array = this.slice()
  const n = array.length
  const maxHeap = new PrintableMaxHeap(n)
  for (const i of array) {
    maxHeap.insert(i)
  }
  for (let i = n - 1; i >= 0; i--) {
    array[i] = maxHeap.extractMax()
  }
  return array
}

/**
 * heapSort2, 借助我们的 heapify 过程创建堆
 * 此时, 创建堆的过程时间复杂度为 O(n), 将所有元素依次从堆中取出来, 时间复杂度为 O(nlogn)
 * 堆排序的总体时间复杂度依然是 O(nlogn), 但是比上述 heapSort1 性能更优, 因为创建堆的性能更优
 * @param {Array} array 待排序的数组
 */
Array.prototype.heapSort2 = function () {
  const array = this.slice()
  const n = array.length
  const maxHeap = new PrintableMaxHeap(array, n)
  for (let i = n - 1; i >= 0; i--) {
    array[i] = maxHeap.extractMax()
  }
  return array
}
