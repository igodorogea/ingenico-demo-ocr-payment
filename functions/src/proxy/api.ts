import * as functions from 'firebase-functions';
import { ClientRequest } from "http";
import httpProxy from 'http-proxy-middleware';

const config = functions.config().proxyservice;

export const apiProxy = httpProxy({
  'target': config.api_url,
  'secure': false,
  'pathRewrite': {
    '^/proxy/api': ''
  },
  onProxyReq: (proxyReq: ClientRequest, req, res) => {
    proxyReq.setHeader('Authorization', config.api_auth_token);
    proxyReq.setHeader('App-Code', config.api_app_code);
  }
});
