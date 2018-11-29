function urlValidator(str) {
  if (str.startsWith("postgres://" || "mongodb://")) {
    return true;
  }
  return false;
}
module.exports = { urlValidator };
