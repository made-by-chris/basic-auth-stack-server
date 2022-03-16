const express = require("express");
const Message = require("../models/Message");

async function getAllMessages(request, response) {
  const messages = await Message.find({});
  response.json(messages);
}

async function createMessage(request, response) {
  const msg = {
    from: { required: true, type: String },
    to: { required: true, type: String },
    message: { required: true, type: String },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  };

  const res = await Message.create(request.body);
  response.send(res);
}

async function getMessage(request, response) {
  const message = await Message.find({ _id: request.params.id });
  response.json(message);
}
async function updateMessage(request, response) {
  const message = await Message.findOneAndUpdate(
    { _id: request.params.id },
    request.body,
    {
      new: true,
    }
  );
  response.json(message);
}
async function deleteMessage(request, response) {
  const message = await Message.findByIdAndDelete(request.params.id);
  response.json(message);
}

const MessageController = {
  getAllMessages,
  createMessage,
  getMessage,
  updateMessage,
  deleteMessage,
};

module.exports = MessageController;
