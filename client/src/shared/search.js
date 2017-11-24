// 从数组中筛选含搜索字段的新数组
export default function (array, searchKey) {
  return array.filter(obj => {
    return Object.keys(obj).some(key => {
      return String(obj[key]).toLowerCase().indexOf(searchKey.toLowerCase()) > -1
    })
  })
}
