import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import { connectDB } from './Config/dbConfig.js';
import { PORT } from './Config/serverConfig.js';
import { channelSocketController } from './controller/socketControllers/channelSocketController.js';
import { messageSocketController } from './controller/socketControllers/messageSocketController.js';
import apiRouter from './Routers/apiRouter.js';


const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.use('/api', apiRouter);


io.on('connection', (socket) => { 
  // This callback is executed whenever a new client connects to the server
  console.log('A user connected', socket.id);
  messageSocketController(io, socket);
  channelSocketController(io, socket);
});

server.listen(PORT, async () => {
  console.log('server is running on port', PORT);
  connectDB();
});
