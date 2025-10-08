require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const isDev = process.env.NODE_ENV !== 'production';

const doc = {
  info: {
    title: "Nick's Contact List API",
    description: 'A simple API to manage a contact list with CRUD operations'
  },
  host: isDev ? 'localhost:3000' : process.env.RENDER_EXTERNAL_URL,
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
