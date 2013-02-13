var util = require('./util');
var express = require('express');
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var WebSocketServer = require('ws').Server;
var url = require('url');



function PeerServer(options) {
  if (!(this instanceof PeerServer)) return new PeerServer(options);
  EventEmitter.call(this);

  this._app = express();
  this._httpServer = http.createServer(this._app);

  this._options = util.extend({
    port: 80,
    debug: false,
    timeout: 5000,
    key: 'peerjs',
    ip_limit: 5000,
    concurrent_limit: 5000
  }, options);

  util.debug = this._options.debug;

  // Connected clients
  this._clients = {};
  
  // Messages waiting for another peer.
  this._outstanding = {};

  // Initailize WebSocket server handlers.
  this._initializeWSS();

  // Initialize HTTP routes. This is only used for the first few milliseconds
  // before a socket is opened for a Peer.
  this._initializeHTTP();
  
  var self = this;
  setInterval(function(){
    self._pruneOutstanding();
  }, 5000);
};

util.inherits(PeerServer, EventEmitter);


/** Initialize WebSocket server. */
PeerServer.prototype._initializeWSS = function() {
  var self = this;
  
  // Create WebSocket server as well.
  this._wss = new WebSocketServer({ path: '/peerjs', server: this._httpServer });

  
  this._wss.on('connection', function(socket) {
    var query = url.parse(socket.upgradeReq.url, true).query;
    var id = query.id;
    var token = query.token;
    var key = query.key;
    var ip = socket.upgradeReq.socket.remoteAddress;

    if (!id || !token || !key) {
      socket.send(JSON.stringify({ type: 'ERROR', payload: { msg: 'No id, token, or key supplied to websocket server' } }));
      socket.close();
      return;
    }
    
    if (!self._clients[key] || !self._clients[key][id]) {
      self._checkKey(key, ip, function(err) {
        if (!err) {
          self._clients[key][id] = { token: token };
          socket.send(JSON.stringify({ type: 'OPEN' }));
          self._configureWS(socket, key, id, token);
        } else {
          socket.send({ type: 'ERROR', payload: { msg: err } });
        }
      });
    } else {
      self._configureWS(socket, key, id, token);
    }
  });
};

PeerServer.prototype._configureWS = function(socket, key, id, token) {
  var self = this;
  
  var client = this._clients[key][id];
    
  
  if (token === client.token) {
    // res 'close' event will delete client.res for us
    client.socket = socket;
    // Client already exists
    if (client.res) {
      client.res.end();
    }
  } else {
    // ID-taken, invalid token
    socket.send(JSON.stringify({ type: 'ID-TAKEN', payload: { msg: 'ID is taken' } }));
    socket.close();
    return;
  }

  this._processOutstanding(key, id);

  // Cleanup after a socket closes.
  socket.on('close', function() {
    util.log('Socket closed:', id);
    if (client.socket == socket) {
      self._removePeer(key, id);
    }
  });
  
  // Handle messages from peers.
  socket.on('message', function(data) {
    try {
      var message = JSON.parse(data);
      util.log(message);

      switch (message.type) {
        case 'LEAVE':
          // Clean up if a Peer sends a LEAVE.
          if (!message.dst) {
            self._removePeer(key, id);
            break;
          }
        // ICE candidates
        case 'CANDIDATE':
        // Offer or answer between peers.
        case 'OFFER':
        case 'ANSWER':
        // Firefoxism (connectDataConnection ports)
        // case 'PORT':
          // Use the ID we know to be correct to prevent spoofing.
          self._handleTransmission(key, {
            type: message.type,
            src: id,
            dst: message.dst,
            payload: message.payload
          });
          break;
        default:
          util.prettyError('Message unrecognized');
      }
    } catch(e) {
      throw e;
      util.log('Invalid message', data);
    }
  });
}


PeerServer.prototype._checkKey = function(key, ip, cb) {
  if (key == 'peerjs') {
    if (!this._clients[key]) {
      this._clients[key] = {};
    }
    if (!this._outstanding[key]) {
      this._outstanding[key] = {};
    }
    cb(null);
  } else {
    cb('Bad key!');
  }
}


/** Initialize HTTP server routes. */
PeerServer.prototype._initializeHTTP = function() {
  var self = this;
  
  this._app.use(express.bodyParser());
  this._app.use(util.allowCrossDomain);
  
  this._app.options('/*', function(req, res, next) {
    res.send(200);
  });

  
  // Retrieve guaranteed random ID.
  this._app.get('/:key/id', function(req, res) {
    res.send(self._generateClientId(req.params.key));
  });

  // Server sets up HTTP streaming when you get post an ID.
  this._app.post('/:key/:id/:token/id', function(req, res) {
    var id = req.params.id;
    var token = req.params.token;
    var key = req.params.key;
    
    if (!self._clients[key] || !self._clients[key][id]) {
      self._checkKey(key, req.ip, function(err) {
        if (!err) {
          self._clients[key][id] = { token: token };
          self._startStreaming(res, key, id, token, true);
        } else {
          res.send({ type: 'ERROR', payload: { msg: err } });
        }
      });
    } else {
      self._startStreaming(res, key, id, token);
    }
  });

    
  var handle = function(req, res){
    var key = req.params.key;
    var id = req.params.id;
    var client = self._clients[key][id];
    // Auth the req
    if (!client || req.params.token !== client.token) {
      res.send(401);
      return;
    } else {
      self._handleTransmission(key, {
        type: req.body.type,
        src: id,
        dst: req.body.dst,
        payload: req.body.payload
      });
      res.send(200);
    }
  };
  
  this._app.post('/:key/:id/:token/offer', handle);

  this._app.post('/:key/:id/:token/candidate', handle);

  this._app.post('/:key/:id/:token/answer', handle);

  this._app.post('/:key/:id/:token/leave', handle);

  //this._app.post('/port', handle);
  
  // Listen on user-specified port and 
  this._httpServer.listen(this._options.port);
  
};

/** Saves a streaming response and takes care of timeouts and headers. */
PeerServer.prototype._startStreaming = function(res, key, id, token, open) {
  var self = this;
  
  res.writeHead(200, {'Content-Type': 'application/octet-stream'});

  var pad = '00';
  for (var i = 0; i < 10; i++) {
    pad += pad;
  }
  res.write(pad + '\n');
  
  if (open) {
    res.write(JSON.stringify({ type: 'OPEN' }) + '\n');
  }
  
  var client = this._clients[key][id];
  
  if (token === client.token) {
    // Client already exists
    res.on('close', function(){
      if (client.res === res) {
        if (!client.socket) {
          // No new request yet, peer dead
          self._removePeer(key, id);
          return;
        }
        delete client.res;
      }
    });
    client.res = res;
    this._processOutstanding(key, id);
  } else {
    // ID-taken, invalid token
    res.end(JSON.stringify({ type: 'HTTP-ERROR' }));
  }
};

PeerServer.prototype._pruneOutstanding = function() {
  var keys = Object.keys(this._outstanding);
  for (var k = 0, kk = keys.length; k < kk; k++) {
    var key = keys[k];
    var dsts = Object.keys(this._outstanding[key]);  
    for (var i = 0, ii = dsts.length; i < ii; i++) {
      var offers = this._outstanding[key][dsts[i]];
      var seen = {};
      for (var j = 0, jj = offers.length; j < jj; j++) {
        var message = offers[j];
        if (!seen[message.src]) {
          this._handleTransmission(key, { type: 'EXPIRE', src: message.dst, dst: message.src });
          seen[message.src] = true;
        }
      }
    }
    this._outstanding[key] = {};
  }
}

/** Process outstanding peer offers. */
PeerServer.prototype._processOutstanding = function(key, id) {
  var offers = this._outstanding[key][id];
  if (!offers) {
    return;
  }
  for (var j = 0, jj = offers.length; j < jj; j += 1) {
    this._handleTransmission(key, offers[j]);
  }
  delete this._outstanding[key][id];
};

PeerServer.prototype._removePeer = function(key, id) {
  delete this._clients[key][id];
};

/** Handles passing on a message. */
PeerServer.prototype._handleTransmission = function(key, message) {
  var type = message.type;
  var src = message.src;
  var dst = message.dst;
  var data = JSON.stringify(message);

  var destination = this._clients[key][dst];

  // User is connected!
  if (destination) {
    try {
      if (destination.socket) {
        destination.socket.send(data);
      } else if (destination.res) {
        data += '\n';
        destination.res.write(data);
      } else {
        // Neither socket no res available. Peer dead?
        throw "Peer dead"
      }
    } catch (e) {
      // This happens when a peer disconnects without closing connections and
      // the associated WebSocket has not closed.
      util.prettyError(e);
      // Tell other side to stop trying.
      this._removePeer(key, dst);
      this._handleTransmission(key, {
        type: 'LEAVE',
        src: dst,
        dst: src
      });
    }
  } else {
    // Wait for this client to connect/reconnect (XHR) for important
    // messages.
    if (type !== 'LEAVE' && type !== 'EXPIRE' && !!dst) {
      var self = this;
      if (!this._outstanding[key][dst]) {
        this._outstanding[key][dst] = [];
      }
      this._outstanding[key][dst].push(message);
    } else if (type === 'LEAVE' && !dst) {
      this._removePeer(key, src);
    } else {
      // Unavailable destination specified with message LEAVE or EXPIRE
      // Ignore
    }
  }
};

PeerServer.prototype._generateClientId = function(key) {
  var clientId = util.randomId();
  while (!!this._clients[key][clientId]) {
    clientId = util.randomId();
  }
  return clientId;
};

exports.PeerServer = PeerServer;
