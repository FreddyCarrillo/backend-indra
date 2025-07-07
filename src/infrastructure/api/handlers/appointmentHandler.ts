import express from 'express';
import { appointmentRoutes } from '../routes/appointmentRoutes';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

app.use('/', appointmentRoutes);

export const handler = serverless(app);
