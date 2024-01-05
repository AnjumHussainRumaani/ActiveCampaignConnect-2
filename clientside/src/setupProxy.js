// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',  // Adjust this path to match your API endpoint
        createProxyMiddleware({
            target: 'https://anjumhussainkasur.api-us1.com',
            changeOrigin: true,
        })
    );
};
