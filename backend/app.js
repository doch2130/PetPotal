const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const Passport = require('./middleware/passport/Passport');
const Test01Route = require('./routes/Test01Routes');
const UsersRoute = require('./routes/UsersRoutes');
const AnimalsRoute = require('./routes/AnimalsRoutes');
const MateBoardRoute = require('./routes/MateBoardRoutes');
const { geocoding } = require('./controller/NaverMapController');

const app = express();
const port = 3010;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(cookieParser('petpotal'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(
  session({
    name: 'petpotal',
    secret: 'pettotal',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 1,
    }
  })
);
app.use(passport.initialize());
// app.use(passport.session());
Passport();

app.use('/static', express.static(__dirname + '/data/mateTextEditorImg'));
app.use('/static2', express.static('./data/profile'));
app.use('/api/test01', Test01Route);
app.use('/api/users', UsersRoute);
app.use('/api/users/profile', express.static('./data/profile'));
app.use('/api/animals', AnimalsRoute);
app.use("/api/animals/animalsPhotos", express.static("./data/animals"));
app.use('/api/mateBoard', MateBoardRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// NaverMap Geocoding
app.get('/api/naverMapGeocoding', geocoding);

app.listen(port, () => {
  console.log(`pettotal backend listening on port ${port}`);
});