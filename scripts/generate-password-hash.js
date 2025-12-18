#!/usr/bin/env node

/**
 * Script to generate a password hash using bcrypt for use with Vercel environment variables
 * Usage: node scripts/generate-password-hash.js <password>
 * 
 * Note: You need to install bcryptjs first: npm install bcryptjs
 */

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-password-hash.js <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log("\nPassword hash generated (bcrypt):");
console.log(hash);
console.log("\nSet this as ADMIN_PASSWORD_HASH in your Vercel environment variables.");
console.log("Also set ADMIN_EMAIL to your admin email address.");
console.log("Also set JWT_SECRET to a random secure string (e.g., generate with: openssl rand -base64 32)\n");
