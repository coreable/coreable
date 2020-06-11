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

import { config as dotenvConfig, DotenvConfigOutput } from 'dotenv';
import { resolve } from 'path';

export interface CoreableConfig {
  NODE_ENV: string;
  PORT: number;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_DATABASE: string;
  MYSQL_USERNAME: string;
  MYSQL_PASSWORD: string;
  MYSQL_SOCKETPATH: string;
  JWT_SECRET: string;
  SENDGRID_API_KEY: string;
}

const result: DotenvConfigOutput = dotenvConfig({ path: resolve(__dirname + `/env/${process.env.NODE_ENV}.env`) });
if (result.error) {
  throw result.error;
}

const config: CoreableConfig = result.parsed as any;

export { config };