import crypto from "node:crypto";

const KEY_LENGTH = 64;

function scryptAsync(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const key = await scryptAsync(password, salt);
  return `scrypt:${salt}:${key.toString("base64url")}`;
}

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run auth:hash -- <password>");
  process.exit(1);
}

const hash = await hashPassword(password);
console.log(hash);
