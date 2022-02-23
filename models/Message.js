const mongoose = require("mongoose");

// a schema is a description of what data should look like
const MessageSchema = new mongoose.Schema(
  {
    from: { required: true, type: String },
    to: { required: true, type: String },
    message: { required: true, type: String },
  },
  { timestamps: true }
);

// model is the tool you use to interact with DB
const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
