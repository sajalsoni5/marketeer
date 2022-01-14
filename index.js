const express = require('express');
const app = express();
require('./startup/db')();
require('./startup/routes.js')(app);
require('./startup/logging')();


let ports = config.get('port');
app.listen(ports,'127.0.0.1',()=>console.log(`Listening on port ${ports}`));

