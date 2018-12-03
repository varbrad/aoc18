Object.defineProperty(Array.prototype, 'compare', {
  value: function(fn) {
    const r = [];
    const len = this.length;
    for (let i = 0; i < len - 1; ++i) {
      for (let j = i + 1; j < len; ++j) {
        const [a, b] = [this[i], this[j]];
        const result = fn(a, b, i, j);
        result && r.push(result);
      }
    }
    return r;
  },
});

Object.defineProperty(Array.prototype, 'findCompare', {
  value: function(fn) {
    const len = this.length;
    for (let i = 0; i < len - 1; ++i) {
      for (let j = i + 1; j < len; ++j) {
        const [a, b] = [this[i], this[j]];
        const result = fn(a, b, i, j);
        if (result) return result;
      }
    }
    return false;
  },
});

Object.defineProperty(Array.prototype, 'first', {
  value: function(fn, defaultValue = null, ...include) {
    const len = this.length;
    for (let i = 0; i < len; ++i) {
      const value = fn(this[i], ...include);
      if (value) return value;
    }
    return defaultValue;
  },
});

Object.defineProperty(Array.prototype, 'until', {
  value: function(fn, ...include) {
    const len = this.length;
    while (true) {
      for (let i = 0; i < len; ++i) {
        const value = fn(this[i], ...include);
        if (value) return value;
      }
    }
  },
});
