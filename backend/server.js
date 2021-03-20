import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";

const PORT = process.env.PORT || 8000;
const app = express();

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => console.log(JSON.stringify(error)));

// Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// Routes Middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// Port
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
