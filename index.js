const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const server = http.createServer(app);

// Database
const connectToDatabase = require("./databses/mainDb");
connectToDatabase();

// Middlewares

// const Headers = require("./middlewares/header");

// const ReqDomain = require("./middlewares/reqdomain");
// app.use(ReqDomain);

//Routes

// Add redirection to fitwin.co
app.get("/", (req, res) => {
  res.redirect("https://fitwin.co");
});

const Website = require("./routes/website/index");
app.use("/website", Website)

// connection
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});