class Node {
  constructor (k, v) {
    this.key = k
    this.value = v
    this.next = null
  }
}

exports.SequenceSearchTable = class SequenceSearchTable {
  constructor () {
    this.head = null
    this.count = 0
  }
  size () { return this.size }
  isEmpty () { return this.count === 0 }
  insert (k, v) {
    // 查找一下整个顺序表，肯是否存在同样大小的 key
    let node = this.head
    while (node !== null) {
      // 若在顺序表中找到了同样大小 key 的节点
      // 则当前节点不需要插入，将该 key 所对应的值更新为 value 后返回
      if (k === node.key) {
        node.value = v
        return
      }
      node = node.next
    }
    // 若顺序表中没有同样大小的 key，则创建新节点，将新节点直接插在表头
    const newNode = new Node(k, v)
    newNode.next = this.head
    this.head = newNode
    this.count += 1
  }
  // 查看顺序查找表中是否包含键值为 key 的节点
  contain (k) {
    let node = this.head
    while (node != null) {
      if (k === node.key) {
        return true
      }
      node = node.next
    }
    return false
  }
  // 在顺序查找表中查找 key 所对应的 value, 若 value 不存在, 则返回 null
  search (k) {
    let node = this.head
    while (node != null) {
      if (k === node.key) {
        return node.value
      }
      node = node.next
    }
    return null
  }
  // 在顺序查找表中删除 (k,v) 所对应的节点
  remove (k) {
    if (this.head === null) {
      return null
    }
    // 如果待删除的节点就是头结点, 则需要特殊处理
    // 思考: 对于链表, 可以使用什么技术不去特殊处理头结点的特殊情况?
    if (k === this.head.key) {
      const delNode = this.head
      this.head = this.head.next
      this.count -= 1
      return delNode
    }
    let node = this.head
    while (node.next !== null && node.next.key !== k) {
      node = node.next
    }
    if (node.next != null) {
      const delNode = node.next
      node.next = delNode.next
      this.count -= 1
      return delNode
    }
  }
}
