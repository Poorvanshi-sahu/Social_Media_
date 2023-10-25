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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

const post = require("./routes/post");
const user = require("./routes/users");

app.use(express.static(path.join(__dirname, "./build/index.html")));



app.use("/api/v1", post);
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

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
