require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./scripts/connectMongoDB");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
