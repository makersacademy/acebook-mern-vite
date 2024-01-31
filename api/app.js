const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer  = require('multer')

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");

const app = express();

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// API Routes
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(express.static(__dirname + './frontend/public'));
app.use('/uploads', express.static('uploads'));

app.post('/users', upload.single('profile_pic'), function (req, res, next) {
  // req.file is the `profile_pic` file
  // req.body will hold the text fields, if there were any
  console.log(JSON.stringify(req.file));
  console.log(req.body);

  // Handle the signup logic here using req.body
  // Example: signup(req.body.full_name, req.body.email, req.body.password);

  var response = '<a href="/">Home</a><br>';
  response += "Files uploaded successfully.<br>";
  response += `<img src="${req.file.path}" /><br>`;
  return res.send(response);
});


module.exports = app;
