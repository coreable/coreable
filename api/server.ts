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

import { config } from './config/config';
import { app } from './lib/startup';
import { createServer } from 'http';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test' | 'pipeline';
    }
  }
}

const server: any = createServer(app);

server._done = (async() => {
  await app._startup;
})().then(() => server.listen(config.PORT, () => {
  if (config.NODE_ENV === "development") {
    console.log("\n", "\x1b[31m", `http://localhost:${process.env.PORT}/graphql`, "\x1b[37m", "\n");
  }
})).then(() => true);

export { server };