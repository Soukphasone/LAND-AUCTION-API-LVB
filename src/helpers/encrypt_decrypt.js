const CryptoJS = require("crypto-js");
const crypto = require("crypto");

const secret = process.env.SECRET_KEY;

function encryptData(data) {
  const key = CryptoJS.SHA256(secret);
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
  const ciphertextBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

  return `${ivBase64}:${ciphertextBase64}`;
}

function decryptData(data) {
  const [ivBase64, ciphertextBase64] = data.split(":");
  const iv = Buffer.from(ivBase64, "base64");
  const ciphertext = Buffer.from(ciphertextBase64, "base64");

  const key = crypto.createHash("sha256").update(secret).digest();

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(ciphertext);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return JSON.parse(decrypted.toString("utf8"));
}

module.exports = { encryptData, decryptData };
