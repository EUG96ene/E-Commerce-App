const path = require( 'path');
const logger = require( 'morgan')
const express =require( 'express');
const routes = require('./src/routes/index.js')
const cors = require('cors');

const app = express();
  
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;
