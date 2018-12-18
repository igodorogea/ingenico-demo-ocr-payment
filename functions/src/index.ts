import * as functions from 'firebase-functions';
import express from 'express';
import { apiProxy } from './proxy/api';
import { iframeAssetsProxy, iframeProxy } from './proxy/iframe';

const app = express();
const router = express.Router();

router.use('/api', apiProxy);
router.use('/iframe', iframeProxy);
router.use('/assets', iframeAssetsProxy);

app.use('/proxy', router);

export const proxy = functions.https.onRequest(app);
