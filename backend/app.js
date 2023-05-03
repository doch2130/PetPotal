const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");

const basicAuth = require("./middleware/basicAuth");
const Test01Route = require('./routes/Test01Routes');
const UsersRoute = require('./routes/UsersRoutes');
const AnimalsRoute = require('./routes/AnimalsRoutes');
const MateBoardRoute = require('./routes/MateBoardRoutes');

const app = express();
const port = 3010;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(cookieParser('petpotal'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(
  session({ 
    name: "petpotal",
    secret: 'pettotal',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1,
    },
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
basicAuth();

app.use('/static', express.static(__dirname + '/data/mateTextEditorImg'));
app.use('/api/test01', Test01Route);
app.use('/api/users', UsersRoute);
app.use('/api/animals', AnimalsRoute);
app.use('/api/mateBoard', MateBoardRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`pettotal backend listening on port ${port}`);
});
