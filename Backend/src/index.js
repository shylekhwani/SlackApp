import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { PORT } from './Config/serverConfig.js';



const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});
