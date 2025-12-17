#!/usr/bin/env node

/**
 * Script to generate a password hash for use with Vercel environment variables
 * Usage: node scripts/generate-password-hash.js <password>
 */

const crypto = require("crypto");

function hashPassword(password, salt) {
  const hash = crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
  return `${salt}:${hash}`;
}

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-password-hash.js <password>");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = hashPassword(password, salt);

console.log("\nPassword hash generated:");
console.log(hash);
console.log(
  "\nSet this as ADMIN_PASSWORD_HASH in your Vercel environment variables.",
);
console.log("Also set ADMIN_EMAIL to your admin email address.\n");
