import awsServerlessExpress from 'aws-serverless-express';
import { app } from './lib/express';

const server = awsServerlessExpress.createServer(app); 

exports.handler = (event: any, context: any) => { awsServerlessExpress.proxy(server, event, context) }
