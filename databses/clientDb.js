const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const financeDb = mongoose.createConnection(process.env.CLIENT_MONGODB_URI);

module.exports = financeDb;
