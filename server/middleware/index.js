const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const globalMiddelwares = (app, dir) => {
  app.use('/public', express.static(path.join(dir, 'public')));
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.use('/api/events', require('../modules/event'))
  app.use('/api/users', require('../modules/user'))
  app.use('/api/settings', require('../modules/settings'))
  app.use('/api/spaces', require('../modules/space'))
  
}

module.exports = globalMiddelwares;