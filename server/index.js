const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/chat-app")
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
