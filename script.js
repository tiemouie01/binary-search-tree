// eslint-disable-next-line import/extensions
import Tree from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const test = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12]);
test.insert(15);
test.insert(20);
test.insert(13);
test.insert(17);
test.insert(80);
test.insert(150);

test.rebalance();
prettyPrint(test.getRoot());