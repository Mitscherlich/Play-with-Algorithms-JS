const { BinarySearchTree } = require('./02-Binary-Search-Tree-Basics')

/**
 * 在以 node 为根的二叉搜索树中, 寻找 key 的 floor 值所处的节点, 递归算法
 * @param {Node} node 待查找的二分搜索树的根
 * @param {*} target 待查找的键值
 * @return {Node|null} 找到的节点
 */
function floor (node, target) {
  if (node === null) {
    return null
  }
  // 如果 node 的 key 值和要寻找的 key 值相等
  // 则 node 本身就是 key 的 floor 节点
  if (node.key === target) {
    return node
  }
  // 如果 node 的 key 值比要寻找的 key 值大
  // 则要寻找的 key 的 floor 节点一定在 node 的左子树中
  if (node.key > target) {
    return floor(node.left, target)
  }
  // 如果 node 的 key 值比要寻找的 key 值小
  // 则 node 有可能是 key 的 floor 节点, 也有可能不是(存在比 node.key 大但是小于 key 的其余节点)
  // 需要尝试向 node 的右子树寻找一下
  const tmpNode = floor(node.right, target)
  if (tmpNode !== node) {
    return tmpNode
  }
  return node
}

/**
 * 寻找 key 的 floor 值, 递归算法
 * 如果不存在 key 的 floor 值 (key 比 BST 中的最小值还小), 返回 null
 *
 * @param {*} key 待查找的键值
 * @return {Node|null} 节点
 */
BinarySearchTree.prototype.floor = function (key) {
  if (this._count === 0 || key < this.min()) {
    return null
  }
  return floor(this._root, key)
}

/**
 * 在以 node 为根的二叉搜索树中, 寻找 key 的 ceil 值所处的节点, 递归算法
 * @param {Node} node 待查找的二分搜索树的根
 * @param {*} target 待查找的键值
 * @return {Node|null} 找到的节点
 */
function ceil (node, target) {
  if (node === null) {
    return null
  }
  // 如果 node 的 key 值和要寻找的 key 值相等
  // 则 node 本身就是 key 的 ceil 节点
  if (node.key === target) {
    return node
  }
  // 如果 node 的 key 值比要寻找的 key 值小
  // 则要寻找的 key 的 ceil 节点一定在 node 的右子树中
  if (node.key < target) {
    return ceil(node.right, target)
  }
  // 如果 node 的 key 值比要寻找的 key 值大
  // 则 node 有可能是 key 的 ceil 节点, 也有可能不是(存在比 node.key 小但是大于 key 的其余节点)
  // 需要尝试向 node 的左子树寻找一下
  const tmpNode = ceil(node.left, target)
  if (tmpNode !== node) {
    return tmpNode
  }
  return node
}

/**
 * 寻找 key 的 ceil 值, 递归算法
 * 如果不存在 key 的 ceil 值 (key 比 BST 中的最大值还大), 返回 null
 *
 * @param {*} key 待查找的键值
 * @return {Node|null} 节点
 */
BinarySearchTree.prototype.floor = function (key) {
  if (this._count === 0 || key > this.max()) {
    return null
  }
  return ceil(this._root, key)
}
