'use babel'
exports.getInsertIndex = function(sortedArray, object) {
  var curObject, index;
  if (sortedArray.length === 0) {
    return 0;
  }
  for (index in sortedArray) {
    curObject = sortedArray[index];
    if (object.isLessThan(curObject)) {
      return index;
    }
  }
  return sortedArray.length;
};

exports.insertOrdered = function(sortedArray, object) {
  var index;
  index = exports.getInsertIndex(sortedArray, object);
  return sortedArray.splice(index, 0, object);
};


exports.escapeValue = function(object) {
  if (typeof object === "string") {
    return "\"" + object.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
  }
  return object;
};

exports.escapeHtml = function(string) {
  var entityMap, result;
  entityMap = {
    "<": "&lt;",
    ">": "&gt;"
  };
  result = String(string).replace(/[<>]/g, function(s) {
    return entityMap[s];
  });
  return result;
};

exports.arraySearch = function(array, object) {
  var curObject, index;
  if (array.length === 0) {
    return false;
  }
  for (index in array) {
    curObject = array[index];
    if (object.isEqual(curObject)) {
      return index;
    }
  }
  return false;
};

exports.arrayRemove = function(array, object) {
  var index, removed;
  index = exports.arraySearch(array, object);
  if (index === false) {
    return;
  }
  removed = array.splice(index, 1);
  if (removed.length > 0) {
    return removed[0];
  }
};

exports.serializeArray = function(array) {
  var curObject, index, object, ret;
  ret = [];
  for (index in array) {
    curObject = array[index];
    object = curObject.serialize();
    if (object === void 0) {
      continue;
    }
    ret.push(object);
  }
  return ret;
};

exports.shallowEqual = function(oldProps, newProps) {
  var newKeys, oldKeys;
  newKeys = Object.keys(newProps).sort();
  oldKeys = Object.keys(oldProps).sort();
  if (!newKeys.every((function(_this) {
    return function(key) {
      return oldKeys.includes(key);
    };
  })(this))) {
    return false;
  }
  return newKeys.every((function(_this) {
    return function(key) {
      return newProps[key] === oldProps[key];
    };
  })(this));
};

exports.deserializeArray = function(array) {
  var curObject, error, index, object, ret;
  ret = [];
  for (index in array) {
    curObject = array[index];
    try {
      object = atom.deserializers.deserialize(curObject);
      if (object === void 0) {
        continue;
      }
      ret.push(object);
    } catch (_error) {
      error = _error;
      console.error("Could not deserialize object");
      console.dir(curObject);
    }
  }
  return ret;
};
