import express from "express";
import "dotenv/config";
import cors from "cors";

import cookieParser from "cookie-parser";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";

import path from "path";

// NOTE: dotenv should be before everything (use one liner import see above)
// that directly calls the config()

const app = express();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:5173"], // only allow fetching from that url
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "/frontend/dist");

  // this means server our frontend as static assest
  app.use(express.static(frontendPath));

  // serve other get req to our frontend that are not our api.
  app.use("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Server Listening on PORT: ${PORT}`))
);
