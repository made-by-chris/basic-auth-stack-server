const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const connectToDB = require("./models");
const Message = require("./models/Message");
const cors = require("cors");

// push to heroku
// create react / html file to talk to server with CORS
// create a /search route
// get messages by groupID

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(cors());

app
  .route("/messages")
  .get(async (request, response) => {
    const messages = await Message.find({});
    response.json(messages);
  })
  .post(async (request, response) => {
    const res = await Message.create(request.body);
    response.send(res);
  });

app
  .route("/messages/:id")
  .get(async (request, response) => {
    const message = await Message.find({ _id: request.params.id });
    response.json(message);
  })
  .put(async (request, response) => {
    const message = await Message.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      {
        new: true,
      }
    );
    response.json(message);
  })
  .delete(async (request, response) => {
    const message = await Message.findByIdAndDelete(request.params.id);
    response.json(message);
  });

connectToDB().then(() => {
  app.listen(PORT, () => console.log("STARTED LISTENING ON PORT " + PORT));
});
