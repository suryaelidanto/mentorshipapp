const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

const doc = {
  info: {
    title: "MentorshipApp API Docs",
    description: "Welcome to my API Docs",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    "@schemas": {
      CreateMentorshipDTO: {
        type: "object",
        properties: {
          contactLink: {
            type: "string",
          },
          meetingLink: {
            type: "string",
          },
          position: {
            type: "string",
          },
          institution: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        required: ["contactLink", "meetingLink"],
      },
      UpdateMentorshipDTO: {
        type: "object",
        properties: {
          contactLink: {
            type: "string",
          },
          meetingLink: {
            type: "string",
          },
          position: {
            type: "string",
          },
          institution: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        required: ["contactLink", "meetingLink"],
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
