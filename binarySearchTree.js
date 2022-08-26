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

    let mid = parseInt((start + end) / 2)
    const node = new Node(arr[mid])

    node.left = this.buildTree(arr, start, mid - 1)
    node.right = this.buildTree(arr, mid + 1, end)
    return node
  }

  insert(data) {
    const node = new Node(data)
    let current = this.root

    if (current === null) current = node

    while (true) {
      if (data === current.data) return
      if (data < current.data) {
        if (current.left === null) {
          current.left = node
          break
        } else {
          current = current.left
        }
      } else {
        if (current.right === null) {
          current.right = node
          break
        } else {
          current = current.right
        }
      }
    }
    return this
  }

  find(data) {
    let current = this.root

    while (current) {
      if (data === current.data) return current
      if (data < current.data) {
        current = current.left
      } else current = current.right
    }
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
tree.insert(59)
console.log(tree.find(400))
prettyPrint(tree.root)
console.log(tree)
