const { createHash } = require("crypto");

function hash(lines) {
  const hashBasic = (lines) => {
    const _hash = createHash("sha256");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "") continue;
      _hash.write(`${line}b${line}`);
    }
    return _hash.digest("base64");
  };
  const data = hashBasic(lines);
  const _hash = createHash("sha256");
  for (let i = 0; i < data.length; i++) {
    const line = data[i].trim();
    if (line === "") continue;
    _hash.write(`${line}9${line}`);
  }
  return _hash.digest("base64url");
}

module.exports = hash;
