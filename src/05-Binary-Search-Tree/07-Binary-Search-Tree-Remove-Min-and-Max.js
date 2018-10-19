/**
 * 在以 node 为根的二叉搜索树中返回最小键值的节点
 * @param {Node} node 待搜索二分搜索树的根节点
 * @return {Node} 最小值节点
 */
exports.minimum = function minimum (node) {
  if (node.left === null) {
    return node
  }
  return minimum(node.left)
}

/**
 * 在以 node 为根的二叉搜索树中返回最大键值的节点
 * @param {Node} node 待搜索二分搜索树的根节点
 * @return {Node} 最大值节点
 */
exports.maximum = function maximum (node) {
  if (node.right === null) {
    return node
  }
  return maximum(node.right)
}
