const assert = require('assert')
const {
  after,
  before,
  beforeEach,
  describe,
  it
} = require('mocha')
const { binarySearch1, binarySearch2 } = require('../src/05-Binary-Search-Tree/01-Binary-Search')
const { SIZE, generateNearlyOrderedArray } = require('./utils')
const { BinarySearchTree } = require('../src/05-Binary-Search-Tree/02-Binary-Search-Tree-Basics')
const { SequenceSearchTable } = require('../src/05-Binary-Search-Tree/Opt-Sequence-Search-Table')
const fs = require('fs')
const path = require('path')

const FILE_NAME = path.resolve(__dirname, './vendors/bible.txt')

describe('05-Binary-Search-Tree', () => {
  let array

  beforeEach(() => {
    array = generateNearlyOrderedArray(SIZE * 100, 0)
  })

  it('01-Binary-Search without recursion', () => {
    const target = Math.floor(Math.random() * SIZE * 100)
    const index = binarySearch1(array.slice(), target)
    assert.strictEqual(index, target)
  })

  it('01-Binary-Search with recursion', () => {
    const target = Math.floor(Math.random() * SIZE * 100)
    const index = binarySearch2(array.slice(), target)
    assert.strictEqual(index, target)
  })

  describe('Statistical word frequency', () => {
    let words

    before(done => {
      words = fs.readFile(FILE_NAME, (err, data) => {
        if (err) throw err
        words = data.toString().toLowerCase().split(/[ \f\n\r\t\v]|\.|,|:/)
        console.log(`There are totally ${words.length} words in 'bible.txt'`)
        done()
      })
    })

    describe('04-Binary-Search-Tree-Search', () => {
      let bst

      before(() => {
        bst = new BinarySearchTree()
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

      after(() => {
        if (bst.contain('god')) {
          console.log(`'god' apper ${bst.search('god').count} in 'bible.txt'`)
        } else {
          console.log('There is no \'god\' in \'bible.txt\'')
        }
      })
    })

    describe('with Sequence Table', () => {
      let sst

      before(() => {
        sst = new SequenceSearchTable()
      })

      // 统计圣经中所有词的词频
      // 注: 这个词频统计法相对简陋, 没有考虑很多文本处理中的特殊问题
      // 在这里只做性能测试用
      it('with Binary Search Tree', () => {
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
        if (sst.contain('god')) {
          console.log(`'god' apper ${sst.search('god').count} in 'bible.txt'`)
        } else {
          console.log('There is no \'god\' in \'bible.txt\'')
        }
      })
    })
  })
})
