Array.prototype.selectSort = function (cb) {
  const array = this.slice()
  const n = array.length
  for (let i = 0; i < n; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (cb(array[j], array[minIndex])) {
        minIndex = j
      }
    }
    // es6 解构赋值: 需要 node ≥ 6
    [array[i], array[minIndex]] = [array[minIndex], array[i]]
  }
  return array
}
