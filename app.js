var app = require('./app-config.js');
var port = process.env.PORT || 3000

app.listen( port, () => { console.log(`Listening at port ${port}`); });