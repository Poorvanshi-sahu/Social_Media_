const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_URI);

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`Database connected ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
