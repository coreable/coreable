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

import { app } from './express';
import { sequelize } from './sequelize';
import { generator } from './generator';
import { config } from '../config/config';

// run the startup config
app._startup = (async () => {
  switch (config.NODE_ENV) {
    case "pipeline":
    case "test":
      await sequelize.sync({ force: true });
      await generator();
      break;
    case "development":
      await sequelize.sync({ force: false });
      break;
    case "production":
    default:
      await sequelize.authenticate();
      break;
  }
})().then(() => true);

export { app };