const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const WebsiteDb = mongoose.createConnection(process.env.WEBSITE_MONGODB_URI);

module.exports = WebsiteDb;
