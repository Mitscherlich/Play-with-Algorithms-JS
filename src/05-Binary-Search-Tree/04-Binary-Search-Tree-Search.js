exports.contain = function contain (node, k) {
  if (node === null) {
    return false
  }
  if (k === node.key) {
    return true
  } else if (k < node.key) {
    return contain(node.left, k)
  } else {
    return contain(node.right, k)
  }
}

exports.search = function search (node, k) {
  if (node === null) {
    return null
  }
  if (k === node.key) {
    return node.value
  } else if (k < node.key) {
    return search(node.left, k)
  } else {
    return search(node.right, k)
  }
}
