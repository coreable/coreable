import dotenv from 'dotenv';
import { resolve } from 'path';
const result: any = dotenv.config({ path: resolve(__dirname + `/env/${process.env.NODE_ENV}.env`) });
if (result.error) {
  throw result.error;
}
const config = result.parsed;
export { config };