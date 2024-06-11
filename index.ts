import cors from 'cors';
const express = require("express");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//path API
var userRoutes = require("./routes/userRoutes");
var authRoutes = require("./routes/authRoutes");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/user", userRoutes);
app.use("/auth", authRoutes);


module.exports = app;
