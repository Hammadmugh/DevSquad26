const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const errorHandler = require("../src/middlewares/errorHandler");
const dotenv = require("dotenv").config();
const authRoutes = require("../src/routes/authRoutes");
const taskRoutes = require("../src/routes/taskRoutes");
const dbConnect = require("../src/config/dbConnect");
const app = express();

dbConnect();

// Middleware
app.use(express.json());

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui { background-color: #fafafa; }",
    customCdnUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-dist@3",
    swaggerOptions: {
      url: "https://dev-squad26-week3day2-backend.vercel.app/swagger-json",
    },
  })
);

// Serve Swagger JSON
app.get("/swagger-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handler
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});