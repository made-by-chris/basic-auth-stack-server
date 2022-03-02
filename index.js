const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const connectToDB = require("./models");
const Message = require("./models/Message");
const cors = require("cors");
const messageRouter = require("./routes/Message");
const userRouter = require("./routes/User");
const session = require("express-session");

// push to heroku
// create react / html file to talk to server with CORS
// create a /search route
// get messages by groupID

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_blabla",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.session.requestCount = req.session.requestCount
    ? req.session.requestCount + 1
    : 1;
  next();
});

app.use((req, res, next) => {
  console.log(
    req.method,
    req.path,
    req.sessionID,
    `visited ${req.session.requestCount} times.`
  );
  next();
});

app.use(express.json());
app.use(cors());

app.route("/messages").get(async (request, response, next) => {
  const messages = await Message.find({});
  response.json(messages);
});
// ...

app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Something broke!");
});

app.use("/messages", messageRouter);
app.use("/users", userRouter);

connectToDB().then(() => {
  app.listen(PORT, () => console.log("STARTED LISTENING ON PORT " + PORT));
});
