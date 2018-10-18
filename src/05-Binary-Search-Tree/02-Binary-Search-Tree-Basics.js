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
  /**
   * 构造函数
   */
  constructor () {
    this._root = null
    this._count = 0
  }
  /**
   * 返回二分搜索树的节点个数
   */
  size () { return this._count }
  /**
   * 返回二分搜索树是否为空
   */
  isEmpty () { return this._count === 0 }
  /**
   * 向二分搜索树中插入一个新的(k, v)数据对
   * @param {*} k 带插入的节点的键
   * @param {*} v 带插入的节点的值
   */
  insert (k, v) {
    this._root = insert(this._root, k, v)
    this._count++
  }
  /**
   * 查询操作: 返回是否找到找到的键所对应的值
   * @param {*} k 待查找的节点键
   * @return 是否找到待查找的键
   */
  contain (k) {
    return contain(this._root, k)
  }
  /**
   * 查询操作: 返回找到的键所对应的值
   * @param {*} k 待查找的节点键
   * @returns 待查找的键所对应的值，找不到则返回 null
   */
  search (k) {
    return search(this._root, k)
  }
}
