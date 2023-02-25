import express from "express";
import mongoose from "mongoose";
import router from "./authRoute.js";

const PORT = process.env.PORT || 5000;

const BASE_URL =
  "mongodb+srv://user:bekaseka@auth-with-nodejs.rsyskgp.mongodb.net/auth-nodejs?retryWrites=true&w=majority";

const app = express();
app.use(express.json());
app.use("/auth", router);

const start = async () => {
  try {
    await mongoose.connect(BASE_URL);
    app.listen(PORT, () => console.log(PORT, "hello"));
  } catch (error) {}
};

start();
