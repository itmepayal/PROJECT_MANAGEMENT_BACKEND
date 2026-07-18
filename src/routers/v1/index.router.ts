import express from "express";
import authRouter from "../../modules/auth/auth.router";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Gravity API v1",
    version: "1.0.0",
    status: "Running",
    documentation: "/api-docs",
  });
});
v1Router.use("/auth", authRouter);

export default v1Router;
