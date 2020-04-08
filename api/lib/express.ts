/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import express, { Application, Request, Response, NextFunction } from 'express';
import GraphHTTP from 'express-graphql';
import { join } from 'path';
import cors from 'cors';

import { Schema } from '../graphql/Schema';

import { decodeJWT } from './hash';
import { sequelize } from './sequelize';

import { Team } from '../models/Team';
import { Subject } from '../models/Subject';
import { Manager } from '../models/Manager';
import { User } from '../models/User';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      JWT: { _id: string; email: string; manager: boolean; }; // Decoded JWT for server sided use
      USER: User | Manager; // User/Manager object from the database
    }
  }
}

// Server
const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(cors());

// JWT Authorization
app.use(async (req: Request, res: Response, next: NextFunction) => {
  const JWT_TOKEN: string | undefined = req.header("JWT");
  if (JWT_TOKEN) {
    try {
      req.JWT = await decodeJWT(JWT_TOKEN); // Decode for server sided use only
      res.setHeader('JWT', JWT_TOKEN); // return (non-decoded) JWT token to client
      if (req.JWT.manager !== true) {
        req.USER = await sequelize.models.User.findOne({ where: { _id: req.JWT._id }, include: [{ model: Team, as: 'teams', exclude: ['inviteCode'] }] });
      }
      if (req.JWT.manager === true) {
        req.USER = await sequelize.models.Manager.findOne({ where: { _id: req.JWT._id }, include: [{ model: Subject, as: 'subjects' }] });
      }
      if (!req.USER) {
        throw new Error("Database, Cache or Client Header discrepancy");
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error({ code: err.name, message: err.message, path: 'api/lib/express.ts' });
      }
      delete req.JWT;
      res.removeHeader('JWT'); // Remove JWT from server response
    }
  }
  next();
});

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: process.env.NODE_ENV == 'development' ? true : true
}));

if (process.env.NODE_ENV === "production") {
  app.get('/', express.static(join(__dirname + '/../public')));
  app.get('/docs', express.static(join(__dirname + '/../docs')));
  app.use(express.static(join(__dirname + '/../public/')));
  app.use(express.static(join(__dirname + '/../docs/')));
}

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  process.env.NODE_ENV == 'development' ? console.error({ name: err.name, message: err.message }) : null;
  return res.status(500).json(err);
});

export { app };