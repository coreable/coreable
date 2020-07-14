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

import express, {
  Application,
  Request,
  Response,
  NextFunction,
  urlencoded,
  json,
  static as expressStatic
} from 'express';
import { graphqlHTTP } from 'express-graphql';
import { join } from 'path';
import cors from 'cors';

import { UniversitySchema } from '../enterprise/university/graphql/Schema';

import { config } from '../config/config';
import { decodeJWT } from '../identity/logic/functions/JWT';
import { sequelize } from './sequelize';

import { User } from '../identity/models/User';
import { IdentitySchema } from '../identity/graphql/Schema';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      // Decoded JWT for server sided use
      JWT: { _id: string; email: string; enterprise: string; };
      // User object from the database
      USER: User;
      // User type for Graphql schema
      enterprise: string | undefined;
    }
    interface Application {
      // The database sync process
      _startup: Promise<boolean>;
    }
  }
}

// Server
const app: Application = express();

// Middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(cors());

// JWT Authorization
app.use(async (req: Request, res: Response, next: NextFunction) => {
  const JWT_TOKEN: string | undefined = req.header("JWT");
  if (JWT_TOKEN) {
    try {
      // Decode for server sided use only
      req.JWT = await decodeJWT(JWT_TOKEN);
      req.enterprise = req.JWT.enterprise;
      // return (non-decoded) JWT token to client via HTTP
      res.setHeader('JWT', JWT_TOKEN);
      req.USER = await sequelize.models.User.findOne(
        {
          where: { _id: req.JWT._id }
        }
      );
      if (!req.USER) {
        throw new Error("Database and client header discrepancy");
      }
    } catch (err) {
      if (config.NODE_ENV === 'development') {
        console.error({ code: err.name, message: err.message, path: 'api/lib/express.ts' });
      }
      // Remove server sided JWT
      delete req.JWT;
      // Remove JWT from HTTP response
      res.removeHeader('JWT');
    }
  }
  next();
});

// GraphQL
app.use('/graphql', graphqlHTTP({
  schema: UniversitySchema,
  pretty: config.NODE_ENV === 'development',
  graphiql: config.NODE_ENV === 'development'
}));

app.use('/identity', graphqlHTTP({
  schema: IdentitySchema,
  pretty: config.NODE_ENV === 'development',
  graphiql: config.NODE_ENV === 'development'
}));

if (config.NODE_ENV === "production") {
  // TODO: Restrict /docs/ access to developers and coreable people
  app.use(expressStatic(join(__dirname + '/../public/')));
  // app.use(expressStatic(join(__dirname + '/../docs/')));
  // app.get('/docs/*', (req, res) => {
  //   res.sendFile(join(__dirname + '/../docs/index.html'));
  // });
  app.get('/*', (req, res) => {
    res.sendFile(join(__dirname + '/../public/index.html'));
  });
}

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (config.NODE_ENV === 'development') {
    console.error({ name: err.name, message: err.message, path: '/api/lib/express.ts' });
  }
  return res.status(500).json(err);
});

export { app };