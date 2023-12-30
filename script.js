// eslint-disable-next-line import/extensions
import Tree from "./tree.js";

// const prettyPrint = (node, prefix = "", isLeft = true) => {
//   if (node === null) {
//     return;
//   }
//   if (node.right !== null) {
//     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//   }
//   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//   if (node.left !== null) {
//     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
//   }
// };

const arrayGenerator = function randomNumberArrayGenerator() {
  const array = [];
  for (let i = 0; i < 20; i += 1) array.push(Math.floor(Math.random() * 100));
  return array;
};

const isBalancedLog = function confirmTreeIsBalanced(tree) {
  if (tree.isBalanced()) {
    console.log("The tree is balanced.");
  } else {
    console.log("The tree is unbalanced");
  }
};

const printElements = function printTreeElements(tree) {
  // Level order.
  console.log("Level Order\n");
  let levelOrderString = "";
  tree.levelOrder((node) => {
    levelOrderString += `${node.data}, `;
  });
  console.log(levelOrderString);

  // Pre-order.
  console.log("Pre-order\n");
  let preOrderString = "";
  tree.preOrder((node) => {
    preOrderString += `${node.data}, `;
  });
  console.log(preOrderString);

  // In-order.
  console.log("In-order\n");
  let inOrderString = "";
  tree.inOrder((node) => {
    inOrderString += `${node.data}, `;
  });
  console.log(inOrderString);

  // Post-order.
  console.log("Post-order\n");
  let postOrderString = "";
  tree.postOrder((node) => {
    postOrderString += `${node.data}, `;
  });
  console.log(postOrderString);
};

// Create a binary search tree from an array of random numbers < 100.
const array = arrayGenerator();
const tree = Tree(array);

// Confirm that the tree is balanced.
isBalancedLog(tree);

// Print out all elements in level, pre, post and in order.
printElements(tree);

// Unbalance the tree by adding several numbers greater than 100.
tree.insert(120);
tree.insert(150);
tree.insert(200);
tree.insert(300);
tree.insert(330);
tree.insert(370);
tree.insert(410);

// Confirm that the tree is balanced.
isBalancedLog(tree);

// Balance the tree.
tree.rebalance(tree);

// Confirm that the tree is balanced.
isBalancedLog(tree);

// Print out all elements in level, pre, post and in order.
printElements(tree);