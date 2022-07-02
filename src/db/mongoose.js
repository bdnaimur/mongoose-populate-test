
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB);

mongoose.connection.once('open', () =>
  console.log('\x1b[34m%s\x1b[0m', 'Connected to Database.')
);
