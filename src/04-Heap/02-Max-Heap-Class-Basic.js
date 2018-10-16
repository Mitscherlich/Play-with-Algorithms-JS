const assert = require('assert')
const debug = require('debug')('PrintableMaxHeap')

// eslint-disable-next-line
const { /* shiftUp */ shiftUpEnhance } = require('./03-Shift-Up')
// eslint-disable-next-line
const { /* shiftDown */ shiftDownEnhance } = require('./04-Shift-Down')

class MaxHeap {
  // 构造函数, 构造一个空堆, 可容纳 capacity 个元素
  constructor (array, capacity) {
    if (!Array.isArray(array)) {
      capacity = array
      this._count = 0
    } else {
      capacity = array.length
    }
    this._data = new Array(capacity + 1)
    if (Array.isArray(array)) {
      for (let i = 0; i < capacity; i++) {
        this._data[i + 1] = array[i]
      }
      this._count = capacity
      for (let i = Math.floor(capacity / 2); i >= 1; i--) {
        shiftDownEnhance(this._data, i, capacity)
      }
    }
    this._capacity = capacity
  }

  size () {
    return this._count
  }

  isEmpty () {
    return this._count === 0
  }

  insert (item) {
    assert(this._count + 1 <= this._capacity, 'Not enough capacity!')
    this._data[this._count + 1] = item
    shiftUpEnhance(this._data, this._count + 1)
    this._count++
  }

  extractMax () {
    assert(this.size() > 0)
    const ret = this._data[1]
    // swap(data[1], data[count])
    ;[this._data[1], this._data[this._count]] = [this._data[this._count], this._data[1]]
    this._count--
    shiftDownEnhance(this._data, 1, this._count)
    return ret
  }
}

function putNumberInLine (num, line, indexCurLevel, curTreeWidth, isLeft) {
  let subTreeWidth = Math.floor((curTreeWidth - 1) / 2)
  let offset = indexCurLevel * (curTreeWidth + 1) + subTreeWidth
  assert(offset + 1 < line.length, 'line width exceed')
  if (num >= 10) {
    line = line.substring(0, offset + 0) + num.toString() + line.substring(offset + 2)
  } else {
    if (isLeft) {
      line = line.substring(0, offset + 0) + num.toString() + line.substring(offset + 1)
    } else {
      line = line.substring(0, offset + 1) + num.toString() + line.substring(offset + 2)
    }
  }
  return line
}

function putBranchInLine (line, indexCurLevel, curTreeWidth) {
  let subTreeWidth = Math.floor((curTreeWidth - 1) / 2)
  let subSubTreeWidth = Math.floor((subTreeWidth - 1) / 2)
  let offsetLeft = indexCurLevel * (curTreeWidth + 1) + subSubTreeWidth
  assert(offsetLeft + 1 < line.length, 'line width exceed')
  let offsetRight = indexCurLevel * (curTreeWidth + 1) + subTreeWidth + 1 + subSubTreeWidth
  assert(offsetRight < line.length, 'line width exceed')
  line = line.substring(0, offsetLeft + 1) + '/' + line.substring(offsetLeft + 2)
  line = line.substring(0, offsetRight) + '\\' + line.substring(offsetRight + 1)
  return line
}

exports.PrintableMaxHeap = class PrintableMaxHeap extends MaxHeap {
  toString () {
    let str = ''
    // 只能打印 100 个元素以内的堆的树状信息
    if (this.size() >= 100) {
      debug('This print function can only work for less than 100 items')
      return str
    }
    debug('The max heap size is: ' + this.size())
    debug('Data in the max heap: ')
    let line = ''
    for (let i = 1; i < this.size(); i++) {
      const data = this._data[i]
      assert(data >= 0 && data < 100, 'Only handle item ≥ 0 ≤ 100, but got \'' + data + '\'')
      line += data + ' '
    }
    debug(`[${line}]`)
    let n = this.size()
    let maxLevel = 0
    let numberPerLevel = 1
    while (n > 0) {
      maxLevel += 1
      n -= numberPerLevel
      numberPerLevel *= 2
    }
    let maxLevelNumber = 2 ** (maxLevel - 1)
    let curTreeMaxLevelNumber = maxLevelNumber
    let index = 1
    for (let level = 0; level < maxLevel; level++) {
      let line1 = ' '.repeat(maxLevelNumber * 3 - 1)
      let curLevelNumber = Math.min(this.size() - (2 ** level) + 1, 2 ** level)
      let isLeft = true
      for (let indexCurLevel = 0; indexCurLevel < curLevelNumber; index++, indexCurLevel++) {
        line1 = putNumberInLine(this._data[index], line1, indexCurLevel, curTreeMaxLevelNumber * 3 - 1, isLeft)
        isLeft = !isLeft
      }
      str += line1 + '\n'
      if (level === maxLevel - 1) {
        break
      }
      let line2 = ' '.repeat(maxLevelNumber * 3 - 1)
      for (let indexCurLevel = 0; indexCurLevel < curLevelNumber; indexCurLevel++) {
        line2 = putBranchInLine(line2, indexCurLevel, curTreeMaxLevelNumber * 3 - 1)
      }
      str += line2 + '\n'
      curTreeMaxLevelNumber = Math.floor(curTreeMaxLevelNumber /= 2)
    }
    return str
  }
}
