// Defines Valid Characters
chars = "´'!$%&*+,. -/0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]abcdefghijklmnopqrstuvwxyz{(|)}~äöüÄÖÜß".split("");
let charCount = chars.length;

// Encrypts a string using a given key
function encrypt(message, key) {
  let cnt = (Math.floor(message.length/20)*20+20)-message.length-1;
  for (let i = 0; i < cnt; i++) {
    message += chars[0];
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
    message += (diff != 0) ? chars[diff] : "";
  }
  return message;
}


// A better Modulo function (works with negative numbers)
function modulo(a, c) {
  return a - (Math.floor(a/c) * c);
}




// Cryptographic Hash Function
function hash(msg, hashLength) {
  while (msg.length % (hashLength/8) != 0) msg += "x";
  let tmp = 601n;
  for (let i = 0; i < msg.length; i++) {
    let char = BigInt(msg.charCodeAt(i));
    tmp = compress(tmp, char, hashLength);
  }
  return tmp.toString(16);
  //return tmp;
}

function compress(a, b, hashLength) {
  let res = a*(a^(7n*b));
  for (let i = 0; i < 12; i++) {
    res = (a+b)*res*a*b + a + 15485863n*b;
  }
  return res % (2n ** BigInt(hashLength));
}
