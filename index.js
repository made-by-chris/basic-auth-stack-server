const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();
const connectToDB = require("./models");

//1. connect to database
//2. import Message Model

// a middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());

app
  .route("/messages")
  .get((request, response) => {
    response.send("get request received");
  })
  .post((request, response) => {
    console.log(request.body);
    response.send(`you posted ${JSON.stringify(request.body)}`);
  });

app
  .route("/messages/:id")
  .get((request, response) => {
    response.send(`you requested ${request.params.id}`);
  })
  .put((request, response) => {
    response.send("put request received");
  })
  .delete((request, response) => {
    response.send("delete request received");
  });

connectToDB().then(() => {
  app.listen(PORT, () => console.log("STARTED LISTENING ON PORT " + PORT));
});
