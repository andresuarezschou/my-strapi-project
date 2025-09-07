
const crypto = require('crypto');

const generateKey = () => {
  return crypto.randomBytes(16).toString('base64');
};

const keys = [
  generateKey(),
  generateKey(),
  generateKey(),
  generateKey(),
];

console.log(keys.join(','));
