const express = require('express');
const app = express();
const config = require('config');


require('./startup/db')();
require('./startup/routes.js')(app);
require('./startup/logging')();



let ports = config.get('port');
let server = app.listen(ports,()=>console.log(`Listening on port ${ports}`));

module.exports = server;