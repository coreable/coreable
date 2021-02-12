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

export const ROUNDS: number = 10;

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