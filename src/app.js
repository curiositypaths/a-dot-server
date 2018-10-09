import express from "express";

const app = express();

app.get("/", (req, res) => res.json({ message: "In bocca al lupo!" }));

export default app;