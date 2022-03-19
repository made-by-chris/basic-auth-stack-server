const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("../utilities/jwt");

router
  .route("/")
  .get(async (request, response) => {
    const users = await User.find({});
    response.json(users);
  })
  .post(async (request, response) => {
    try {
      const res = await User.create(request.body);
      response.send({
        message: "User created successfully",
        data: res,
        success: true,
        jwt: jwt.generateToken({ id: res._id }),
      });
    } catch (error) {
      switch (error.code) {
        case 11000:
          response.status(400).send({
            message:
              "User with this email already exists, please try logging in",
            success: false,
            data: error,
          });
          break;
        default:
          response.status(400).send({
            message: error.message,
            success: false,
            data: error,
          });
      }
    }
  });

router.get("/me", async (request, response) => {
  if (request.token.id) {
    try {
      const user = await User.findById(request.token.id);
      if (!user) {
        response.status(404).send({
          message: "User not found",
          success: false,
          data: user,
        });
      } else {
        response.send({
          message: "User found",
          success: true,
          data: user,
        });
      }
    } catch (error) {
      response.status(400).send({
        message: error.message,
        success: false,
        data: error,
      });
    }
  } else {
    response.send({
      message: "You are not logged in",
      success: false,
    });
  }
});

router
  .route("/:id")
  .get(async (request, response) => {
    const user = await User.find({ _id: request.params.id });
    response.json(user);
  })
  .put(async (request, response) => {
    const user = await User.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      {
        new: true,
      }
    );
    response.json(user);
  })
  .delete(async (request, response) => {
    const user = await User.findByIdAndDelete(request.params.id);
    response.json(user);
  });

module.exports = router;
