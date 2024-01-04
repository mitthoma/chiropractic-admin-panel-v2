import { createProxyMiddleware } from 'http-proxy-middleware';
import { RequestHandler } from 'express';

const options = {
  target: 'http://your-postgresql-server-url',
  changeOrigin: true,
};

const proxy: RequestHandler = createProxyMiddleware('/api', options);

export default proxy;
