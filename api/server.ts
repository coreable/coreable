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

// Import config from /env/*.env to the node environment variables
// Configuration done before importing any other components
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname + `/env/${process.env.NODE_ENV}.env`) });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test' | 'pipeline';
    }
  }
}

// Being API source code
import { server } from './lib/startup';
import { app } from './lib/express';
import { createServer, Server } from 'http';

export default (
  async(): Promise<Server> => {
    await server.startup;
    return createServer(app).listen(
      process.env.PORT, () => {
        if (process.env.NODE_ENV === "development") {
          console.log("\x1b[31m", `http://localhost:${process.env.PORT}/graphql`, "\x1b[37m");
        }
      }
    );
  }
)();