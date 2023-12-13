const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const multer = require("multer");
const app = express();
// const bcrypt=require('bcrpyt');
const collection = require("./server/Model/authentication");
const session = require("express-session");

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
// log request
app.use(morgan("tiny"));

const controller = require("./server/Controller/controller");

//moongoDB connection
const connectDB = require("./server/Database/connection");
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "12345",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 60 * 60 * 1000,
    },
  })
);
// parse req to body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
// set view engine
app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"))
// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/avatars", express.static(path.resolve(__dirname, "avatars")));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = require("./server/Routes/router");
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
