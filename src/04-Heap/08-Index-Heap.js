const assert = require('assert')

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

exports.IndexMaxHeap = class {
  // 构造函数, 构造一个空堆, 可容纳 capacity 个元素
  constructor (capacity) {
    this._data = new Array(capacity + 1)
    this._indexes = new Array(capacity + 1)
    this._reverse = new Array(capacity + 1).fill(0)
    this._count = 0
    this._capacity = capacity
  }

  size () {
    return this._count
  }

  isEmpty () {
    return this._count === 0
  }

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

  // 获取最大索引堆中的堆顶元素
  getItem (i) {
    return this._data[i + 1]
  }

  // 将最大索引堆中索引为 i 的元素修改为 newItem
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

  // 检查索引 i 所在的位置是否存在元素
  contain (i) {
    assert(i + 1 >= 1 && i + 1 <= this._capacity)
    return this._reverse[i + 1] !== 0
  }
}
