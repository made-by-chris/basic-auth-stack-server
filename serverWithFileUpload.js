const express = require("express");
const multer = require("multer");
var path = require("path");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.use(express.static("uploads"));

app.get("/", (req, res) => {
  console.log(__dirname);
  console.log(req.method + " " + req.url + " request received");
  res.sendFile(__dirname + "/file-form.html");
});

app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  function (req, res, next) {
    if (!req.file) {
      res.send("No file received");
      return;
    }
    console.log(req.method + " " + req.url + " request received");
    console.log("file: " + JSON.stringify(req.file));
    res.send(
      `<h2>Here is the picture:</h2><img src="https://cdn.cloudinary.com/projectID/${req.file.filename}" alt=”something”/>`
    );
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);

app.listen(8080, () => console.log("STARTED LISTENING ON PORT 8080"));

// konto-1273812-auszug-2019-01-01.pdf1646336963040
// 1646336963040 + extensionOf(originalname)
// 1646336963040.pdf
// special characters
