const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
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

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
