import * as functions from 'firebase-functions';
import rp from 'request-promise';
import express from 'express';

const config = functions.config().proxyservice;

export const muumeApiProxy = express.Router();

muumeApiProxy.all('/creditCard/ocr', (req, res) => {
  rp({
    method: 'POST',
    uri: `${config.api_url}${req.url}`,
    body: null,
    json: true,
    headers: {
      'App-Code': config.api_app_code,
      'Accept': 'application/json',
      'Authorization': config.api_auth_token
    }
  })
    .then(resp => {
      resp.addCreditCardUrl = resp.addCreditCardUrl.replace(config.iframe_url, '/proxy/iframe');
      res.send(resp);
    })
    .catch(err => res.send(err));
});
