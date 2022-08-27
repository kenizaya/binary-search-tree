const Tree = require('./binarySearchTree')

const createRandomArray = () => {
  return Array.from({ length: Math.floor(Math.random() * 100) + 10 }, () =>
    Math.floor(Math.random() * 200)
  )
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

const tree = new Tree(createRandomArray())
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.preorder())
console.log(tree.postorder())
console.log(tree.inorder())

for (let i = 0; i < 150; i++) {
  tree.insert(Math.floor(Math.random() * 100))
}

console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
console.log(tree.levelOrder())
console.log(tree.preorder())
console.log(tree.postorder())
console.log(tree.inorder())
prettyPrint(tree.root)
