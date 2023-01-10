export const isFalsy = value => (value === 0 ? false : !value)

export const cleanObject = object => {
  console.log('object:' + object)
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    // 假设 value==0 也会删掉
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
