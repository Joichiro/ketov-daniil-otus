var result = 0;

function sum(arg) {
  var res = 0;
  function f(val) {
    if (val !== undefined) {
      result += val;
      res += val;
    }
    return f;
  }

  f.toString = function() {
    return res;
  };

  if (arg === undefined) {
    return result;
  } else {
    res += arg;
    result += arg;
    return f;
  }
}

