const Node = function binaryTreeNode(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
};

const buildTree = function buildTheBinarySearchTree(array) {
  if (!array.length) {
    return null;
  }

  // Set the middle element of the array as root.
  const middle = Math.floor(array.length / 2);
  const root = Node(array[middle]);

  /** Recursively do the same for the left and right
   * Set the root of the left half of the array and make it the left child of the main root
   * Repeat for the right half of the array.
   */
  root.left = buildTree(array.slice(0, middle));
  root.right = buildTree(array.slice(middle + 1));

  return root;
};

export default function Tree(array) {
  const root = buildTree(array);

  return {
    root,
  };
}
