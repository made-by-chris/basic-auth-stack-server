const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../utilities/jwt");

router
  .route("/")
  .get(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
  .post(async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.send({
        message: "User created successfully",
        data: user,
        success: true,
        jwt: jwt.generateToken({ id: user._id }),
      });
    } catch (error) {
      switch (error.code) {
        case 11000:
          res.status(400).send({
            message:
              "User with this email already exists, please try logging in",
            success: false,
            data: error,
          });
          break;
        default:
          res.status(400).send({
            message: error.message,
            success: false,
            data: error,
          });
      }
    }
  });

router.route("/login").post(async (req, res) => {
  console.log(req.body.email, req.body.password);
  try {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error) {
        console.log(error);
        res.send({
          message: error.message,
          success: false,
          data: error,
        });
      } else {
        console.log(req.body.email + " logged in successfully");
        res.send({
          message: "User logged-in successfully",
          data: user,
          success: true,
          jwt: jwt.generateToken({ id: user._id }),
        });
      }
    });
  } catch (error) {
    switch (error.code) {
      default:
        console.log(req.body.email + " failed to login  ");
        res.status(400).send({
          message: error.message,
          success: false,
          data: error,
        });
    }
  }
});

router.get("/me", async (req, res) => {
  if (req.token.id) {
    try {
      const user = await User.findById(req.token.id);
      if (!user) {
        res.status(404).send({
          message: "User not found",
          success: false,
          data: user,
        });
      } else {
        res.send({
          message: "User found",
          success: true,
          data: user,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: error,
      });
    }
  } else {
    res.send({
      message: "You are not logged in",
      success: false,
    });
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const user = await User.find({ _id: req.params.id });
    res.json(user);
  })
  .put(async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json(user);
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  });

module.exports = router;
