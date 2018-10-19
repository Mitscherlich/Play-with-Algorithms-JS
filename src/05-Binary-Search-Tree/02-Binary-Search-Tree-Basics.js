const assert = require('assert')

/**
 * @class 二分搜索树的节点
 * @member {*} key 节点的键
 * @member {*} value 节点的值
 */
class Node {
  constructor (k, v) {
    if (k instanceof Node) {
      // 如果第一个参数是一个 Node 则拷贝一份
      this.key = k.key
      this.value = k.value
      this.left = k.left
      this.right = k.right
    } else {
      // 否则初始化一个新的节点
      this.key = k
      this.value = v
      this.left = null
      this.right = null
    }
  }
}

exports.Node = Node

const { insert } = require('./03-Binary-Search-Tree-Insert')
const { contain, search } = require('./04-Binary-Search-Tree-Search')
const { preOrderTraverse, inOrderTraverse, postOrderTravse } = require('./05-Binary-Search-Tree-Traverse')
const { minimum, maximum } = require('./07-Binary-Search-Tree-Remove-Min-and-Max')

/**
 * @class 二分搜索树
 * @member {Node} _root 二分搜索树的根
 * @member {Number} _count 树中元素的个数
 */
class BinarySearchTree {
  /**
   * 构造函数
   */
  constructor () {
    this._root = null
    this._count = 0
  }
  /**
   * 返回二分搜索树的节点个数
   * @return {Number} 节点个数
   */
  size () { return this._count }
  /**
   * 返回二分搜索树是否为空
   * @return {Boolean} 是否为空
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
   * @return {Boolean} 是否找到待查找的键
   */
  contain (k) {
    return contain(this._root, k)
  }
  /**
   * 查询操作: 返回找到的键所对应的值
   * @param {*} k 待查找的节点键
   * @returns {Node|null} 待查找的键所对应的值，找不到则返回 null
   */
  search (k) {
    return search(this._root, k)
  }
  /**
   * 前序遍历
   * @param {Function} cb 遍历时的回调函数
   */
  preOrderTraverse (cb) {
    preOrderTraverse(this._root, cb)
  }
  /**
   * 中序遍历
   * @param {Function} cb 遍历时的回调函数
   */
  inOrderTraverse (cb) {
    inOrderTraverse(this._root, cb)
  }
  /**
   * 后序遍历
   * @param {Function} cb 遍历时的回调函数
   */
  postOrderTravse (cb) {
    postOrderTravse(this._root, cb)
  }
  /**
   * 层序遍历
   * @param {Function} cb 遍历时的回调函数
   */
  levelOrderTravse (cb) {
    const queue = [ this._root ]
    while (queue.length > 0) {
      const node = queue.shift()
      cb(node)
      if (node.left !== null) {
        queue.push(node.left)
      }
      if (node.right !== null) {
        queue.push(node.right)
      }
    }
  }
  /**
   * 寻找最小的键值
   * @returns {Node} 最小值节点
   */
  min () {
    assert(this._count !== 0, 'Tree is empty!')
    return minimum(this._root)
  }
  /**
   * 寻找最大的键值
   * @returns {Node} 最大值节点
   */
  max () {
    assert(this._count !== 0, 'Tree is empty!')
    return maximum(this._root)
  }
  /**
   * 从二分搜索树中删除最小值所在的节点
   */
  removeMin () {
    if (this._root) {
      this._root = this._removeMin(this._root)
    }
  }
  /**
   * 从二分搜索树中删除最大值所在的节点
   */
  removeMax () {
    if (this._root) {
      this._root = this._removeMax(this._root)
    }
  }
  /**
   * 删除任意元素
   * @param {*} k 待删除的键值
   */
  remove (k) {
    this._root = this._remove(this._root, k)
  }
  /**
   * 删除掉以 node 为根的二分搜索树中的最小节点
   * @param {Node} node 待搜索二分搜索树的根节点
   * @return {Node|null} 新的二分搜索树的根
   */
  _removeMin (node) {
    if (node.left === null) {
      this._count -= 1
      return node.right
    }
    node.left = this._removeMin(node.left)
    return node
  }
  /**
   * 删除掉以 node 为根的二分搜索树中的最大节点
   * @param {Node} node 待搜索二分搜索树的根节点
   * @return {Node|null} 新的二分搜索树的根
   */
  _removeMax (node) {
    if (node.right === null) {
      this._count -= 1
      return node.left
    }
    node.right = this._removeMax(node.right)
    return node
  }
  /**
   * 删除掉以 node 为根的二分搜索树中间键值为 key 的节点
   * @param {Node} node 以 node 为根的二分搜索树
   * @param {*} key 待删除的键值
   * @return {Node} 返回删除节点后新的二分搜索树的根
   */
  _remove (node, key) {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = this._remove(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._remove(node.right, key)
      return node
    } else { // k == node.key
      if (node.left === null) {
        this._count -= 1
        return node.right
      }
      if (node.right === null) {
        this._count -= 1
        return node.left
      }
      // node.left !== null && node.right !== null
      const successor = new Node(minimum(node.right))
      this._count += 1 // 此时还未删除 node

      successor.right = this._removeMin(node.right)
      successor.left = node.left

      // delete node
      this._count -= 1 // 此时已经移除了 node

      return successor
    }
  }
}

// 对外暴露两个 class
module.exports = { Node, BinarySearchTree }
