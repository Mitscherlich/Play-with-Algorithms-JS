exports.shiftUp = (data, k) => {
  while (k > 1 && data[Math.floor(k / 2)] < data[k]) {
    // swap(data[k/2], data[k])
    [data[Math.floor(k / 2)], data[k]] = [data[k], data[Math.floor(k / 2)]]
    k = Math.floor(k /= 2)
  }
}

exports.shiftUpEnhance = (data, k) => {
  const e = data[k]
  while (k > 1 && data[Math.floor(k / 2)] < e) {
    // swap(data[k/2], data[k])
    data[k] = data[Math.floor(k / 2)]
    k = Math.floor(k /= 2)
  }
  data[k] = e
}
