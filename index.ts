var cors = require("cors");
const express = require("express");
const app = express();
const port = 3030;
const functions = require("firebase-functions");

// app.use(function (req:any, res:any, next:any) {
//   // Website you wish to allow to connect
//   // res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   //Add Because Google has SameSite Strict as Defualt
//   // res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=None")

//   // Request headers you wish to allow
//   // res.setHeader(
//   //   "Access-Control-Allow-Headers",
//   //   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   // );

//   //es.setHeader("Access-Control-Request-Headers", true);

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

var corsOptionsObj = function (req: any, res: any, next:any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
};

export const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://localhost:80",
    "http://localhost:3001",
    "*",
  ], 
};

app.use(cors(corsOptions)); // Use the cors middleware with your options
// app.use(corsOptionsObj)
app.use(express.json());

//path API
var userRoutes = require("./routes/userRoutes");
var authRoutes = require("./routes/authRoutes");

// Route
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;

exports.api = functions.https.onRequest(app)
 