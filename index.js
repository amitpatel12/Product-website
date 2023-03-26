const express = require("express");
const mongoose = require("mongoose");
require("./Db/config");
const app = express();
// const User = require('./db/user')
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
const keyRouter = require("./routes/productkey");


app.use("/user", userRouter);
app.use("/productkey", keyRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listening on port on port " + PORT);
});
