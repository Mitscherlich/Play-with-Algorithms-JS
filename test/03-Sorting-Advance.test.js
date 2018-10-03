const assert = require('assert')
const {
  describe,
  beforeEach,
  it,
  afterEach
} = require('mocha')
const { mergeSort } = require('../src/03-Sorting-Advance/02-Merge-Sort')
const { mergeSortEnhance } = require('../src/03-Sorting-Advance/03-Merge-Sort-Enhance')
const { mergeSortReverse, mergeSortReverseEnhance } = require('../src/03-Sorting-Advance/04-Merge-Sort-Bottom-Up')
const { quickSort, quickSortEnhance } = require('../src/03-Sorting-Advance/05-Quick-Sort')
const { quickSortWithNOA } = require('../src/03-Sorting-Advance/06-Quick-Sort-Deal-With-Nearly-Ordered-Array')
const { quickSortWithIK } = require('../src/03-Sorting-Advance/07-Quick-Sort-Deal-With-Identical-Keys')
const { quickSort3Ways } = require('../src/03-Sorting-Advance/08-Quick-Sort-Three-Ways')
const {
  SIZE, MIN, MAX, SWAP_TIMES,
  generateRandomArray,
  generateNearlyOrderedArray,
  isSorted
} = require('./utils')

describe('03-Sorting-Advance', () => {
  // 测试 1 一般性测试
  describe('With random array', () => {
    let array
    let sorted

    beforeEach(() => {
      // 清空已排序的数组
      sorted = []
      // 原数组不直接作为参数，参数使用 slice() 拷贝出来的数组
      array = generateRandomArray(SIZE * 100, MIN, MAX)
    })

    it('02-Merge-Sort', () => {
      sorted = mergeSort(array.slice(), (a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = mergeSortEnhance(array.slice(), (a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = mergeSortReverse(array.slice(), (a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = mergeSortReverseEnhance(array.slice(), (a, b) => a < b)
    })

    it('05-Quick-Sort', () => {
      sorted = quickSort(array.slice(), (a, b) => a < b)
    })

    it('0501-Quick-Sort', () => {
      sorted = quickSortEnhance(array.slice(), (a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = quickSortWithIK(array.slice(), (a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = quickSort3Ways(array.slice(), (a, b) => a < b)
    })

    afterEach(() => {
      assert(isSorted(sorted, (a, b) => a > b), 'Not in order!')
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
      array = generateNearlyOrderedArray(SIZE * 100, SWAP_TIMES)
    })

    it('02-Merge-Sort', () => {
      sorted = mergeSort(array.slice(), (a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = mergeSortEnhance(array.slice(), (a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = mergeSortReverse(array.slice(), (a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = mergeSortReverseEnhance(array.slice(), (a, b) => a < b)
    })

    it('06-Quick-Sort-Deal-With-Nearly-Ordered-Array', () => {
      sorted = quickSortWithNOA(array.slice(), (a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = quickSortWithIK(array.slice(), (a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = quickSort3Ways(array.slice(), (a, b) => a < b)
    })

    afterEach(() => {
      assert(isSorted(sorted, (a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 3 测试完全有序的数组
  describe('With ordered array', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = generateNearlyOrderedArray(SIZE * 100, 0)
    })

    it('02-Merge-Sort', () => {
      sorted = mergeSort(array.slice(), (a, b) => a < b)
    })

    it('03-Merge-Sort-Enhance', () => {
      sorted = mergeSortEnhance(array.slice(), (a, b) => a < b)
    })

    it('04-Merge-Sort-Bottom-Up', () => {
      sorted = mergeSortReverse(array.slice(), (a, b) => a < b)
    })

    it('0401-Merge-Sort-Bottom-Up-Enhance', () => {
      sorted = mergeSortReverseEnhance(array.slice(), (a, b) => a < b)
    })

    it('06-Quick-Sort-Deal-With-Nearly-Ordered-Array', () => {
      sorted = quickSortWithNOA(array.slice(), (a, b) => a < b)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = quickSortWithIK(array.slice(), (a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = quickSort3Ways(array.slice(), (a, b) => a < b)
    })

    afterEach(() => {
      assert(isSorted(sorted, (a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 4 测试有大量重复键值的数组
  describe('With random array, random range [0, 10]', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = generateRandomArray(SIZE * 100, 0, 10)
    })

    it('07-Quick-Sort-Deal-With-Identical-Keys', () => {
      sorted = quickSortWithIK(array.slice(), (a, b) => a < b)
    })

    it('08-Quick-Sort-Three-Ways', () => {
      sorted = quickSort3Ways(array.slice(), (a, b) => a < b)
    })

    afterEach(() => {
      assert(isSorted(sorted, (a, b) => a > b), 'Not in order!')
    })
  })
})
