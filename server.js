const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.URI || "mongodb://localhost:27017/chat-app";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(URI)
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.log(err));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
