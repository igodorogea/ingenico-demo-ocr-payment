import * as functions from 'firebase-functions';
import express from 'express';
import { muumeApiProxy } from './proxy/muume-api';
import { iframeAssetsProxy, iframeProxy } from './proxy/iframe';

const app = express();
const router = express.Router();

app.use('/muume', muumeApiProxy);
router.use('/iframe', iframeProxy);
router.use('/assets', iframeAssetsProxy);

app.use('/proxy', router);

export const proxyFunc = functions.https.onRequest(app);
