import express from "express";
import db from "../models/index";

const app = express();

app.get("/", (req, res) => res.json({ message: "In bocca al lupo!" }));

export default app;
