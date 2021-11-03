const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers
});

// Connection string parameters
const sqlConfig = {
  user: 'root',
  password: 'rootpassword',
  server: 'localhost',
  database: 'plants'
}

// Start server and listen at http://localhost:3001/
const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('app listening at http://localhost:3001');
})
// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({
  force: false
}).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});