const express = require("express");
const router = express.Router();
const User = require("../models/User");

router
  .route("/")
  .get(async (request, response) => {
    const users = await User.find({});
    response.json(users);
  })
  .post(async (request, response) => {
    const res = await User.create(request.body);
    response.send(res);
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
