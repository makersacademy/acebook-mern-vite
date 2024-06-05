const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const passwordRoutes = require('./routes/password');

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");

const app = express();

// Define the path for the uploads directory outside the api folder
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Allow requests from any client
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// Serve the uploads directory as static files
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/password', passwordRoutes);
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
// app.use("/comments", commentsRouter);
app.use("/tokens", authenticationRouter);
app.use(express.static('public'));

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

module.exports = app;
