import express from 'express';
import { configureSwagger } from './infrastructure/api/middleware/swaggerMiddleware';
import { appointmentRoutes } from './infrastructure/api/routes/appointmentRoutes';
import { getHomeInfo } from './infrastructure/api/controllers/homeController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
configureSwagger(app);

app.get('/', getHomeInfo);
app.use('/', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Servidor de desarrollo ejecutándose en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
});
