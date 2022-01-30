const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
   app.use(
      createProxyMiddleware('/rps/history', {
         target: 'https://bad-api-assignment.reaktor.com',
         changeOrigin: true,
      })
   )
}
