const assert = require('assert')

/**
 * 优化的 shift up 过程
 * @param {Array} data 保存堆的数组
 * @param {Array} indexes 保存索引的数组
 * @param {Array} reverse 保存索引的索引的数组
 * @param {Number} k 待 shift up 的元素位置
 */
const shiftUpEnhance = (data, indexes, reverse, k) => {
  const e = indexes[k]
  while (k > 1 && data[indexes[Math.floor(k / 2)]] < data[e]) {
    // swap(indexes[k/2], indexes[k])
    indexes[k] = indexes[Math.floor(k / 2)]
    reverse[indexes[Math.floor(k / 2)]] = Math.floor(k / 2)
    reverse[indexes[k]] = k
    k = Math.floor(k /= 2)
  }
  indexes[k] = e
}

/**
 * 优化的 shift down 过程
 * @param {Array} data 保存堆的数组
 * @param {Array} indexes 保存索引的数组
 * @param {Array} reverse 保存索引的索引的数组
 * @param {Number} k 待 shift down 的元素位置
 * @param {Number} count 堆的大小
 */
const shiftDownEnhance = (data, indexes, reverse, k, count) => {
  const e = indexes[k]
  while (2 * k <= count) {
    let j = 2 * k // 此轮循环中, swap(indexes[k], indexes[j])
    if (j + 1 <= count && data[indexes[j + 1]] > data[indexes[j]]) {
      j++
    }
    if (data[e] >= data[indexes[j]]) {
      break
    }
    // swap(indexes[k], indexes[j])
    indexes[k] = indexes[j]
    reverse[indexes[k]] = k
    reverse[indexes[j]] = j
    k = j
  }
  indexes[k] = e
}

/**
 * @class 索引最大堆
 */
exports.IndexMaxHeap = class IndexMaxHeap {
  /**
   * 构造函数, 构造一个空堆, 可容纳 capacity 个元素
   * @param {Numner} capacity 堆的最大容量
   */
  constructor (capacity) {
    this._data = new Array(capacity + 1)
    this._indexes = new Array(capacity + 1)
    this._reverse = new Array(capacity + 1).fill(0)
    this._count = 0
    this._capacity = capacity
  }
  /**
   * 获取堆中元素个数
   * @return {Number} 堆中元素个数
   */
  size () {
    return this._count
  }
  /**
   * 判断堆是否为空
   * @return {Boolean} 堆是否为空
   */
  isEmpty () {
    return this._count === 0
  }
  /**
   * 插入一个元素
   * @param {Number} i 待插入元素的索引
   * @param {*} item 带插入的元素
   */
  insert (i, item) {
    assert(this._count + 1 <= this._capacity, 'Not enough capacity!')
    assert(i + 1 >= 1 && i + 1 <= this._capacity, 'Not enough capacity!')
    i += 1
    this._data[this._count + 1] = item
    this._indexes[this._count + 1] = i
    this._reverse[i] = this._count + 1
    shiftUpEnhance(this._data, this._indexes, this._reverse, this._count + 1)
    this._count++
  }
  /**
   * 出堆最大的元素
   * @return {*} 最大的元素
   */
  extractMax () {
    assert(this.size() > 0)
    const ret = this._data[this._indexes[1]]
    // swap(data[indexes[1]], data[indexes[count]])
    ;[this._indexes[1], this._indexes[this._count]] = [this._indexes[this._count], this._indexes[1]]
    this._reverse[this._indexes[1]] = 1
    this._reverse[this._indexes[this._count]] = 0
    this._count--
    shiftDownEnhance(this._data, this._indexes, this._reverse, 1, this._count)
    return ret
  }
  /**
   * 出堆最大元素，返回它的索引位置
   * @return {Number} 最大元素在数组中的索引位置
   */
  extractMaxIndex () {
    assert(this.size() > 0)
    const ret = this._indexes[1] - 1
    // swap(data[indexes[1]], data[indexes[count]])
    ;[this._indexes[1], this._indexes[this._count]] = [this._indexes[this._count], this._indexes[1]]
    this._reverse[this._indexes[1]] = 1
    this._reverse[this._indexes[this._count]] = 0
    this._count--
    shiftDownEnhance(this._data, this._indexes, this._reverse, 1, this._count)
    return ret
  }
  /**
   * 获取最大索引堆中的堆顶元素
   * @param {Number} i 元素索引位置
   */
  getItem (i) {
    return this._data[i + 1]
  }
  /**
   * 将最大索引堆中索引为 i 的元素修改为 item
   * @param {Number} i 元素索引位置i
   * @param {*} item 新的元素
   */
  change (i, item) {
    assert(this.contain(i), 'Not in this heap!')
    i += 1
    this._data[i] = item
    // 找到 indexes[j] = i, j 表示 data[i] 在堆中的位置
    // 之后 shiftUp(j), 再 shiftDown(j)
    // for (let j = i; j <= this.size(); j++) {
    //   if (this._indexes[j] === i) {
    //     shiftUpEnhance(this._data, this._indexes, this._reverse, j)
    //     shiftDownEnhance(this._data, this._indexes, this._reverse, j, this._count)
    //     return
    //   }
    // }
    // 有了 reverse 之后,
    // 我们可以非常简单的通过reverse直接定位索引i在indexes中的位置
    const j = this._reverse[i]
    shiftUpEnhance(this._data, this._indexes, this._reverse, j)
    shiftDownEnhance(this._data, this._indexes, this._reverse, j, this._count)
  }
  /**
   * 检查索引 i 所在的位置是否存在元素
   * @param {Number} i 元素索引位置i
   */
  contain (i) {
    assert(i + 1 >= 1 && i + 1 <= this._capacity)
    return this._reverse[i + 1] !== 0
  }
}
