var CryptoJS = require("crypto-js");

const PASSWORD_HASH = "6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090"; // abc123

class Auth {
  verifyPassword(password) {
    let hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(password);
    console.log(hash);
    return PASSWORD_HASH == hash;
  }
}

const auth = new Auth();

export default auth;
