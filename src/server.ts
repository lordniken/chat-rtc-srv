import express = require('express');
import mongoose = require('mongoose');
import colors = require('colors');
import cors = require('cors');

require('dotenv').config();
colors.enable();

const app = express();
const PORT = process.env.PORT || 9950;

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));

const start = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });

    app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`.yellow));
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

start();
