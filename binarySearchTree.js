class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(this.sortAndRemoveDup(arr))
  }

  sortAndRemoveDup(arr) {
    return [...new Set(arr)].sort((a, b) => a - b)
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null

    console.log(arr)
    let mid = parseInt((start + end) / 2)
    console.log(
      'start =',
      start,
      'mid =',
      mid,
      'end =',
      end,
      'value =',
      arr[mid]
    )
    const node = new Node(arr[mid])

    node.left = this.buildTree(arr, start, mid - 1)
    node.right = this.buildTree(arr, mid + 1, end)
    return node
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

prettyPrint(tree.root)
console.log(tree)
