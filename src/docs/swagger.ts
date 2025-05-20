import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Drinkeat API',
      version: '1.0.0',
      description: 'Documentation de l’API e-commerce Drinkeat',
    },
    components: {},
    security: [],
    servers: [
      { url: 'http://localhost:3000/api/v1', description: 'Développement' },
    ],
  },
  apis: ['./src/routes/**/*.ts', './src/docs/schemas/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
