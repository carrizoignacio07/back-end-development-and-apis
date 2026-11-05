import express from "express";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/", (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  res.status(status).json({
    error: err.message,
  });
})

app.get("/", (req, res) => {
  res.json({ message: "Auth API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
