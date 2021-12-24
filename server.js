const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config=require('./config')

const {
  createProxyMiddleware
} = require('http-proxy-middleware')

const app = express();

const routes=require('./routes')

app.set('port', process.env.PORT || 3100);
app.use(logger('dev'));
// app.use(bodyParser.json()); // Parses json, multi-part (file), url-encoded

app.use('/public', express.static('public'));
app.use('/pages', express.static('pages'));
app.use('/api', createProxyMiddleware({
  // 转发到5000端口
  target: config.serverUrl,
  // 转发时重写路径
  pathRewrite: {
    '^/api': ''
  },
  changeOrigin: true
}));

app.get('/ss',function(req,res,next){
  
})


app.use('/', routes);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main', function (req, res) {
  res.sendFile(path.join(__dirname, 'main/index.html'));
});



const server = http.createServer(app);

// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(app.get('port'), function () {
      console.log(
        'Web server listening on port http://localhost:' + app.get('port')
      );
    });
  })
  .catch(function (err) {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
