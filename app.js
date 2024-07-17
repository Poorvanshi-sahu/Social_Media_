const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/.env" });
}

// using middleware
// builtin middlware to parse the json payload get through request body
// application/json
app.use(express.json({ limit: "50mb" }));
// middlware to handle url encoded form data, has access to req and res
// application/x
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const post = require("./routes/post");
const user = require("./routes/users");

// middleware to connect the frontend
app.use(express.static(path.join(__dirname, "build")));

// middlewares to set the base route
app.use("/api/v1", post);
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

// method to connect to database, cloudinary and then start the server
const start = async () => {
  try {
    await connectDatabase();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
