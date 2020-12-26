function extend(target, source) {
  for (var obj in source) {
    target[obj] = source[obj];
  }
  return target;
}

let apiUrl = {};
extend(apiUrl, require("./common"));
extend(apiUrl, require("./user"));
extend(apiUrl, require("./hotel"));
extend(apiUrl, require("./room"));
module.exports = apiUrl;
