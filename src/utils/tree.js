/**
 * 递归函数
 * @param arr 数组
 * @param pid 父ID，不传默认为0
 */
export const tranListToTreeData = (arr, pid = 0) => {
  let newArr = []
  //循环数组
  arr.forEach((item, i) => {
    //判断pid与遍历元素中pid相同的数据，相等的为同级数据，追加到该级数组中
    if (item.parentId == pid) {
      newArr.push(item)
      /**
       * 判断该item元素是否有子项
       * 当数组中有元素的pid与item.id相等，some函数会返回true，表示该元素有子项数据
       */
      if (arr.some((ele) => ele.parentId == item.id)) {
        //此时，通过重新调用本函数进行递归处理
        item['children'] = tranListToTreeData(arr, item.id)
      }
    }
  })
  return newArr
}

/**
 * 默认展示
 */
export const defaultProps = {
  children: 'children',
  label: 'name'
}
