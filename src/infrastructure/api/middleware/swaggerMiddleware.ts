import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from '../../swagger/swagger.config';

export const configureSwagger = (app: Express): void => {

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }'
    }));

    app.get('/swagger.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(swaggerConfig);
    });
}; 