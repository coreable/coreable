import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import * as config from '../config/config.json';
import { promisify } from 'util';
import { resolve } from 'bluebird';

const JWT_SECRET: Secret = config.JWT_SECRET;
const ROUNDS: number = 10;

/* Password Hashing */

// Generate a password hash, using the bcrypt library.  We wrap this in a
// Promise to avoid using bcrypt's default callbacks
export function generatePasswordHash(plainTextPassword: string) {
  return new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(ROUNDS, (saltError: Error, salt: string) => {
      if (saltError) return reject(saltError);
      return bcrypt.hash(plainTextPassword, salt, (hashError: Error, hash: string) => {
        if (saltError) return reject(saltError);
        return resolve(hash);
      });
    });
  });
}

// Check a hashed password
const asyncBcryptCompare = (plainTextPassword: string, hash: string) => promisify(bcrypt.compare);
export function checkPassword(plainTextPassword: string, hash: string) {
  return asyncBcryptCompare(plainTextPassword, hash);
}

/* JWT */

// Encode a JWT
export function encodeJWT(payload: string | object | Buffer) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
}

// Verify a JWT. 
// Note:  This can throw an error if the token is invalid, wrap it in a try catch
const asyncVerify = promisify(jwt.verify);
export function decodeJWT(token: string) {
  return asyncVerify(token, JWT_SECRET);
}
