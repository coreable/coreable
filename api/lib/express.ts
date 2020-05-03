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

import express, { Application, Request, Response, NextFunction, urlencoded, json, static as expressStatic } from 'express';
import GraphHTTP from 'express-graphql';
import { join } from 'path';
import cors from 'cors';

import { Schema } from '../graphql/Schema';

import { config } from '../config/config';
import { decodeJWT } from './hash';
import { sequelize } from './sequelize';

import { Team } from '../models/Team';
import { Subject } from '../models/Subject';
import { Manager } from '../models/Manager';
import { User } from '../models/User';
import { Op } from 'sequelize';

// A hack to add the JWT decoded token to the request object
declare global {
  namespace Express {
    interface Request {
      JWT: { _id: string; email: string; manager: boolean; }; // Decoded JWT for server sided use
      USER: User | Manager; // User/Manager object from the database
    }
    interface Application {
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
      req.JWT = await decodeJWT(JWT_TOKEN); // Decode for server sided use only
      res.setHeader('JWT', JWT_TOKEN); // return (non-decoded) JWT token to client via HTTP
      switch (req.JWT.manager) {
        case true:
          req.USER = await sequelize.models.Manager.findOne({ where: { _id: req.JWT._id }, include: [{ model: Subject, as: 'subjects' }] });
          break;
        case false:
        default:
          req.USER = await sequelize.models.User.findOne({ where: { _id: req.JWT._id }, include: [{ model: Team, as: 'teams', attributes: { exclude:  ['inviteCode'] } }] });
        break;
      }
      if (!req.USER) {
        throw new Error("Database, Cache or Client Header discrepancy");
      }
    } catch (err) {
      if (config.NODE_ENV === 'development') {
        console.error({ code: err.name, message: err.message, path: 'api/lib/express.ts' });
      }
      delete req.JWT; // Remove Server sided JWT
      res.removeHeader('JWT'); // Remove JWT from HTTP response
    }
  }
  next();
});

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: config.NODE_ENV === 'development',
  graphiql: config.NODE_ENV === 'development'
}));

// CSV Export
app.get('/export/:inviteCode', async(req: Request, res: Response, next: NextFunction) => {
  let results = []; 
  if (req.params.inviteCode) {
    try {
      let teamUsers = [];
      const team = await sequelize.models.Team.findOne({ where: { inviteCode: req.params.inviteCode }, include: [{ model: sequelize.models.Subject, as: 'subject' }, { model: sequelize.models.User, as: 'users' }]});
      for (const user of team.users) {
        teamUsers.push(user._id);
      }
      const reviews = await sequelize.models.Review.findAll({ where: { submitter_id: { [Op.in]: teamUsers }, receiver_id: { [Op.in]: teamUsers }, subject_id: team.subject._id  }, include: [{ model: sequelize.models.User, as: 'submitter' }, { model: sequelize.models.User, as: 'receiver' }] });
      for (const review of reviews) {
        results.push({
          "receiver_first_name": review.receiver.firstName,
          "receiver_last_name": review.receiver.lastName,
          "receiver_email": review.receiver.email,
          "submitter_first_name": review.submitter.firstName,
          "submitter_last_name": review.submitter.lastName,
          "submitter_email": review.submitter.email,
          "team_name": team.name,
          "subject_name": team.subject.name,
          "subject_state": team.subject.state,
          "emotionalResponse": review.emotionalResponse,
          "empathy": review.empathy,
          "managesOwn": review.managesOwn,
          "cooperatively": review.cooperatively,
          "positiveBelief": review.positiveBelief,
          "resilienceFeedback": review.resilienceFeedback,
          "calm": review.calm,
          "change": review.change,
          "newIdeas": review.newIdeas,
          "workDemands": review.workDemands,
          "proactive": review.proactive,
          "influences": review.influences,
          "clearInstructions": review.clearInstructions,
          "easilyExplainsComplexIdeas": review.easilyExplainsComplexIdeas,
          "openToShare": review.openToShare,
          "tone": review.tone,
          "crossTeam": review.crossTeam,
          "distractions": review.distractions,
          "eyeContact": review.eyeContact,
          "signifiesInterest": review.signifiesInterest,
          "verbalAttentiveFeedback": review.verbalAttentiveFeedback
        });
      }
    } catch (err) {
      // Ignore
    }
  }
  return res.status(200).json(results);
});
 
if (config.NODE_ENV === "production") {
  // TODO: Restrict /docs/ access to developers and coreable people
  app.use(expressStatic(join(__dirname + '/../public/')));
  app.use(expressStatic(join(__dirname + '/../docs/')));
  app.get('/docs/*', (req, res) => {
    res.sendFile(join(__dirname + '/../docs/index.html'));
  });
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