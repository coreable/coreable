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