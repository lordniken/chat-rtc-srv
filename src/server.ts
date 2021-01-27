import * as express from 'express';
import * as mongoose from 'mongoose';
import * as colors from 'colors';
import * as cors from 'cors';
import * as ws from 'ws';

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

    const server = app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`.yellow));

    const wsServer = new ws.Server({ server });

    wsServer.on('connection', ws => {
      wsServer.clients.forEach(client => client.send('hello!'));

      setInterval(() => {
        ws.send(Math.random());
      }, 3000);

      ws.on('message', (message) => {
        console.log('rec', message);
      });

      ws.on('close', () => {
        console.log('disconnect');
      });
    });
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
  }
};

start();
