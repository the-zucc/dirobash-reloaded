var CryptoJS = require("crypto-js");

const PASSWORD_HASH = "3f980b185f8d2d511cfe73cbb6e62f0efc71d801ece79deae1c5c5f499dee539";

class Auth {
  verifyPassword(password) {
    let hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return PASSWORD_HASH == hash;
  }
}

const auth = new Auth();

export default auth;
