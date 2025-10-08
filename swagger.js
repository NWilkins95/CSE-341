const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Nick's Contact List API",
    description: 'A simple API to manage a contact list with CRUD operations'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);