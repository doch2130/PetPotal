const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const Passport = require('./middleware/passport/Passport');
const UsersRoute = require('./routes/UsersRoutes');
const AnimalsRoute = require('./routes/AnimalsRoutes');
const MateBoardRoute = require('./routes/MateBoardRoutes');
const OpenMateBoardRoute = require("./routes/OpenMateBoardRoutes");

const app = express();
const port = 6500;

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.SERVER_HOST : process.env.LOCAL_HOST,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
// app.use(cors(corsOptions));
app.use(cookieParser('petpotal'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    name: 'petpotal',
    secret: 'petpotal',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1,
    }
  })
);

app.use(passport.initialize());
Passport();

app.use('/static', express.static(__dirname + '/data/mateTextEditorImg'));
app.use('/static2', express.static('./data/profile'));
app.use('/static3', express.static(__dirname + '/data/mateBoardImg'));
app.use('/api/users', UsersRoute);
app.use('/api/users/profile', express.static('./data/profile'));
app.use('/api/animals', AnimalsRoute);
app.use("/api/animals/animalsPhotos", express.static("./data/animals"));
app.use('/api/mateBoard', MateBoardRoute); // 회원용 메이트 게시글 Api
app.use("/api/openMateBoard", OpenMateBoardRoute); // 비회원용 메이트 게시글 Api

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  let currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 9);
  console.log("Process Start:", currentTime);
  console.log(`petpotal backend listening on port ${port}`);
});