const assert = require('assert')
const debug = require('debug')('AlgoTester:Heap')
const {
  describe,
  beforeEach,
  it,
  afterEach
} = require('mocha')
const { PrintableMaxHeap } = require('../src/04-Heap/02-Max-Heap-Class-Basic')
const { heapSort1, heapSort2 } = require('../src/04-Heap/05-Heapify')
const { heapSort, heapSortEnhance } = require('../src/04-Heap/06-Heap-Sort')
const { IndexMaxHeap } = require('../src/04-Heap/08-Index-Heap')
const { SIZE, MIN, MAX, SWAP_TIMES } = require('./utils')

describe('04-Heap', () => {
  it('04-Shift-Down', () => {
    const maxHeap = new PrintableMaxHeap(100)
    for (let i = 0; i < 50; i++) {
      maxHeap.insert(Math.floor(Math.random() * 100))
    }
    console.log(maxHeap.toString())
    let sorted = []
    let str = ''
    for (let i = 0; i < 50; i++) {
      const e = maxHeap.extractMax()
      sorted.unshift(e)
      str += e + ' '
    }
    debug(`[${str}]`)
    assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
  })

  it('08-Index-Heap', () => {
    const maxHeap = new IndexMaxHeap(100)
    for (let i = 0; i < 50; i++) {
      maxHeap.insert(Math.floor(Math.random() * 100))
    }
    let sorted = []
    let str = ''
    for (let i = 0; i < 50; i++) {
      const e = maxHeap.extractMax()
      sorted.unshift(e)
      str += e + ' '
    }
    debug(`[${str}]`)
    assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
  })

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

    it('05-Heapify heapSort1', () => {
      sorted = heapSort1(array.slice())
    })

    it('05-Heapify heapSort2', () => {
      sorted = heapSort2(array.slice())
    })

    it('06-Heap-Sort', () => {
      sorted = heapSort(array.slice())
    })

    it('0601-Heap-Sort-Enhance', () => {
      sorted = heapSortEnhance(array.slice())
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
      // 原数组不直接作为参数，参数使用 slice() 拷贝出来的
      array = Array.generateNearlyOrderedArray(SIZE * 100, SWAP_TIMES)
    })

    it('05-Heapify heapSort1', () => {
      sorted = heapSort1(array.slice())
    })

    it('05-Heapify heapSort2', () => {
      sorted = heapSort2(array.slice())
    })

    it('06-Heap-Sort', () => {
      sorted = heapSort(array.slice())
    })

    it('0601-Heap-Sort-Enhance', () => {
      sorted = heapSortEnhance(array.slice())
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })

  // 测试 3 测试有大量重复键值的数组
  describe('With ordered array', () => {
    let array
    let sorted

    beforeEach(() => {
      sorted = []
      array = Array.generateRandomArray(SIZE * 100, 0, 10)
    })

    it('05-Heapify heapSort1', () => {
      sorted = heapSort1(array.slice())
    })

    it('05-Heapify heapSort2', () => {
      sorted = heapSort2(array.slice())
    })

    it('06-Heap-Sort', () => {
      sorted = heapSort(array.slice())
    })

    it('0601-Heap-Sort-Enhance', () => {
      sorted = heapSortEnhance(array.slice())
    })

    afterEach(() => {
      assert(sorted.isSorted((a, b) => a > b), 'Not in order!')
    })
  })
})
