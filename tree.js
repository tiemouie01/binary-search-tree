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

  // Sort the array
  array.sort((a, b) => a - b);

  // Set the middle element of the array as root.
  const middle = Math.floor(array.length / 2);
  const root = Node(array[middle]);

  //  Recursively do the same for the left and right children with their respective halves.
  root.left = buildTree(array.slice(0, middle));
  root.right = buildTree(array.slice(middle + 1));

  return root;
};

const deleteLeaf = function deleteLeafNode(parentNode, targetNode) {
  const parent = parentNode;

  if (parentNode.left === targetNode) {
    parent.left = null;
  } else {
    parent.right = null;
  }

  return targetNode;
};

const deleteConnected = function deleteNodeWithTwoBranches(targetNode) {
  // This function searches for the next biggest node (the successor node) to the target node, and replaces that target node with its successor.
  let successorParent = targetNode;
  let successor = targetNode.right;

  while (successor.left !== null) {
    successorParent = successor;
    successor = successor.left;
  }

  if (successorParent !== targetNode) {
    successorParent.left = successor.right;
  } else {
    successorParent.right = successor.right;
  }

  const deletedNode = targetNode;
  // eslint-disable-next-line no-param-reassign
  targetNode.data = successor.data;
  successor = null;

  return deletedNode;
};

export default function Tree(array) {
  let root = buildTree(array);

  const getRoot = () => root;
  const setRoot = function setRootOfTree(node) {
    root = node;
  };
  
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

  const deleteNode = function deleteNodeWithValue(data) {
    let parentNode = null;
    let targetNode = root;

    // Traverse the tree until the node to be deleted is found.
    while (targetNode.data !== data && targetNode) {
      parentNode = targetNode;

      if (targetNode.data < data) {
        targetNode = targetNode.right;
      } else {
        targetNode = targetNode.left;
      }
    }

    if (!targetNode) return root;

    /** Delete the targeted node according to the state of its children and its position.
     * If the targeted node is at the top of the tree, take the next largest node and set it as the root of the tree.
     * If the target node only has one child either left or right, remove the node and connect its child to the parent node's corresponding branch.
     * If the target node has both left and right children, take the next largest node and set it in place of the target node.
     */

    if (!parentNode) return deleteConnected(targetNode);

    if (parentNode.left === targetNode) {
      if (targetNode.left && !targetNode.right) {
        parentNode.left = targetNode.left;
      } else if (targetNode.right && !targetNode.left) {
        parentNode.left = targetNode.right;
      } else if (targetNode.left && targetNode.right) {
        deleteConnected(parentNode, targetNode);
      } else {
        deleteLeaf(parentNode, targetNode);
      }
    } else if (parentNode.right === targetNode) {
      if (targetNode.left && !targetNode.right) {
        parentNode.right = targetNode.left;
      } else if (targetNode.right && !targetNode.left) {
        parentNode.right = targetNode.right;
      } else if (targetNode.left && targetNode.right) {
        deleteConnected(parentNode, targetNode);
      } else {
        deleteLeaf(parentNode, targetNode);
      }
    }

    return targetNode;
  };

  const find = function findNodeWithValue(data) {
    let targetNode = root;

    while (targetNode.data !== data && targetNode) {
      if (targetNode.data < data) {
        targetNode = targetNode.right;
      } else {
        targetNode = targetNode.left;
      }
    }

    return targetNode;
  };

  const levelOrder = function levelOrderTraversalWithCallback(callback = null) {
    // Return an array of values if no callback is given as an argument.
    if (!callback) return array;

    // Add a reference to the root node to the queue.
    const queue = [root];

    /** While the queue is not empty:
     * Dequeue the the node from the queue and pass it to the callback function.
     * Enqueue the node's children.
     */
    while (queue.length !== 0) {
      const node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    return null;
  };

  const inOrder = function inOrderTraversalWithCallBack(
    callback = null,
    node = root,
  ) {
    if (!callback) return array;

    if (!node) return null;

    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);

    return null;
  };

  const preOrder = function preOrderTraversalWithCallBack(
    callback = null,
    node = root,
  ) {
    if (!callback) return array;

    if (!node) return null;

    callback(node);
    preOrder(callback, node.left);
    preOrder(callback, node.right);

    return null;
  };

  const postOrder = function postOrderTraversalWithCallBack(
    callback = null,
    node = root,
  ) {
    if (!callback) return array;

    if (!node) return null;

    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node);

    return null;
  };

  const height = function edgesFromNodeToLeafRecursive(node, total = 0) {
    // Recursively calculate the height of the left and right nodes until the end of a path is reached.
    if (!node) {
      return total - 1;
    }

    const leftHeight = height(node.left, total + 1);
    const rightHeight = height(node.right, total + 1);

    // Compare the left and right height values and return the larger value which signifies the longer path.
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  };

  const depth = function edgesFromNodeToRoot(node) {
    // Search for the given node from the root and count each step as an edge.
    let traversalNode = root;
    let counter = 0;

    while (traversalNode.data !== node.data && traversalNode) {
      if (traversalNode.data < node.data) {
        traversalNode = traversalNode.right;
        counter += 1;
      } else {
        traversalNode = traversalNode.left;
        counter += 1;
      }
    }

    return counter;
  };

  const isBalanced = function isTreeBalanced() {
    // Get the height of the left and right sub trees from the root.
    const leftHeight = height(root.left);
    const rightHeight = height(root.right);

    // If the difference between the height is greater than 2, return false, else return true
    const heightDifference = Math.abs(leftHeight - rightHeight);
    if (heightDifference > 1) {
      return false;
    }
    return true;
  };

  const rebalance = function rebalanceUnbalancedTree() {
    const newArray = [];

    // Using in order traversal, add all the data values of the nodes to a new array.
    inOrder((node) => {
      newArray.push(node.data);
    });

    // Build the tree again with the new array and set it as the root.
    root = buildTree(newArray);
  };

  return {
    setRoot,
    getRoot,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
