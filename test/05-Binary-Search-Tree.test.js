const assert = require('assert')
const {
  after,
  before,
  beforeEach,
  describe,
  it
} = require('mocha')
require('../src/05-Binary-Search-Tree/01-Binary-Search')
const { SIZE } = require('./utils')
const { BinarySearchTree } = require('../src/05-Binary-Search-Tree/02-Binary-Search-Tree-Basics')
const { SequenceSearchTable } = require('../src/05-Binary-Search-Tree/Opt-Sequence-Search-Table')
const fs = require('fs')
const path = require('path')

const HEAVY_TEST = process.env.HEAVY_TEST || false

describe('05-Binary-Search-Tree', () => {
  let array

  beforeEach(() => {
    array = Array.generateNearlyOrderedArray(SIZE * 100, 0)
  })

  it('01-Binary-Search without recursion', () => {
    const target = Math.floor(Math.random() * SIZE * 100)
    const index = array.binarySearch1(target)
    assert.strictEqual(index, target)
  })

  it('01-Binary-Search with recursion', () => {
    const target = Math.floor(Math.random() * SIZE * 100)
    const index = array.binarySearch2(target)
    assert.strictEqual(index, target)
  })

  describe('Statistical word frequency', () => {
    let words

    before(done => {
      words = fs.readFile(path.resolve(__dirname, './vendors/bible.txt'), (err, data) => {
        if (err) throw err
        words = data.toString().toLowerCase().split(/[ \f\n\r\t\v]|\.|,|:/)
        console.log(`There are totally ${words.length} words in 'bible.txt'`)
        done()
      })
    })

    describe('Count word \'god\' in \'bible.txt\'', () => {
      let bst
      let sst

      before(() => {
        bst = new BinarySearchTree()
        sst = new SequenceSearchTable()
      })

      // 统计圣经中所有词的词频
      // 注: 这个词频统计法相对简陋, 没有考虑很多文本处理中的特殊问题
      // 在这里只做性能测试用
      it('with Binary Search Tree', () => {
        for (const word of words) {
          const res = bst.search(word)
          if (res === null) {
            bst.insert(word, { count: 1 })
          } else {
            res.count += 1
          }
        }
      })

      // 统计圣经中所有词的词频
      // 注: 这个词频统计法相对简陋, 没有考虑很多文本处理中的特殊问题
      // 在这里只做性能测试用
      HEAVY_TEST && it('with Sequence Table', () => {
        for (const word of words) {
          const res = sst.search(word)
          if (res === null) {
            sst.insert(word, { count: 1 })
          } else {
            res.count += 1
          }
        }
      })

      after(() => {
        // binary search tree
        if (bst.contain('god')) {
          console.log(`'god' apper ${bst.search('god').count} in 'bible.txt'`)
        } else {
          console.log('There is no \'god\' in \'bible.txt\'')
        }
        // sequence search table
        if (sst.contain('god')) {
          console.log(`'god' apper ${sst.search('god').count} in 'bible.txt'`)
        } else {
          console.log('There is no \'god\' in \'bible.txt\'')
        }
      })
    })
  })

  describe('Disadvantages of Binary Search Tree', () => {
    let words

    before(done => {
      // 我们使用文本量更小的共产主义宣言进行试验 :)
      words = fs.readFile(path.resolve(__dirname, './vendors/communist.txt'), (err, data) => {
        if (err) throw err
        words = data.toString().toLowerCase().split(/[ \f\n\r\t\v]|\.|,|:/)
        console.log(`There are totally ${words.length} words in 'communist.txt'`)
        done()
      })
    })

    describe('Count word \'unite\' in \'communist.txt\'', () => {
      let bst1
      let bst2
      let sst

      before(() => {
        bst1 = new BinarySearchTree()
        bst2 = new BinarySearchTree()
        sst = new SequenceSearchTable()
      })

      // 测试 1, 我们按照文本原有顺序插入进二分搜索树
      it('with Binary Search Tree', () => {
        for (const word of words) {
          const res = bst1.search(word)
          if (res === null) {
            bst1.insert(word, { count: 1 })
          } else {
            res.count += 1
          }
        }
      })

      // 测试 2, 我们按照文本原有顺序插入顺序查找表
      // 注: 这个词频统计法相对简陋, 没有考虑很多文本处理中的特殊问题
      // 在这里只做性能测试用
      it('with Sequence Table', () => {
        for (const word of words) {
          const res = sst.search(word)
          if (res === null) {
            sst.insert(word, { count: 1 })
          } else {
            res.count += 1
          }
        }
      })

      // 测试 3, 我们将原文本排序后插入二分搜索树, 查看其效率
      // 注: 这个词频统计法相对简陋, 没有考虑很多文本处理中的特殊问题
      // 在这里只做性能测试用
      it('with Binary Search Tree after sort', () => {
        for (const word of words) {
          const res = bst2.search(word)
          if (res === null) {
            bst2.insert(word, { count: 1 })
          } else {
            res.count += 1
          }
        }
      })

      after(() => {
        // binary search tree
        if (bst1.contain('unite')) {
          console.log(`'unite' apper ${bst1.search('unite').count} in 'communist.txt'`)
        } else {
          console.log('There is no \'unite\' in \'communist.txt\'')
        }
        // sequence search table
        if (sst.contain('unite')) {
          console.log(`'unite' apper ${sst.search('unite').count} in 'communist.txt'`)
        } else {
          console.log('There is no \'unite\' in \'communist.txt\'')
        }
        // binary search tree after sort
        if (bst2.contain('unite')) {
          console.log(`'unite' apper ${bst2.search('unite').count} in 'communist.txt'`)
        } else {
          console.log('There is no \'unite\' in \'communist.txt\'')
        }
      })
    })
  })
})
