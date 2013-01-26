function Peer(options) {
  if (!(this instanceof Peer)) return new Peer(options);
  EventEmitter.call(this);

  options = util.extend({
    debug: false,
    peer: 'ws://localhost'
  }, options);
  this.options = options;
  util.debug = options.debug;

  this._id = null;

  this._socket = new WebSocket(options.ws);
  this._socketInit();
  
  
  // Connections
  this.connections = {};
};

util.inherits(Peer, EventEmitter);

/** Start up websocket communications. */
Peer.prototype._socketInit = function() {
  var self = this;
  this._socket.onmessage = function(event) {
    var message = JSON.parse(event.data);
    var peer = message.src;
    var connection = self.connections[peer];
    switch (message.type) {
      case 'ID':
        self._id = message.id;
        self.emit('ready', self._id);
        break;
      case 'OFFER':
        var options = {
          metadata: message.metadata,
          sdp: message.sdp
        };
        var connection = new DataConnection(self._id, peer, self._socket, function(err, connection) {
          if (!err) {
            self.emit('connection', connection, metadata);
          }
        }, options);
        self.connections[peer] = connection;
        break;
      case 'ANSWER':
        if (connection) connection.handleSDP(message);
        break;
      case 'CANDIDATE':
        if (connection) connection.handleCandidate(message);
        break;
      case 'LEAVE':
        if (connection) connection.handleLeave(message);
        break;
      case 'PORT':
        if (browserisms == 'Firefox') {
          connection.handlePort(message);
          break;
        }
      case 'DEFAULT':
        util.log('PEER: unrecognized message ', message.type);
        break;
    }
  };
  this._socket.onopen = function() {
    // Announce as a PEER to receive an ID.
    self._socket.send(JSON.stringify({
      type: 'PEER'
    }));
  };
};


Peer.prototype.connect = function(peer, metadata, cb) {
  if (typeof metadata === 'function' && !cb) cb = metadata; metadata = false;

  var options = {
    metadata: metadata
  };
  var connection = new DataConnection(this._id, peer, this._socket, cb, options);
  this.connections[peer] = connection;
};


exports.Peer = Peer;

