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

import { Secret, verify, sign } from "jsonwebtoken";
import { config } from "../../../config/config";

export const JWT_SECRET: Secret = config.JWT_SECRET as string;

// Encode a JWT
export function encodeJWT(payload: string | object | Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
      if (err) return reject(err);
      if (!token) return reject();
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
