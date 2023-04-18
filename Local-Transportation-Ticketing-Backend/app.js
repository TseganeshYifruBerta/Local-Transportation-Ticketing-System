const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");




// adjusting our request and response
app.use(cors());
const server = http.createServer(app);
app.use(bodyParser.json());


// ROUTES
const authrouter = require("./routes/auth.js");
const userrouter = require("./routes/user.js");
// const bookingrouter = require("./routes/booking.js");
// const paymentrouter = require("./routes/payment.js");
// const schedulerouter = require("./routes/schedule.js");
// const transportationrouter = require("./routes/transportation.js");

// Forwarding the urls to their appropriate route
app.use("/", authrouter);
app.use("/user", userrouter);
// app.use("/booking", bookingrouter);
// app.use("/payment", paymentrouter);
// app.use("/schedule", schedulerouter);
// app.use("/transportation", transportationrouter);


// Test
app.get("/", (req, res) => {
  res.send("A Message from the server");
});
// Connect to db
mongoose.connect(
  process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }
);

const hostname = '127.0.0.1';
const port = process.env.Port || 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});