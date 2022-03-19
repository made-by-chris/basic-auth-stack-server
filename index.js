const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const connectToDB = require("./models");
const cors = require("cors");
const messageRouter = require("./routes/Message");
const userRouter = require("./routes/User");
// const session = require("express-session");
const auth = require("./utilities/auth");
const jwt = require("./utilities/jwt");

// loggedInOnlyRoute (WEBPAGE) DONE
// AUTHENTICATION
// act of proving your identity / your rights
// AUTHORIZATION
// inspection of your identity / your rights

// ERROR HANDLING in routes
// push to heroku
// create react / html file to talk to server with CORS
// create a /search route
// get messages by groupID

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "dev_blabla",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use((req, res, next) => {
//   req.session.requestCount = req.session.requestCount
//     ? req.session.requestCount + 1
//     : 1;
//   next();
// });

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());
app.use(cors());
app.use(jwt.decodeToken);

app.use("/messages", messageRouter);
app.use("/users", userRouter);

app.get("/loggedInPage", auth.isLoggedIn, (req, res) => {
  res.send(`<html>
  <body>
    <h1>welcome to the logged in page!!!</h1>
  </body>
  </html>`);
});

app.get("/downloads/31209821908", auth.ownsRequestedProduct, (req, res) => {
  res.download(__dirname + "31209821908");
});

app.get("/set-token", (req, res) =>
  res.send(jwt.generateToken({ id: "5ce819935e539c343f141ece" }))
);

app.get("/verify-token", jwt.verifyToken, (req, res) => res.send(req.user));
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Something broke!");
});

connectToDB().then(() => {
  app.listen(PORT, () => console.log("STARTED LISTENING ON PORT " + PORT));
});
