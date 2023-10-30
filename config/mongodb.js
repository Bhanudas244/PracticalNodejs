const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5ytfi15.mongodb.net/${process.env.DB_NAME}`
  )
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
