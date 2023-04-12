const express = require('express');
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require("multer");
const passport = require("passport");
const basicAuth = require("./middleware/basicAuth");

const Test01Route = require("./routes/Test01Routes");
const UsersRoute = require("./routes/UsersRoutes");

const app = express();
const port = 3010;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}

app.use(morgan("dev"));
app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: "pettotal", resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
basicAuth();

app.use("/api/test01", Test01Route);
app.use("/api/users", UsersRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`pettotal backend listening on port ${port}`)
})