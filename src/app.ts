import express, { Application, Request, Response, NextFunction } from 'express';
import GraphHTTP from 'express-graphql';
import { Schema } from './api/Schema';
import { decodeJWT } from './lib/hash';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      USER: any;
    }
  }
}

// Server
export const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable('x-powered-by');

// Security CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// JWT Authorization
app.use((req: Request, res: Response, next: NextFunction) => {
  const AUTH: string = req.headers.AUTHORIZATION as any;
  if (AUTH) {
    try {
      req.USER = decodeJWT(AUTH);
    } catch (err) {
      req.USER = null;
    }
  }
  next();
});

// GraphQL init
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: process.env.NODE_ENV == 'development' ? true : false
}));
