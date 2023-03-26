const mongoose = require("mongoose");
require("dotenv").config();
const DB_URL = process.env.DB_URL;
mongoose.set("strictQuery", true);
mongoose.connect(DB_URL);

mongoose.connection.on("error", (err) => {
  console.log("Connection failed");
});
mongoose.connection.on("connected", (connected) => {
  console.log("Connected with database");
});
