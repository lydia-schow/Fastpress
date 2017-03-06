var express = require('express');
var app = express();

app.get('/pages/:pageId', (request, response) => {
  console.log(`GET page ${request.params.pageId}`);
  response.send('Request received');
});

app.post('/pages', (request, response) => {
  console.log('POST a new page');
  response.send('Request received');
});

app.listen( 3000, () => {
  console.log('Listening at port 3000');
});
