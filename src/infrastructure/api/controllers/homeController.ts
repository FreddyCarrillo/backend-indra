import { Request, Response } from 'express';

export const getHomeInfo = (_req: Request, res: Response): void => {
    res.json({
        message: 'User Service API',
        version: '1.0.0',
        environment: 'development',
        documentation: '/docs',
        endpoints: {
            'POST /users': 'Crear un nuevo usuario',
            'GET /docs': 'Documentación de la API'
        }
    });
}; 