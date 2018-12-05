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

Object.defineProperty(Array.prototype, 'object', {
  value: function(fn) {
    return this.reduce(fn, {});
  },
});

Object.defineProperty(Array.prototype, 'loop', {
  value: function(fn, returnValue) {
    if (this.length === 2) {
      for (let i = this[0]; i < this[0] + this[1]; ++i) fn(i, returnValue);
    } else if (this.length === 4) {
      for (let i = this[0]; i < this[0] + this[2]; ++i) {
        for (let j = this[1]; j < this[1] + this[3]; ++j) {
          fn(i, j, returnValue);
        }
      }
    }
    return returnValue;
  },
});

Object.defineProperty(Array.prototype, 'loopIf', {
  value: function(fn, ifTrue, ifFalse) {
    if (this.length === 2) {
      for (let i = this[0]; i < this[0] + this[1]; ++i) {
        const result = fn(i);
        if (result) return ifTrue;
      }
    } else if (this.length === 4) {
      for (let i = this[0]; i < this[0] + this[2]; ++i) {
        for (let j = this[1]; j < this[1] + this[3]; ++j) {
          const result = fn(i, j);
          if (result) return ifTrue;
        }
      }
    }
    return ifFalse;
  },
});

Object.defineProperty(Array.prototype, 'exclude', {
  value: function(fn) {
    const actualFn = item => !fn(item);
    return this.filter(actualFn);
  },
});
