const { Node } = require('./02-Binary-Search-Tree-Basics')

// 向以 node 为根的二分搜索树中, 插入节点 (k, v), 使用递归算法
// 返回插入新节点后的二分搜索树的根
exports.insert = function insert (node, k, v) {
  if (node === null) {
    return new Node(k, v)
  }
  if (k === node.key) {
    node.value = v
  } else if (k < node.key) {
    node.left = insert(node.left, k, v)
  } else {
    node.right = insert(node.right, k, v)
  }
  return node
}
