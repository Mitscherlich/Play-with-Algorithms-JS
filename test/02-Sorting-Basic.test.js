const assert = require('assert')
const {
  describe,
  beforeEach,
  it,
  afterEach
} = require('mocha')
require('../src/02-Sorting-Basic/01-Selection-Sort.js')
require('../src/02-Sorting-Basic/02-Insertion-Sort.js')
require('../src/02-Sorting-Basic/03-Insertion-Sort-Enhance')
require('../src/02-Sorting-Basic/04-Bubble-Sort')
require('../src/02-Sorting-Basic/05-Bubble-Sort-Origin')
require('../src/02-Sorting-Basic/06-Bubble-Sort-Enhance')
require('../src/02-Sorting-Basic/07-Shell-Sort')
const { SIZE, MIN, MAX, SWAP_TIMES } = require('./utils')

describe('02-Sorting-Basic', () => {
  // 测试 1 一般性测试
  describe('With random array', () => {
    let array
    let sorted

    beforeEach(() => {
      // 清空已排序的数组
      sorted = []
      // 原数组不直接作为参数，参数使用 slice() 拷贝出来的数组
      array = Array.generateRandomArray(SIZE, MIN, MAX)
    })

    it('01-Selection-Sort', () => {
      sorted = array.selectSort((a, b) => a < b)
    })

    it('02-Insertion-Sort', () => {
      sorted = array.insertSort((a, b) => a < b)
    })

    it('03-Insertion-Sort-Enhance', () => {
      sorted = array.insertSortEnhance((a, b) => a < b)
    })

    it('04-Bubble-Sort', () => {
      sorted = array.bubbleSort((a, b) => a < b)
    })

    it('05-Bubble-Sort-Origin', () => {
      sorted = array.bubbleSortOrigin((a, b) => a < b)
    })

    it('06-Bubble-Sort-Enhance', () => {
      sorted = array.bubbleSortEnhance((a, b) => a < b)
    })

    it('07-Shell-Sort', () => {
      sorted = array.shellSort((a, b) => a < b)
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 2 测试近乎有序的数组
  describe('With nearly ordered array', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = Array.generateNearlyOrderedArray(SIZE, SWAP_TIMES)
    })

    it('01-Selection-Sort', () => {
      sorted = array.selectSort((a, b) => a < b)
    })

    it('02-Insertion-Sort', () => {
      sorted = array.insertSort((a, b) => a < b)
    })

    it('03-Insertion-Sort-Enhance', () => {
      sorted = array.insertSortEnhance((a, b) => a < b)
    })

    it('04-Bubble-Sort', () => {
      sorted = array.bubbleSort((a, b) => a < b)
    })

    it('05-Bubble-Sort-Origin', () => {
      sorted = array.bubbleSortOrigin((a, b) => a < b)
    })

    it('06-Bubble-Sort-Enhance', () => {
      sorted = array.bubbleSortEnhance((a, b) => a < b)
    })

    it('07-Shell-Sort', () => {
      sorted = array.shellSort((a, b) => a < b)
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 3 测试完全有序的数组
  describe('With ordered array', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = Array.generateNearlyOrderedArray(SIZE, 0)
    })

    it('01-Selection-Sort', () => {
      sorted = array.selectSort((a, b) => a < b)
    })

    it('02-Insertion-Sort', () => {
      sorted = array.insertSort((a, b) => a < b)
    })

    it('03-Insertion-Sort-Enhance', () => {
      sorted = array.insertSortEnhance((a, b) => a < b)
    })

    it('04-Bubble-Sort', () => {
      sorted = array.bubbleSort((a, b) => a < b)
    })

    it('05-Bubble-Sort-Origin', () => {
      sorted = array.bubbleSortOrigin((a, b) => a < b)
    })

    it('06-Bubble-Sort-Enhance', () => {
      sorted = array.bubbleSortEnhance((a, b) => a < b)
    })

    it('07-Shell-Sort', () => {
      sorted = array.shellSort((a, b) => a < b)
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })
})
