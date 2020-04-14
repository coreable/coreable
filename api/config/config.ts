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
}

const result: DotenvConfigOutput = dotenvConfig({ path: resolve(__dirname + `/env/${process.env.NODE_ENV}.env`) });
if (result.error) {
  throw result.error;
}

const config: CoreableConfig = result.parsed as any;

export { config };