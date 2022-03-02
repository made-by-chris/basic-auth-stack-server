const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/Message");

const {
  getAllMessages,
  createMessage,
  getMessage,
  updateMessage,
  deleteMessage,
} = MessageController;

router.route("/").get(getAllMessages).post(createMessage);

router.route("/:id").get(getMessage).put(updateMessage).delete(deleteMessage);

module.exports = router;
