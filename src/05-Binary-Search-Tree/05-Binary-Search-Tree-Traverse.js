const assert = require('assert')

/**
 * 对以 node 为根的二叉搜索树进行前序遍历
 * @param {Node} node 待遍历的二叉树的根
 * @param {Function} cb 遍历时的回调函数
 */
exports.preOrderTravse = function preOrderTravse (node, cb) {
  assert(typeof cb === 'function', `'cb' should be a 'function' but got a '${typeof cb}'`)
  if (node !== null) {
    cb(node)
    preOrderTravse(node.left, cb)
    preOrderTravse(node.right, cb)
  }
}

/**
 * 对以 node 为根的二叉搜索树进行中序遍历
 * @param {Node} node 待遍历的二叉树的根
 * @param {Function} cb 遍历时的回调函数
 */
exports.inOrderTravse = function inOrderTravse (node, cb) {
  if (node !== null) {
    inOrderTravse(node.left, cb)
    cb(node)
    inOrderTravse(node.right, cb)
  }
}

/**
 * 对以 node 为根的二叉搜索树进行后序遍历
 * @param {Node} node 待遍历的二叉树的根
 * @param {Function} cb 遍历时的回调函数
 */
exports.postOrderTravse = function postOrderTravse (node, cb) {
  if (node !== null) {
    postOrderTravse(node.left, cb)
    postOrderTravse(node.right, cb)
    cb(node)
  }
}
