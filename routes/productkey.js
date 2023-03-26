const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");
const Product = require("../Db/productkey");
require("dotenv").config();

const sendMail = process.env.email;
const sendPassword = process.env.pass;

const sendProductkeyMail = async (name, email, Key) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      auth: {
        user: sendMail,
        pass: sendPassword,
      },
    });

    const mailOptions = {
      from: sendMail,
      to: email,
      subject: "Don't Share",
      html: `Hi ${name}, <br /> <br /> 
                This is your product Key <h3>${Key}</h3>. Through this key Unlock the Product and enjoy our services.
                
                <br /> <br />
                <p>Don't share this Key with anyone.</p>

                <br/>
                Thank you.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mail sent successfully", info);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function generateProductKey() {
  var tokens = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    chars = 5,
    segments = 4,
    keyString = "";

  for (var i = 0; i < segments; i++) {
    var segment = "";

    for (var j = 0; j < chars; j++) {
      var k = Math.floor(Math.random() * (35 - 0 + 1)) + 0;
      segment += tokens[k];
    }

    keyString += segment;

    if (i < segments - 1) {
      keyString += "-";
    }
  }
  return keyString;
}

router.post("/", (req, res, next) => {
  Product.find({ user_id: req.body._id })
    .exec()
    .then((product) => {
      if (product.length >= 1) {
        sendProductkeyMail(
          req.body.name,
          req.body.email,
          product[0].productKey
        );
        res.status(200).json(product[0]);
      } else {
        const key = generateProductKey();
        const productKeys = new Product({
          user_id: req.body._id,
          productKey: key,
        });
        productKeys
          .save()
          .then((result) => {
            sendProductkeyMail(
              req.body.name,
              req.body.email,
              result.productKey
            );
            res.status(200).json(result);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
});
module.exports = router;
