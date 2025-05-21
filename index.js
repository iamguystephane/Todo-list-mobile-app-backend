const express = require("express");
const app = express();
const connectDB = require("./scripts/connectMongoDB");

connectDB();

app.get("/", (req, res) => {
  res.send("<h1> Hello, found my application </h1>");
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
