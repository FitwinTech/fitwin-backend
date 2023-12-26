const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the MongoDB Default database");
  } catch (error) {
    console.error(`Error connecting to the Default database: ${error}`);
  }
};

module.exports = connectToDatabase;
