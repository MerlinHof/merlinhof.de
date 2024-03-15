// Defines Valid Characters
chars = "!\"#$%&'()*+, -./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀ".split("");
let charCount = chars.length;

// Hashes a given string to a string of at least 64 bytes length
function hash(msg) {
  for (let i = 0; i < 64-msg.length-1; i++) msg += "%";
  var prevhashed = msg;
  var hashed = "";
  var prev = 0;
  for (let r = 0; r < 13; r++) {
    for (let i = 0; i < prevhashed.length; i++) {
      let char = prevhashed[i];
      let asciiKey = chars.indexOf(char);
      let hashedVal = modulo(prev*37 + asciiKey, charCount);
      prev = hashedVal;
      hashed += chars[hashedVal];
    }
    prevhashed = hashed;
    hashed = "";
  }
  return prevhashed;
}


// Encrypts a string using a given key
function encrypt(message, key) {
  let cnt = (Math.floor(message.length/20)*20+20)-message.length-1;
  for (let i = 0; i < cnt; i++) {
    message += chars[7];
  }
  key = hash(key);
  var ciphertext = "";
  for (let i = 0; i < message.length; i++) {
    let char = message[i];
    let asciiChar = chars.indexOf(char);
    let keyVal = key[modulo(i, key.length-1)];
    let asciiKey = chars.indexOf(keyVal);
    let sum = modulo(asciiChar + asciiKey, charCount);
    ciphertext += chars[sum];
  }
  return ciphertext;
}


// Decrypts a string using a given key
function decrypt(ciphertext, key) {
  var message = "";
  key = hash(key);
  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i];
    let asciiChar = chars.indexOf(char);
    let keyVal = key[modulo(i, key.length-1)];
    let asciiKey = chars.indexOf(keyVal);
    var diff = modulo(asciiChar - asciiKey, charCount);
    message += (diff != 7) ? chars[diff] : "";
  }
  return message;
}


// A better Modulo function (works with negative numbers)
function modulo(a, c) {
  return a - (Math.floor(a/c) * c);
}
