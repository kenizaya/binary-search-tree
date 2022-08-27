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

  delete(data) {
    this.deleteRec(this.root, data)
  }

  deleteRec(root, data) {
    if (root === null) return root

    if (data < root.data) {
      root.left = this.deleteRec(root.left, data)
    } else if (data > root.data) {
      root.right = this.deleteRec(root.right, data)
    } else {
      if (root.left === null) return root.right
      else if (root.right === null) return root.left

      root.data = this.minValue(root.right)
      root.right = this.deleteRec(root.right, root.data)
    }

    return root
  }

  minValue(root) {
    while (root.left !== null) {
      root = root.left
    }
    return root.data
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

  levelOrder(fun) {
    let current = this.root
    if (current === null) return

    const discoveredNodes = []
    const visitedNodes = []
    discoveredNodes.push(current)
    while (discoveredNodes.length) {
      current = discoveredNodes.shift()
      if (current.left !== null) discoveredNodes.push(current.left)
      if (current.right !== null) discoveredNodes.push(current.right)
      visitedNodes.push(current)
    }
    if (typeof fun !== 'function') return visitedNodes.map((node) => node.data)
    else visitedNodes.forEach((node) => fun(node))
  }

  inorder(fun) {
    const visited = []

    const traverse = (root) => {
      if (root === null) return
      traverse(root.left)
      if (typeof fun !== 'function') visited.push(root.data)
      else fun(root)
      traverse(root.right)
    }

    traverse(this.root)
    return visited
  }

  preorder(fun) {
    const visited = []

    const traverse = (root) => {
      if (root === null) return
      if (typeof fun !== 'function') visited.push(root.data)
      else fun(root)
      traverse(root.left)
      traverse(root.right)
    }

    traverse(this.root)
    return visited
  }

  postorder(fun) {
    const visited = []

    const traverse = (root) => {
      if (root === null) return
      traverse(root.left)
      traverse(root.right)
      if (typeof fun !== 'function') visited.push(root.data)
      else fun(root)
    }

    traverse(this.root)
    return visited
  }

  height(node) {
    if (node === null) return -1
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)

    return Math.max(leftHeight, rightHeight) + 1
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

const tree = new Tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 40, 50, 60, 70, 80, 90, 100,
])
tree.insert(59)
console.log(tree.find(400))
tree.delete(40)
prettyPrint(tree.root)
console.log(tree.inorder())
console.log(tree.height(tree.root.left.right))
// console.log(tree.levelOrder((a) => console.log(a.data)))
