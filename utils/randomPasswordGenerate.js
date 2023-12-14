const crypto = require('crypto');

exports.generateRandomPassword = (length) => {
  // Create a buffer to store random bytes
  const buffer = crypto.randomBytes(length);

  // Convert the buffer to a string using base64 encoding
  const password = buffer.toString('base64');

  // Ensure the length of the password is exactly 'length'
  return password.slice(0, length);
};
