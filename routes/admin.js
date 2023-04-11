const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Db/user");
const Product = require("../Db/productkey");
const Mac = require("../Db/mac");

router.get("/user", async (req, res) => {
  let mainResult = [];

  let result = await User.find({});
  for (let i = 0; i < result.length; i++) {
    let keyResult = await Product.find({ user_id: result[i]._id });
    if (keyResult.length) {
      let macResult = await Mac.find({ productKey: keyResult[0].productKey });
      if (macResult.length) {
        let obj = {
          key: i+1,
            id: result[i]._id,
          name: result[i].name,
          email: result[i].email,
          productKey: keyResult[0].productKey,
          mac: macResult[0].mac,
        };
        mainResult.push(obj);
      } else {
        let obj = {
          key: i+1,
            id: result[i]._id,
          name: result[i].name,
          email: result[i].email,
          productKey: keyResult[0].productKey,
          mac: "Not Running",
        };
        mainResult.push(obj);
      }
    } else {
      let obj = {
        key: i+1,
        id: result[i]._id,
        name: result[i].name,
        email: result[i].email,
        productKey: "Not Purchased",
        mac: "Not Running",
      };
      mainResult.push(obj);
    }
  }

  res.status(200).json(mainResult);
});
module.exports = router;
