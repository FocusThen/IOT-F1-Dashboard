const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const monk = require('monk')
require('dotenv').config();

const db = monk(process.env.MONGO_URI)
const carInfo = db.get('F1CarInfo')

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  try {
    carInfo.find()
      .then(data => res.json({
        carInfo: data
      }))
  } catch (error) {
    next(error)
  }
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
