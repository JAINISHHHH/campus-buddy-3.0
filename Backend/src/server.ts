import app from "./app.js";
import path from "path";
import express from "express";

const PORT = process.env.PORT || 5000;

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.listen(PORT, () => {
  console.log(
    `🚀 Campus Buddy Backend running on http://localhost:${PORT}`
  );
});