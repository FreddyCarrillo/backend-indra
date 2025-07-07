declare module 'serverless-http' {
  import { Express } from 'express';
  
  function serverless(app: Express): (event: any, context: any) => Promise<any>;
  
  export = serverless;
} 