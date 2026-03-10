const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "simple-tasks",
      version: "1.0.0",
      description: "This backend project for my simple-tasks",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
  },
  apis: ["./routes/taskRoutes"], // where your API routes are
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;