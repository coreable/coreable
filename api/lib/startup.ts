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

import { Server } from 'http';
import { sequelize } from './sequelize';
import { generator } from './generator';

// server
let server = Object.create(Server);
server.prototype.constructor = Server;

// run the startup config
server.startup = (async () => {
  switch (process.env.NODE_ENV) {
    case "production":
      await sequelize.authenticate();
      break;
    case "pipeline":
      await sequelize.sync({ force: true });
      await generator();
      break;
    case "test":
      await sequelize.sync({ force: true });
      await generator();
      break;
    case "development":
      await sequelize.sync({ force: false });
      break;
    default:
      await sequelize.authenticate();
      break;
  }
})().then(() => true);

export { server };