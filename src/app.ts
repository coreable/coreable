import express, { Application, Request, Response, NextFunction } from 'express';
import GraphHTTP from 'express-graphql';
import { Schema } from './api/Schema';
import { decodeJWT } from './lib/hash';
import { sequelize } from './lib/sequelize';
import { Team } from './models/Team';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      JWT: any; // Decoded JWT for server sided Use
      USER: any // User object from the database
    }
  }
}

// Server
const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Security CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.removeHeader('X-Powered-By');
  next();
});

// JWT Authorization
app.use(async(req: Request, res: Response, next: NextFunction) => {
  const JWT_TOKEN: string | undefined = req.header("JWT");
  if (JWT_TOKEN) {
    try {
      req.JWT = decodeJWT(JWT_TOKEN); // Decode for server sided use only
      res.setHeader('JWT', JWT_TOKEN); // return (non-decoded) JWT token to client
      req.USER = await sequelize.models.User.findOne({ where: { userID: req.JWT.userID }, include: [{ model: Team }] }); // Scaffolding for Security
      if (!req.USER) throw new Error("Database & Cache discrepancy");
    } catch (err) {
      process.env.NODE_ENV == 'development' ? console.error({ name:err.name, message: err.message }) : null;
      req.JWT = null; // Null for server sided use only
      res.removeHeader('JWT'); // Remove JWT from server response
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

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err); 
  return res.status(500).json(err);
});

export { app };