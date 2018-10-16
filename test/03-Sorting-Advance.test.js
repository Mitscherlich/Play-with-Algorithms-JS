const assert = require('assert')
const {
  describe,
  beforeEach,
  it,
  afterEach
} = require('mocha')
require('../src/03-Sorting-Advance/02-Merge-Sort')
require('../src/03-Sorting-Advance/03-Merge-Sort-Enhance')
require('../src/03-Sorting-Advance/04-Merge-Sort-Bottom-Up')
require('../src/03-Sorting-Advance/05-Quick-Sort')
require('../src/03-Sorting-Advance/06-Quick-Sort-Deal-With-Nearly-Ordered-Array')
require('../src/03-Sorting-Advance/07-Quick-Sort-Deal-With-Identical-Keys')
require('../src/03-Sorting-Advance/08-Quick-Sort-Three-Ways')
const { SIZE, MIN, MAX, SWAP_TIMES } = require('./utils')

describe('03-Sorting-Advance', () => {
  // 测试 1 一般性测试
  describe('With random array', () => {
    let array
    let sorted

    beforeEach(() => {
      // 清空已排序的数组
      sorted = []
      // 原数组不直接作为参数，参数使用 slice() 拷贝出来的数组
      array = Array.generateRandomArray(SIZE * 100, MIN, MAX)
    })

    it('02-Merge-Sort', () => {
      sorted = array.mergeSort((a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = array.mergeSortEnhance((a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = array.mergeSortReverse((a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = array.mergeSortReverseEnhance((a, b) => a < b)
    })

    it('05-Quick-Sort', () => {
      sorted = array.quickSort((a, b) => a < b)
    })

    it('0501-Quick-Sort', () => {
      sorted = array.quickSortEnhance((a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = array.quickSortWithIK((a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = array.quickSort3Ways((a, b) => a < b)
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
      // 清空已排序的数组
      sorted = []
      // 原数组不直接作为参数，参数使用 slice() 拷贝出来的数组
      array = Array.generateNearlyOrderedArray(SIZE * 100, SWAP_TIMES)
    })

    it('02-Merge-Sort', () => {
      sorted = array.mergeSort((a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = array.mergeSortEnhance((a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = array.mergeSortReverse((a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = array.mergeSortReverseEnhance((a, b) => a < b)
    })

    it('06-Quick-Sort-Deal-With-Nearly-Ordered-Array', () => {
      sorted = array.quickSortWithNOA((a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = array.quickSortWithIK((a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = array.quickSort3Ways((a, b) => a < b)
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
      array = Array.generateNearlyOrderedArray(SIZE * 100, 0)
    })

    it('02-Merge-Sort', () => {
      sorted = array.mergeSort((a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = array.mergeSortEnhance((a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = array.mergeSortReverse((a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = array.mergeSortReverseEnhance((a, b) => a < b)
    })

    it('06-Quick-Sort-Deal-With-Nearly-Ordered-Array', () => {
      sorted = array.quickSortWithNOA((a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = array.quickSortWithIK((a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = array.quickSort3Ways((a, b) => a < b)
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 4 测试有大量重复键值的数组
  describe('With random array, random range [0, 10]', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = Array.generateRandomArray(SIZE * 100, 0, 10)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = array.quickSortWithIK((a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = array.quickSort3Ways((a, b) => a < b)
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })
})
