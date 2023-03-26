const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../Db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// use to jwt authentication
// const key = 'this is a key'
router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      // console.log(users);
      if (users.length >= 1) {
        return res.status(200).json({
          error: "This Email id already used",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            // console.log(err);
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                // const token = jwt.sign({
                //     name:result.name,
                //     email:result.email
                // },
                // key,
                // {
                //   expiresIn: "12h"
                // },
                // );
                // console.log(result)
                res.status(200).json({ msg: "success", result });
              })
              .catch((err) => {
                // console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "User does not exist",
        });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (!result) {
            return res.status(401).json({
              msg: "Password Not Matched",
            });
          }
          if (result) {
            // all information give only not send password
            // const token = jwt.sign({
            //     name:user[0].name,
            //     email:user[0].email
            // },
            // key,
            // {
            //   expiresIn: "12h"
            // },
            // );

            res.status(200).json({
              _id: user[0]._id,
              name: user[0].name,
              email: user[0].email,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
