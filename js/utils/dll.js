// Doubly-linked list implementation

export default class DLNode {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  selfLink() {
    this.left = this;
    this.right = this;
    return this;
  }

  addToRight(node) {
    // Get our old right node
    const oldRight = this.right;
    this.right = node; // Set our right node to the new one
    oldRight.left = node; // Set the old right nodes left to the new one
    node.left = this; // We are left of the rightmost node
    node.right = oldRight;
    return this;
  }

  remove() {
    this.left.right = this.right;
    this.right.left = this.left;
    return this.value;
  }

  traverse(n) {
    if (n === 0) return this;
    if (n > 0) return this.right.traverse(n - 1);
    return this.left.traverse(n + 1);
  }
}
