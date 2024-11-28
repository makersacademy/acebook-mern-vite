const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");

// const multer = require('multer');
// const upload = multer("api/uploads");

const app = express();

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());
// app.use(express.bodyParser({limit: '50mb'}));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true}))

// API Routes
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);

// 404 Handler


// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

/////////////////
const mongoose = require('mongoose');
const multer = require('multer');
const Photo = require('./models/photo');
// require("./models/photo");
// const Photo = mongoose.model(Photo);

app.get("/", async (req, res) => {
  res.send("Success!");
});

// app.listen(3001, () => {
//   console.log("Server started");
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/photos/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
})

const upload = multer({ storage: storage })

app.post("/upload-photo", upload.single("photo"), async (req, res) => {
  console.log(req.file)
  const photoName = req.file.filename;
  const photoPath = req.file.path;
  const dateNow = Date.now() //date currently doesn't work
  // userId

  try {
    await Photo.create({photoFileName: photoName, photoFilePath: photoPath, photoFileDate: dateNow})
    res.json({status:"ok"})
  } catch (error) {
    res.json({status:"error"})
  }

});

// fieldname: 'photo',
//   originalname: 'Screenshot 2024-11-26 at 12.02.01.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '../frontend/src/photos/',
//   filename: '1732811636759Screenshot 2024-11-26 at 12.02.01.png',
//   path: '../frontend/src/photos/1732811636759Screenshot 2024-11-26 at 12.02.01.png',
//   size: 235934

app.get("/get-photo", async(req, res) => {
  try {
    // Photo.find({}).then(data => {
    //   res.send({status: "ok", data: data})
    // })
    res.json({ status: "ok"})
  } catch (error) {
    res.json({status:"error"})
  }
})

function listRoutes() {
  const routes = [];
  app._router.stack.forEach((middleware) => {
      if (middleware.route) {
          const path = middleware.route.path;
          console.log(middleware.route.methods)
          console.log(path)
      }
  });
  console.log(routes);
}

// Call to list the routes
listRoutes();

app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

module.exports = app;
