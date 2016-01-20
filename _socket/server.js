'use strict'

const net = require('net');
const logger = require('./logger');

const PORT = 8000;

let clients = [];

let server = net.createServer();
server.listen(PORT);

let client_conn = (client) => {
  logger.info('client connected');
  logger.info('client IP Address: ' + client.remoteAddress);
  logger.info('is IPv6: ' + net.isIPv6(client.remoteAddress));
  logger.info('total server connections: ' + server.connections);

  clients.push(client);

  client.on('data', (data) => {
    logger.debug('received data: ' + data.toString());

    for (let _client of clients) {
      if (_client !== client) {
        _client.write(data + '\n');
      }
    }

  });

  client.on('end', () => {
    logger.info('client disconnected');
  });
}

server.on('listening', () => {
  logger.info('server listen at port: ' + PORT);
});

server.on('connection', client_conn);

server.on('close', () => {
  logger.info('server close');
});

server.on('error', (error) => {
  logger.error(error);

  server.close();
});
