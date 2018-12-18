import { ClientRequest } from 'http';
import httpProxy from 'http-proxy-middleware';
import * as functions from 'firebase-functions';

const config = functions.config().proxyservice;

export const iframeProxy = httpProxy({
  'target': config.iframe_url,
  'secure': false,
  'changeOrigin': true,
  'pathRewrite': {
    '^/proxy/iframe': ''
  },
  'onProxyReq': (proxyReq: ClientRequest, req, res) => {
    proxyReq.setHeader('Referer', config.iframe_referer);
  },
  'onProxyRes': (proxyRes, req, res) => {
    delete proxyRes.headers['x-frame-options'];
  }
});

export const iframeAssetsProxy = httpProxy({
  'target': config.iframe_url,
  'secure': false,
  'changeOrigin': true,
  'pathRewrite': {
    '^/proxy': ''
  }
});
