const assert = require('assert')
const { BinarySearchTree } = require('./02-Binary-Search-Tree-Basics')
const { maximum, minimum } = require('./07-Binary-Search-Tree-Remove-Min-and-Max')

/**
 * 在以 node 为根的二叉搜索树中, 寻找 key 的祖先中, 比 key 小的最大值所在节点, 递归算法
 * 算法调用前已保证 key 存在在以 node 为根的二叉树中
 *
 * @param {Node} node 带查找的二分搜索树的根
 * @param {*} key 待查找的键值
 * @return {Node|null} 找到的节点
 */
function predecessorFromAncestor (node, key) {
  if (node.key === key) {
    return null
  }
  if (key < node.key) {
    // 如果当前节点大于 key, 则当前节点不可能是比 key 小的最大值
    // 向下搜索到的结果直接返回
    return predecessorFromAncestor(node.left, key)
  } else {
    assert(key > node.key)
    // 如果当前节点小于 key, 则当前节点有可能是比 key 小的最大值
    // 向右继续搜索, 将结果存储到 tmpNode 中
    const tmpNode = predecessorFromAncestor(node.right, key)
    if (tmpNode !== null) {
      return tmpNode
    }
    // 如果 tmpNode 为空, 则当前节点即为结果
    return node
  }
}

/**
 * 查找 key 的前驱
 * 如果不存在 key 的前驱 (key 不存在, 或者 key 是整棵二叉树中的最小值), 则返回 null
 *
 * @param {*} key 待查找的键值
 * @return {Node|null} 找到的节点
 */
BinarySearchTree.prototype.predecessor = function predecessor (key) {
  const node = this.search(key)
  // 如果 key 所在的节点不存在, 则 key 没有前驱, 返回 null
  if (node === null) {
    return null
  }
  // 如果 key 所在的节点左子树不为空, 则其左子树的最大值为 key 的前驱
  if (node.left !== null) {
    return maximum(node.left)
  }
  // 否则, key 的前驱在从根节点到 key 的路径上, 在这个路径上寻找到比 key 小的最大值, 即为 key 的前驱
  const preNode = predecessorFromAncestor(this._root, key)
  if (preNode === null) {
    return null
  }
  return preNode
}

/**
 * 在以 node 为根的二叉搜索树中, 寻找 key 的祖先中, 比 key 大的最小值所在节点, 递归算法
 * 算法调用前已保证 key 存在在以 node 为根的二叉树中
 *
 * @param {Node} node 带查找的二分搜索树的根
 * @param {*} key 待查找的键值
 * @return {Node|null} 找到的节点
 */
function successorFromAncestor (node, key) {
  if (node.key === key) {
    return null
  }
  if (key > node.key) {
    // 如果当前节点小于 key, 则当前节点不可能是比 key 大的最小值
    // 向下搜索到的结果直接返回
    return successorFromAncestor(node.left, key)
  } else {
    assert(key < node.key)
    // 如果当前节点大于 key, 则当前节点有可能是比 key 大的最小值
    // 向左继续搜索, 将结果存储到 tmpNode 中
    const tmpNode = successorFromAncestor(node.left, key)
    if (tmpNode !== null) {
      return tmpNode
    }
    // 如果 tmpNode 为空, 则当前节点即为结果
    return node
  }
}

/**
 * 查找 key 的后继, 递归算法
 * 如果不存在 key 的后继 (key 不存在, 或者 key 是整棵二叉树中的最大值), 则返回 null
 *
 * @param {*} key 待查找的键值
 * @return {Node|null} 找到的节点
 */
BinarySearchTree.prototype.successor = function successor (key) {
  const node = this.search(key)
  // 如果 key 所在的节点不存在, 则 key 没有后继, 返回 null
  if (node === null) {
    return null
  }
  // 如果 key 所在的节点右子树不为空, 则其右子树的最小值为 key 的后继
  if (node.left !== null) {
    return minimum(node.left)
  }
  // 否则, key 的后继在从根节点到 key 的路径上, 在这个路径上寻找到比 key 小的最小值, 即为 key 的后继
  const sucNode = successorFromAncestor(this._root, key)
  if (sucNode === null) {
    return null
  }
  return sucNode
}
