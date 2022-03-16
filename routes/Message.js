const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/Message");
const auth = require("../utilities/auth");

const {
  getAllMessages,
  createMessage,
  getMessage,
  updateMessage,
  deleteMessage,
} = MessageController;

router.route("/").get(getAllMessages).post(auth.isLoggedIn, createMessage);

router.route("/:id").get(getMessage).put(updateMessage).delete(deleteMessage);

module.exports = router;
