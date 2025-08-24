import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./config/config.js";

const app = express();

// Middleware
app.use(cors({ origin: config.isDev ? "*" : "https://your-prod-site.com" }));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: `Server running in ${config.nodeEnv} mode 🚀` });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Global error handler
app.use(errorHandler);

export default app;
