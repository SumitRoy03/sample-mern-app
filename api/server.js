import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
dotenv.config();

app.use(express.json());

app.use("/api/", authRoute);
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connectdb();
  console.log(`server running on ${PORT}`);
});
