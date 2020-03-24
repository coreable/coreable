import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import * as config from '../config/config.json';
import { promisify } from 'util';

// Turn the JWT callback into a promise for async/await
// const asyncSign = promisify(jwt.sign); // Broken [Github issue](https://github.com/auth0/node-jsonwebtoken/issues/705)
const asyncVerify = promisify(jwt.verify);

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
export function checkPassword(plainTextPassword: string, hash: string) {
  return new Promise<boolean>((resolve, reject) => (
    bcrypt.compare(plainTextPassword, hash, (e: Error, doesMatch: boolean) => {
      if (e) return reject(e);
      return resolve(doesMatch);
    })
  ));
}

/* JWT */

// Sign a JWT.  Pass in an object, which will be publicly visible.
export function encodeJWT(payload: string | object | Buffer): Promise<unknown> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
}

// Verify a JWT. Note:  This can throw an error if the token is invalid,
// so always catch it!
export function decodeJWT(token: string): Promise<unknown> {
  return asyncVerify(token, JWT_SECRET);
}