const express = require('express');
const app = express();
const port = 3000;


const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const axios = require('axios');

const options = {
    swaggerDefinition: {
      info: {
        title: 'Language Understanding API',
        version: '1.0.0',
        description: 'Final Project documentation'
      },
      host: 'localhost:3000',
      basePath: '/'
    },
    apis: ['./server.js'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use(cors());
  app.use