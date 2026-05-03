import express from "express";

const app = express();
const port = 3000;

app.get("/hello", (_req, res) => {
  res.json({ message: "Hello, World!" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port);
}

export { app };
