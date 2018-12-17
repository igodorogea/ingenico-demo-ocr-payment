import * as functions from 'firebase-functions';
import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.send(`${new Date().toUTCString()}`);
});

export const proxy = functions.https.onRequest(app);
