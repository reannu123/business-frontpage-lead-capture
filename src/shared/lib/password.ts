import crypto from "node:crypto";

const KEY_LENGTH = 64;
const HASH_PREFIX = "scrypt";

function scryptAsync(password: string, salt: string) {
  return new Promise<Buffer>((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LENGTH, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const key = await scryptAsync(password, salt);
  return `${HASH_PREFIX}:${salt}:${key.toString("base64url")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [prefix, salt, encodedKey] = storedHash.split(":");

  if (prefix !== HASH_PREFIX || !salt || !encodedKey) {
    return false;
  }

  const storedKey = Buffer.from(encodedKey, "base64url");
  const suppliedKey = await scryptAsync(password, salt);

  if (storedKey.length !== suppliedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedKey, suppliedKey);
}
