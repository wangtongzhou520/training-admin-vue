/**
 * 递归函数
 * @param arr 数组
 * @param pid 父ID，不传默认为0
 */
// export const tranListToTreeData = (arr, pid = 0) => {
//   let newArr = []
//   //循环数组
//   arr.forEach((item, i) => {
//     //判断pid与遍历元素中pid相同的数据，相等的为同级数据，追加到该级数组中
//     if (item.parentId == pid) {
//       newArr.push(item)
//       /**
//        * 判断该item元素是否有子项
//        * 当数组中有元素的pid与item.id相等，some函数会返回true，表示该元素有子项数据
//        */
//       if (arr.some((ele) => ele.parentId == item.id)) {
//         //此时，通过重新调用本函数进行递归处理
//         item['children'] = tranListToTreeData(arr, item.id)
//       }
//     }
//   })
//   return newArr
// }

export function tranListToTreeData(list) {
  // 最终要产出的树状数据的数组
  const treeList = []
  // 所有项都使用对象存储起来
  const map = {}

  // 建立一个映射关系：通过id快速找到对应的元素
  list.forEach((item) => {
    if (!item.children) {
      item.children = []
    }
    map[item.id] = item
  })

  list.forEach((item) => {
    // 对于每一个元素来说，先找它的上级
    //    如果能找到，说明它有上级，则要把它添加到上级的children中去
    //    如果找不到，说明它没有上级，直接添加到 treeList
    const parent = map[item.parentId]
    // 如果存在则表示item不是最顶层的数据
    if (parent) {
      parent.children.push(item)
    } else {
      // 如果不存在 则是顶层数据
      treeList.push(item)
    }
  })
  // 返回出去
  return treeList
}

/**
 * 默认展示
 */
export const defaultProps = {
  children: 'children',
  label: 'name'
}
