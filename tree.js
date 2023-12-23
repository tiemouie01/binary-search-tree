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

  const insert = function insertValueIntoTree(data, node = root) {
    /** If the data value is greater than the data value in the node,
     * The node is inserted as a child to the node's right if it has no existing child.
     * If the node already has a child to the right, the value continues down the tree.
     */

    if (data >= node.data) {
      if (!node.right) {
        const lastNode = node;
        lastNode.right = Node(data);
      } else {
        insert(data, node.right);
      }
    } else if (data < node.data) {
      if (!node.left) {
        const lastNode = node;
        lastNode.left = Node(data);
      } else {
        insert(data, node.left);
      }
    }
  };

  return {
    root,
    insert,
  };
}
