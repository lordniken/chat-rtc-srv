import * as express from 'express';
import * as mongoose from 'mongoose';
import * as colors from 'colors';
import * as cors from 'cors';
import * as expressWs from 'express-ws';

require('dotenv').config();
colors.enable();

const { app } = expressWs(express());
const PORT = process.env.PORT || 9950;

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use(require('./routes/ws'));

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
