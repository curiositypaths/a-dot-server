import express from "express";
import db from "../models/index";
import Auth from "../services/userRegistration";

const app = express();

app.get("/", (req, res) => res.json({ message: "In bocca al lupo!" }));

export default app;
