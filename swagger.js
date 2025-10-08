require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Nick's Contact List API",
    description: 'A simple API to manage a contact list with CRUD operations'
  },
  host: process.env.RENDER_EXTERNAL_URL,
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
