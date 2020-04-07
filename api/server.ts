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

/**
 * Author: Jake Walklate <jakewalklate@gmail.com> (svnty)
 * Date: Tue 7 Apr 2020
 * Purpose: The application access layer to perform create, read, update and delete database
 * operations for Coreable's web and mobile applications.
 */

import { server } from './lib/startup';
import { app } from './lib/express';
import { createServer, Server } from 'http';
import * as config from './config/config.json';

let link =
`
View GraphiQL, an in-browser IDE, to explore your site's data and schema

  http://localhost:${config.HTTP.PORT}/graphql
`;

export default (
  async(): Promise<Server> => {
    await server.startup;
    return createServer(app).listen(
      config.HTTP.PORT, () => {
        if (process.env.NODE_ENV === "development") {
          console.log("\x1b[31m", link, "\x1b[37m");
        }
      }
    );
  }
)();