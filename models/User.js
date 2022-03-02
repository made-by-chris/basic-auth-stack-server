const mongoose = require("mongoose");

// a schema is a description of what data should look like
const UserSchema = new mongoose.Schema(
  {
    name: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
  },
  { timestamps: true }
);

// model is the tool you use to interact with DB
const User = mongoose.model("User", UserSchema);

module.exports = User;
