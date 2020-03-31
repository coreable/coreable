import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import * as config from '../config/config.json';

export const JWT_SECRET: Secret = config.JWT_SECRET;
export const ROUNDS: number = 10;

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

// Encode a JWT
export function encodeJWT(payload: string | object | Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
}

// Verify a JWT. 
// Note:  This can throw an error if the token is invalid, wrap it in a try catch
export function decodeJWT(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, obj) => {
      if (err) return reject(err);
      resolve(obj);
    });
  });
}