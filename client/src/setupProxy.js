const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/api', {
        target: 'http://localhost:3001/api/',
        ws:true,
        changeOrigin:true,
        pathRewrite: {
            "^/api": ""
        }
    }))
}
