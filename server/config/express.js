const path = require("path"),
  express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  exampleRouter = require("../routes/examples.server.routes"),
  dbKey = require("./dev"),
  crypto = require("crypto"),
  mongoose = require("mongoose"),
  multer = require("multer"),
  GridFsStorage = require("multer-gridfs-storage");

module.exports.init = () => {
  /* 
        connect to database
        - reference README for db uri
    */

  mongoose
    .connect(process.env.DB_URI || dbKey.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB Connected...");
      // init stream
      let gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads",
      });
    })
    .catch((err) => console.log(err));

  // Storage
  const storage = new GridFsStorage({
    url: process.env.DB_URI || dbKey.MONGO_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename =
            buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads",
          };
          resolve(fileInfo);
        });
      });
    },
  });

  const upload = multer({
    storage,
  });

  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  // initialize app
  const app = express();

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());

  //router for uploading files to mongodb
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.send("Uploaded file!");
  });

  // add a router for non-upload api calls
  app.use("/api", exampleRouter);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  return app;
};
