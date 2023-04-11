const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
// const User = require('./db/user')
require("./Db/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
console.log(process.env.email)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userRouter = require("./routes/user");
const keyRouter = require("./routes/productkey");
const adminRouter = require("./routes/admin");


app.use("/user", userRouter);
app.use("/productkey", keyRouter);
app.use("/admin", adminRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listening on port on port " + PORT);
});
