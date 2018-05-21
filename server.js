const express = require('express');
const { router } = require('./routes/apiRoutes');
const bodyParser = require('body-parser');

const server = express();

server.set('port', process.env.PORT || 3000);

server.use(bodyParser.json());
server.use('/', express.static('public'));
server.use('/api/v1', router);

server.listen(server.get('port'), () => { // eslint-disable-next-line
  console.log(`Photo Keeper server listening at ${server.get('port')}`);
});

module.exports = server;
