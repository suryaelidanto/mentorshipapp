const dotenv = require("dotenv");
dotenv.config();

const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
});

let environment;
if (process.env.NODE_ENV === "production") {
  environment = "production";
} else if (process.env.NODE_ENV === "staging") {
  environment = "staging";
} else {
  environment = "development";
}

console.log(environment);

const serverUrls = {
  development: "http://localhost:5000",
  staging: "https://mentorshipapp-staging.up.railway.app",
  production: "https://mentorshipapp-production.up.railway.app",
};

const doc = {
  info: {
    title: "MentorshipApp API Docs",
    description: "Welcome to my API Docs",
  },
  servers: [
    {
      url: serverUrls[environment],
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
        required: [
          "contactLink",
          "meetingLink",
          "position",
          "institution",
          "description",
        ],
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
        required: [
          "contactLink",
          "meetingLink",
          "position",
          "institution",
          "description",
        ],
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
