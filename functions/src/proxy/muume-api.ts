import * as functions from 'firebase-functions';
import rp from 'request-promise';
import express from 'express';

const config = functions.config().proxyservice;

export const muumeApiProxy = express.Router();

muumeApiProxy.all('/creditCard/ocr', (req, res) => {
  request(req)
    .then(resp => {
      resp.addCreditCardUrl = resp.addCreditCardUrl.replace(config.iframe_url, '/proxy/iframe');
      res.send(resp);
    })
    .catch(err => res.send(err));
});

muumeApiProxy.all('/creditCard/all', (req, res) => {
  request(req)
    .then(resp => res.send(resp))
    .catch(err => res.send(err));
});

muumeApiProxy.all('/external-products/checkout', (req, res) => {
  request(req)
    .then(resp => res.send(resp))
    .catch(err => res.send(err));
});

muumeApiProxy.all('/ingenico/url', (req, res) => {
  request(req)
    .then(resp => res.send(resp))
    .catch(err => res.send(err));
});

function request(req) {
  return rp({
    method: req.method,
    uri: `${config.api_url}${req.url}`,
    body: req.body,
    json: true,
    headers: {
      'App-Code': config.api_app_code,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': config.api_auth_token
    }
  });
}
