const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 9950;

const start = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });

    app.listen(port, () => console.log(colors.yellow(`Server has been started on port ${port}`)));
  } catch (error) {
    console.log(colors.red('Error:', error.message));
  }
};

start();
