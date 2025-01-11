/**
 * list convert
 *
 * @param {*} list
 * @returns
 */
export function tranListToTreeData(list) {
  // 最终要产出的树状数据的数组
  const treeList = []
  // 所有项都使用对象存储起来
  const map = {}

  if (list == null || list.length == 0) return []

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
 * List convet tree
 */
export const tranListToTreeData2 = (data, id, parentId, children, rootId) => {
  id = id || 'id'
  parentId = parentId || 'parentId'
  // children = children || 'children'
  rootId =
    rootId ||
    Math.min(
      ...data.map((item) => {
        return item[parentId]
      })
    ) ||
    0
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter((father) => {
    const branchArr = cloneData.filter((child) => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    // 返回第一层
    return father[parentId] === rootId
  })
  return treeData !== '' ? treeData : data
}

/**
 * 默认展示
 */
export const defaultProps = {
  children: 'children',
  label: 'name'
}
