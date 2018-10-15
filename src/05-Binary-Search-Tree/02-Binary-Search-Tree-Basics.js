exports.Node = class Node {
  constructor (k, v) {
    this.key = k
    this.value = v
    this.left = null
    this.right = null
  }
}

const { insert } = require('./03-Binary-Search-Tree-Insert')
const { contain, search } = require('./04-Binary-Search-Tree-Search')

exports.BinarySearchTree = class BinarySearchTree {
  constructor () {
    this.root = null
    this.count = 0
  }
  // 返回二分搜索树的节点个数
  size () { return this.count }
  // 返回二分搜索树是否为空
  isEmpty () { return this.count === 0 }
  // 向二分搜索树中插入一个新的(k, v)数据对
  insert (k, v) {
    this.root = insert(this.root, k, v)
    this.count++
  }
  contain (k) {
    return contain(this.root, k)
  }
  search (k) {
    return search(this.root, k)
  }
}
