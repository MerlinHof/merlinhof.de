// ----------------------------------------------------------------------------------------------------------------------------
// Returns the start position of a string in another string
String.prototype.pos = function(matchString) {
  let str = this.toString();
  if (str.includes(matchString)) {
    for (let i = 0; i < str.length; i++) {
      if (str.substring(i, i + matchString.length) == matchString) {
        return i;
        break;
      }
    }
  } else {
    return false;
  }
}


// ----------------------------------------------------------------------------------------------------------------------------
// removes all occurances of an string in another strings and returns the result
String.prototype.removeAll = function(findString) {
  let str = this.toString();
  while (str.includes(findString)) {
      str = str.replace(findString, '');
  }
  return str;
}


// ----------------------------------------------------------------------------------------------------------------------------
// counts, how many occurances a string has in another string and returns this number
String.prototype.count = function(findString) {
  let str = this.toString();
  let cnt = 0;
  while (str.includes(findString)) {
      str = str.replace(findString, '');
      cnt++;
  }
  return cnt;
}
