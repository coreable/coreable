/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import { genSalt, compare, hash } from 'bcrypt';
import { Secret, verify, sign } from 'jsonwebtoken';
import { config } from '../config/config';

export const JWT_SECRET: Secret = config.JWT_SECRET as string;
export const ROUNDS: number = 10;

/* Password Hashing */

// Generate a password hash, using the bcrypt library.  We wrap this in a
// Promise to avoid using bcrypt's default callbacks
export function generatePasswordHash(plainTextPassword: string) {
  return new Promise<string>((resolve, reject) => {
    genSalt(ROUNDS, (saltError: Error, salt: string) => {
      if (saltError) return reject(saltError);
      return hash(plainTextPassword, salt, (hashError: Error, hash: string) => {
        if (saltError) return reject(saltError);
        return resolve(hash);
      });
    });
  });
}

// Check a hashed password
export function checkPassword(plainTextPassword: string, hash: string) {
  return new Promise<boolean>((resolve, reject) => (
    compare(plainTextPassword, hash, (e: Error, doesMatch: boolean) => {
      if (e) return reject(e);
      return resolve(doesMatch);
    })
  ));
}

/* JWT */

// Encode a JWT
export function encodeJWT(payload: string | object | Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, { expiresIn: '30d' }, (err, token) => {
      if (err) return reject(err);
      return resolve(token);
    });
  });
}

// Verify a JWT. 
// Note:  This can throw an error if the token is invalid, wrap it in a try catch
export function decodeJWT(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    verify(token, JWT_SECRET, (err, obj) => {
      if (err) return reject(err);
      return resolve(obj);
    });
  });
}