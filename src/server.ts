import * as express from 'express';
import * as mongoose from 'mongoose';
import * as colors from 'colors';
import * as cors from 'cors';
import * as WebSocket from 'ws';

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
      useCreateIndex: true,
      authSource: 'admin'
    });

    const server = app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`.yellow));

    const wss = new WebSocket.Server({ server });
    module.exports = wss.on('connection', require('./routes/ws'));
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

start();
