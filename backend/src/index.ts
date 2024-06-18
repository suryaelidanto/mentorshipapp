import "module-alias/register";

import express from "express";
import mentorshipRoutes from "@/routes/mentorship";
import userInfoRoutes from "@/routes/user-info";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger-output.json";
import "dotenv/config";

const app = express();

app.use("/docs", swaggerUi.serve);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  }),
);

app.use(express.json());
app.use("/mentorships", mentorshipRoutes);
app.use("/user-infos", userInfoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
