const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require('multer');
const path = require('path');

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");
// const upload = require("./middleware/multerConfig");
const photoRouter = require("./routes/uploadPhoto");

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

// const upload = multer({ storage: storage });
function checkRoute() {
  console.log("/checkusername route");
}

// API Routes
app.use("/users", usersRouter);
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", authenticationRouter);
app.use("/photo", tokenChecker, photoRouter);
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
// app.use("/users", checkRoute, usersRouter);
// app.use("/get-photo", tokenChecker, photoRouter);


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
// const multer = require('multer');
const Photo = require('./models/photo');
// require("./models/photo");
// const Photo = mongoose.model(Photo);

app.get("/", async (req, res) => {
  res.send("Success!");
});

// app.listen(3001, () => {
//   console.log("Server started");
// })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../frontend/src/photos/')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   }
// })

// const upload = multer({ storage: storage })

// app.post("/upload-photo", upload.single("photo"), async (req, res) => {
//   console.log(req.file)
//   const photoName = req.file.filename;
//   const photoPath = req.file.path;
//   const dateNow = Date.now() 
//   const user_id = req.user_id

//   try {
//     await Photo.create({photoFileName: photoName, photoFilePath: photoPath, photoFileDate: dateNow, user_id: user_id})
//     res.json({status:"ok"})
//   } catch (error) {
//     res.json({status:"error"})
//   }

// });


// app.get("/get-photo", async(req, res) => {
//   try {
//     // Photo.find({ user_id: req.user_id }).then(data => {
//     //   res.send({status: "ok", data: data})
//     // })
//     res.json({ status: "ok"})
//   } catch (error) {
//     res.json({status:"error"})
//   }
// })

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
