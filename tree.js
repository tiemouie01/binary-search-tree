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

  const height = function edgesFromNodeToLeaf(node) {
    let leftCounter = 0;
    let rightCounter = 0;
    let traversalNode = node;

    // Counter the number of edges to the left of the node.
    while (traversalNode.left !== null) {
      traversalNode = traversalNode.left;
      leftCounter += 1;
    }

    // Counter the number of edges to the right of the node.
    traversalNode = node;
    while (traversalNode.right !== null) {
      traversalNode = traversalNode.right;
      rightCounter += 1;
    }

    // Compare the number of edges on both sides and return the highest number.
    return leftCounter > rightCounter ? leftCounter : rightCounter;
  };

  const depth = function edgesFromNodeToRoot(node) {
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

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
  };
}
