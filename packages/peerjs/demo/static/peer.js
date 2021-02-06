/*! peerjs.js build:0.0.1, development. Copyright(c) 2013 Michelle Bu <michelle@michellebu.com> */
(function(exports){
var binaryFeatures = {};
binaryFeatures.useBlobBuilder = (function(){
  try {
    new Blob([]);
    return false;
  } catch (e) {
    return true;
  }
})();

binaryFeatures.useArrayBufferView = !binaryFeatures.useBlobBuilder && (function(){
  try {
    return (new Blob([new Uint8Array([])])).size === 0;
  } catch (e) {
    return true;
  }
})();
binaryFeatures.supportsBinaryWebsockets = (function(){
  try {
    var wstest = new WebSocket('ws://null');
    wstest.onerror = function(){};
    if (typeof(wstest.binaryType) !== "undefined") {
      return true;
    } else {
      return false;
    }
    wstest.close();
    wstest = null;
  } catch (e) {
    return false;
  }
})();

exports.binaryFeatures = binaryFeatures;
exports.BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder || window.BlobBuilder;

function BufferBuilder(){
  this._pieces = [];
  this._parts = [];
}

BufferBuilder.prototype.append = function(data) {
  if(typeof data === 'number') {
    this._pieces.push(data);
  } else {
    this._flush();
    this._parts.push(data);
  }
};

BufferBuilder.prototype._flush = function() {
  if (this._pieces.length > 0) {    
    var buf = new Uint8Array(this._pieces);
    if(!binaryFeatures.useArrayBufferView) {
      buf = buf.buffer;
    }
    this._parts.push(buf);
    this._pieces = [];
  }
};

BufferBuilder.prototype.getBuffer = function() {
  this._flush();
  if(binaryFeatures.useBlobBuilder) {
    var builder = new BlobBuilder();
    for(var i = 0, ii = this._parts.length; i < ii; i++) {
      builder.append(this._parts[i]);
    }
    return builder.getBlob();
  } else {
    return new Blob(this._parts);
  }
};
exports.BinaryPack = {
  unpack: function(data){
    var unpacker = new Unpacker(data);
    return unpacker.unpack();
  },
  pack: function(data){
    var packer = new Packer();
    var buffer = packer.pack(data);
    return buffer;
  }
};

function Unpacker (data){
  // Data is ArrayBuffer
  this.index = 0;
  this.dataBuffer = data;
  this.dataView = new Uint8Array(this.dataBuffer);
  this.length = this.dataBuffer.byteLength;
}


Unpacker.prototype.unpack = function(){
  var type = this.unpack_uint8();
  if (type < 0x80){
    var positive_fixnum = type;
    return positive_fixnum;
  } else if ((type ^ 0xe0) < 0x20){
    var negative_fixnum = (type ^ 0xe0) - 0x20;
    return negative_fixnum;
  }
  var size;
  if ((size = type ^ 0xa0) <= 0x0f){
    return this.unpack_raw(size);
  } else if ((size = type ^ 0xb0) <= 0x0f){
    return this.unpack_string(size);
  } else if ((size = type ^ 0x90) <= 0x0f){
    return this.unpack_array(size);
  } else if ((size = type ^ 0x80) <= 0x0f){
    return this.unpack_map(size);
  }
  switch(type){
    case 0xc0:
      return null;
    case 0xc1:
      return undefined;
    case 0xc2:
      return false;
    case 0xc3:
      return true;
    case 0xca:
      return this.unpack_float();
    case 0xcb:
      return this.unpack_double();
    case 0xcc:
      return this.unpack_uint8();
    case 0xcd:
      return this.unpack_uint16();
    case 0xce:
      return this.unpack_uint32();
    case 0xcf:
      return this.unpack_uint64();
    case 0xd0:
      return this.unpack_int8();
    case 0xd1:
      return this.unpack_int16();
    case 0xd2:
      return this.unpack_int32();
    case 0xd3:
      return this.unpack_int64();
    case 0xd4:
      return undefined;
    case 0xd5:
      return undefined;
    case 0xd6:
      return undefined;
    case 0xd7:
      return undefined;
    case 0xd8:
      size = this.unpack_uint16();
      return this.unpack_string(size);
    case 0xd9:
      size = this.unpack_uint32();
      return this.unpack_string(size);
    case 0xda:
      size = this.unpack_uint16();
      return this.unpack_raw(size);
    case 0xdb:
      size = this.unpack_uint32();
      return this.unpack_raw(size);
    case 0xdc:
      size = this.unpack_uint16();
      return this.unpack_array(size);
    case 0xdd:
      size = this.unpack_uint32();
      return this.unpack_array(size);
    case 0xde:
      size = this.unpack_uint16();
      return this.unpack_map(size);
    case 0xdf:
      size = this.unpack_uint32();
      return this.unpack_map(size);
  }
}

Unpacker.prototype.unpack_uint8 = function(){
  var byte = this.dataView[this.index] & 0xff;
  this.index++;
  return byte;
};

Unpacker.prototype.unpack_uint16 = function(){
  var bytes = this.read(2);
  var uint16 =
    ((bytes[0] & 0xff) * 256) + (bytes[1] & 0xff);
  this.index += 2;
  return uint16;
}

Unpacker.prototype.unpack_uint32 = function(){
  var bytes = this.read(4);
  var uint32 =
     ((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3];
  this.index += 4;
  return uint32;
}

Unpacker.prototype.unpack_uint64 = function(){
  var bytes = this.read(8);
  var uint64 =
   ((((((bytes[0]  * 256 +
       bytes[1]) * 256 +
       bytes[2]) * 256 +
       bytes[3]) * 256 +
       bytes[4]) * 256 +
       bytes[5]) * 256 +
       bytes[6]) * 256 +
       bytes[7];
  this.index += 8;
  return uint64;
}


Unpacker.prototype.unpack_int8 = function(){
  var uint8 = this.unpack_uint8();
  return (uint8 < 0x80 ) ? uint8 : uint8 - (1 << 8);
};

Unpacker.prototype.unpack_int16 = function(){
  var uint16 = this.unpack_uint16();
  return (uint16 < 0x8000 ) ? uint16 : uint16 - (1 << 16);
}

Unpacker.prototype.unpack_int32 = function(){
  var uint32 = this.unpack_uint32();
  return (uint32 < Math.pow(2, 31) ) ? uint32 :
    uint32 - Math.pow(2, 32);
}

Unpacker.prototype.unpack_int64 = function(){
  var uint64 = this.unpack_uint64();
  return (uint64 < Math.pow(2, 63) ) ? uint64 :
    uint64 - Math.pow(2, 64);
}

Unpacker.prototype.unpack_raw = function(size){
  if ( this.length < this.index + size){
    throw new Error('BinaryPackFailure: index is out of range'
      + ' ' + this.index + ' ' + size + ' ' + this.length);
  }
  var buf = this.dataBuffer.slice(this.index, this.index + size);
  this.index += size;
  
    //buf = util.bufferToString(buf);
  
  return buf;
}

Unpacker.prototype.unpack_string = function(size){
  var bytes = this.read(size);
  var i = 0, str = '', c, code;
  while(i < size){
    c = bytes[i];
    if ( c < 128){
      str += String.fromCharCode(c);
      i++;
    } else if ((c ^ 0xc0) < 32){
      code = ((c ^ 0xc0) << 6) | (bytes[i+1] & 63);
      str += String.fromCharCode(code);
      i += 2;
    } else {
      code = ((c & 15) << 12) | ((bytes[i+1] & 63) << 6) |
        (bytes[i+2] & 63);
      str += String.fromCharCode(code);
      i += 3;
    }
  }
  this.index += size;
  return str;
}

Unpacker.prototype.unpack_array = function(size){
  var objects = new Array(size);
  for(var i = 0; i < size ; i++){
    objects[i] = this.unpack();
  }
  return objects;
}

Unpacker.prototype.unpack_map = function(size){
  var map = {};
  for(var i = 0; i < size ; i++){
    var key  = this.unpack();
    var value = this.unpack();
    map[key] = value;
  }
  return map;
}

Unpacker.prototype.unpack_float = function(){
  var uint32 = this.unpack_uint32();
  var sign = uint32 >> 31;
  var exp  = ((uint32 >> 23) & 0xff) - 127;
  var fraction = ( uint32 & 0x7fffff ) | 0x800000;
  return (sign == 0 ? 1 : -1) *
    fraction * Math.pow(2, exp - 23);
}

Unpacker.prototype.unpack_double = function(){
  var h32 = this.unpack_uint32();
  var l32 = this.unpack_uint32();
  var sign = h32 >> 31;
  var exp  = ((h32 >> 20) & 0x7ff) - 1023;
  var hfrac = ( h32 & 0xfffff ) | 0x100000;
  var frac = hfrac * Math.pow(2, exp - 20) +
    l32   * Math.pow(2, exp - 52);
  return (sign == 0 ? 1 : -1) * frac;
}

Unpacker.prototype.read = function(length){
  var j = this.index;
  if (j + length <= this.length) {
    return this.dataView.subarray(j, j + length);
  } else {
    throw new Error('BinaryPackFailure: read index out of range');
  }
}
  
function Packer (){
  this.bufferBuilder = new BufferBuilder();
}

Packer.prototype.pack = function(value){
  var type = typeof(value);
  if (type == 'string'){
    this.pack_string(value);
  } else if (type == 'number'){
    if (Math.floor(value) === value){
      this.pack_integer(value);
    } else{
      this.pack_double(value);
    }
  } else if (type == 'boolean'){
    if (value === true){
      this.bufferBuilder.append(0xc3);
    } else if (value === false){
      this.bufferBuilder.append(0xc2);
    }
  } else if (type == 'undefined'){
    this.bufferBuilder.append(0xc0);
  } else if (type == 'object'){
    if (value === null){
      this.bufferBuilder.append(0xc0);
    } else {
      var constructor = value.constructor;
      if (constructor == Array){
        this.pack_array(value);
      } else if (constructor == Blob || constructor == File) {
        this.pack_bin(value);
      } else if (constructor == ArrayBuffer) {
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(new Uint8Array(value));
        } else {
          this.pack_bin(value);
        }
      } else if ('BYTES_PER_ELEMENT' in value){
        if(binaryFeatures.useArrayBufferView) {
          this.pack_bin(value);
        } else {
          this.pack_bin(value.buffer);
        }
      } else if (constructor == Object){
        this.pack_object(value);
      } else if (constructor == Date){
        this.pack_string(value.toString());
      } else if (typeof value.toBinaryPack == 'function'){
        this.bufferBuilder.append(value.toBinaryPack());
      } else {
        throw new Error('Type "' + constructor.toString() + '" not yet supported');
      }
    }
  } else {
    throw new Error('Type "' + type + '" not yet supported');
  }
  return this.bufferBuilder.getBuffer();
}


Packer.prototype.pack_bin = function(blob){
  var length = blob.length || blob.byteLength || blob.size;
  if (length <= 0x0f){
    this.pack_uint8(0xa0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xda) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdb);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
    return;
  }
  this.bufferBuilder.append(blob);
}

Packer.prototype.pack_string = function(str){
  var length = str.length;
  if (length <= 0x0f){
    this.pack_uint8(0xb0 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xd8) ;
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xd9);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
    return;
  }
  this.bufferBuilder.append(str);
}

Packer.prototype.pack_array = function(ary){
  var length = ary.length;
  if (length <= 0x0f){
    this.pack_uint8(0x90 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xdc)
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdd);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var i = 0; i < length ; i++){
    this.pack(ary[i]);
  }
}

Packer.prototype.pack_integer = function(num){
  if ( -0x20 <= num && num <= 0x7f){
    this.bufferBuilder.append(num & 0xff);
  } else if (0x00 <= num && num <= 0xff){
    this.bufferBuilder.append(0xcc);
    this.pack_uint8(num);
  } else if (-0x80 <= num && num <= 0x7f){
    this.bufferBuilder.append(0xd0);
    this.pack_int8(num);
  } else if ( 0x0000 <= num && num <= 0xffff){
    this.bufferBuilder.append(0xcd);
    this.pack_uint16(num);
  } else if (-0x8000 <= num && num <= 0x7fff){
    this.bufferBuilder.append(0xd1);
    this.pack_int16(num);
  } else if ( 0x00000000 <= num && num <= 0xffffffff){
    this.bufferBuilder.append(0xce);
    this.pack_uint32(num);
  } else if (-0x80000000 <= num && num <= 0x7fffffff){
    this.bufferBuilder.append(0xd2);
    this.pack_int32(num);
  } else if (-0x8000000000000000 <= num && num <= 0x7FFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xd3);
    this.pack_int64(num);
  } else if (0x0000000000000000 <= num && num <= 0xFFFFFFFFFFFFFFFF){
    this.bufferBuilder.append(0xcf);
    this.pack_uint64(num);
  } else{
    throw new Error('Invalid integer');
  }
}

Packer.prototype.pack_double = function(num){
  var sign = 0;
  if (num < 0){
    sign = 1;
    num = -num;
  }
  var exp  = Math.floor(Math.log(num) / Math.LN2);
  var frac0 = num / Math.pow(2, exp) - 1;
  var frac1 = Math.floor(frac0 * Math.pow(2, 52));
  var b32   = Math.pow(2, 32);
  var h32 = (sign << 31) | ((exp+1023) << 20) |
      (frac1 / b32) & 0x0fffff;
  var l32 = frac1 % b32;
  this.bufferBuilder.append(0xcb);
  this.pack_int32(h32);
  this.pack_int32(l32);
}

Packer.prototype.pack_object = function(obj){
  var keys = Object.keys(obj);
  var length = keys.length;
  if (length <= 0x0f){
    this.pack_uint8(0x80 + length);
  } else if (length <= 0xffff){
    this.bufferBuilder.append(0xde);
    this.pack_uint16(length);
  } else if (length <= 0xffffffff){
    this.bufferBuilder.append(0xdf);
    this.pack_uint32(length);
  } else{
    throw new Error('Invalid length');
  }
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      this.pack(prop);
      this.pack(obj[prop]);
    }
  }
}

Packer.prototype.pack_uint8 = function(num){
  this.bufferBuilder.append(num);
}

Packer.prototype.pack_uint16 = function(num){
  this.bufferBuilder.append(num >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_uint32 = function(num){
  var n = num & 0xffffffff;
  this.bufferBuilder.append((n & 0xff000000) >>> 24);
  this.bufferBuilder.append((n & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((n & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((n & 0x000000ff));
}

Packer.prototype.pack_uint64 = function(num){
  var high = num / Math.pow(2, 32);
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}

Packer.prototype.pack_int8 = function(num){
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int16 = function(num){
  this.bufferBuilder.append((num & 0xff00) >> 8);
  this.bufferBuilder.append(num & 0xff);
}

Packer.prototype.pack_int32 = function(num){
  this.bufferBuilder.append((num >>> 24) & 0xff);
  this.bufferBuilder.append((num & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((num & 0x0000ff00) >>> 8);
  this.bufferBuilder.append((num & 0x000000ff));
}

Packer.prototype.pack_int64 = function(num){
  var high = Math.floor(num / Math.pow(2, 32));
  var low  = num % Math.pow(2, 32);
  this.bufferBuilder.append((high & 0xff000000) >>> 24);
  this.bufferBuilder.append((high & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((high & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((high & 0x000000ff));
  this.bufferBuilder.append((low  & 0xff000000) >>> 24);
  this.bufferBuilder.append((low  & 0x00ff0000) >>> 16);
  this.bufferBuilder.append((low  & 0x0000ff00) >>>  8);
  this.bufferBuilder.append((low  & 0x000000ff));
}
/**
 * Light EventEmitter. Ported from Node.js/events.js
 * Eric Zhang
 */

/**
 * EventEmitter class
 * Creates an object with event registering and firing methods
 */
function EventEmitter() {
  // Initialise required storage variables
  this._events = {};
}

var isArray = Array.isArray;


EventEmitter.prototype.addListener = function(type, listener, scope, once) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }
  
  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, typeof listener.listener === 'function' ?
            listener.listener : listener);
            
  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // If we've already got an array, just append.
    this._events[type].push(listener);

  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }
  
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener, scope) {
  if ('function' !== typeof listener) {
    throw new Error('.once only takes instances of Function');
  }

  var self = this;
  function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  };

  g.listener = listener;
  self.on(type, g);

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener, scope) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var position = -1;
    for (var i = 0, length = list.length; i < length; i++) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener))
      {
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    list.splice(position, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (list === listener ||
             (list.listener && list.listener === listener))
  {
    delete this._events[type];
  }

  return this;
};


EventEmitter.prototype.off = EventEmitter.prototype.removeListener;


EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

EventEmitter.prototype.emit = function(type) {
  var type = arguments[0];
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var l = arguments.length;
        var args = new Array(l - 1);
        for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var l = arguments.length;
    var args = new Array(l - 1);
    for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;
  } else {
    return false;
  }
};




var util = {
  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  pack: BinaryPack.pack,
  unpack: BinaryPack.unpack,
  randomPort: function() {
    return Math.round(Math.random() * 60535) + 5000;
  },
  
  log: function () {
    if (debug) {
      for (var i = 0; i < arguments.length; i++) {
        console.log('*', i, '-- ', arguments[i]);
      }
    }
  },

  setZeroTimeout: (function(global) {
    var timeouts = [];
    var messageName = 'zero-timeout-message';

    // Like setTimeout, but only takes a function argument.	 There's
    // no time argument (always zero) and no arguments (you have to
    // use a closure).
    function setZeroTimeoutPostMessage(fn) {
      timeouts.push(fn);
      global.postMessage(messageName, '*');
    }		

    function handleMessage(event) {
      if (event.source == global && event.data == messageName) {
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        if (timeouts.length) {
          timeouts.shift()();
        }
      }
    }
    if (global.addEventListener) {
      global.addEventListener('message', handleMessage, true);
    } else if (global.attachEvent) {
      global.attachEvent('onmessage', handleMessage);
    }
    return setZeroTimeoutPostMessage;
  }(this))
};
var RTCPeerConnection = null;
var getUserMedia = null;
var attachMediaStream = null;
var browserisms = null;

if (navigator.mozGetUserMedia) {
  browserisms = 'Firefox'

  RTCPeerConnection = mozRTCPeerConnection;

  getUserMedia = navigator.mozGetUserMedia.bind(navigator);
  attachMediaStream = function(element, stream) {
    console.log("Attaching media stream");
    element.mozSrcObject = stream;
    element.play();
  };
} else if (navigator.webkitGetUserMedia) {
  browserisms = 'Webkit'

  RTCPeerConnection = webkitRTCPeerConnection;

  getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
  attachMediaStream = function(element, stream) {
    element.src = webkitURL.createObjectURL(stream);
  };
}

exports.RTCPeerConnection = RTCPeerConnection;
exports.getUserMedia = getUserMedia;
exports.attachMediaStream = attachMediaStream;
exports.browserisms = browserisms;
function Peer(options) {
  if (!(this instanceof Peer)) return new Peer(options);
  
  EventEmitter.call(this);
  
  options = util.extend({
    // Defaults
  }, options);
  
  
  this._config = options.config || { 'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }] };
  this._id = null;
  // User handlers.
  this._handlers = {};

  // Source to connect to; null if waiting for a connection.
  this._peer = options.source || null;

  // Booleans to determine what streams to allow.
  this._video = options.video;
  this._data = options.data != undefined ? options.data : true;
  this._audio = options.audio;

  // Connections
  this._pc = null;
  this._dc = null;
  this._socket = new WebSocket(options.ws || 'ws://localhost');

  // Local streams for multiple use.
  this._localVideo = options.localVideo || null;
  this._localAudio = options.localAudio || null;

  // Init socket msg handlers
  var self = this;
  this._socket.onopen = function() {
    self.socketInit();
  };

  // Firefoxism: connectDataConnection ports.
  if (browserisms == 'Firefox' && !options.source) {
    if (!Peer.usedPorts) {
      Peer.usedPorts = [];
    }
    this.localPort = util.randomPort();
    while (Peer.usedPorts.indexOf(this.localPort) != -1) {
      this.localPort = util.randomPort();
    }
    this.remotePort = util.randomPort();
    while (this.remotePort == this.localPort ||
        Peer.usedPorts.indexOf(this.localPort) != -1) {
      this.remotePort = util.randomPort();
    }
    Peer.usedPorts.push(this.remotePort);
    Peer.usedPorts.push(this.localPort);
  }

};

util.inherits(Peer, EventEmitter);


/** Start up websocket communications. */
Peer.prototype.socketInit = function() {
  var self = this;
  if (!!this._peer) {
    // Announce as a sink if initiated with a source.
    this._socket.send(JSON.stringify({
      type: 'SINK',
      source: this._peer,
      isms: browserisms
    }));

    this._socket.onmessage = function(event) {
      var message = JSON.parse(event.data);

      switch (message.type) {
        case 'SINK-ID':
          self._id = message.id;
          self.emit('ready', self._id);          
          self.startPeerConnection();
          break;
        case 'OFFER':
          var sdp = message.sdp;
          try {
            sdp = new RTCSessionDescription(message.sdp);
          } catch(e) {
            util.log('Firefox');
          }
          self._pc.setRemoteDescription(sdp, function() {
            util.log('setRemoteDescription: offer');

            // If we also have to set up a stream on the sink end, do so.
            self.handleStream(false, function() {
              self.maybeBrowserisms(false);
            });
          }, function(err) {
            util.log('failed to setRemoteDescription with offer, ', err);
          });
          break;
        case 'CANDIDATE':
          util.log(message.candidate);
          var candidate = new RTCIceCandidate(message.candidate);
          self._pc.addIceCandidate(candidate);
          break;
        case 'LEAVE':
          util.log('counterpart disconnected');
          if (!!self._pc && self._pc.readyState != 'closed') {
            self._pc.close();
            self._pc = null;
            self._peer = null;
          }
          if (!!self._dc && self._dc.readyState != 'closed') {
            self._dc.close();
            self._dc = null;
          }
          break;
        case 'PORT':
          if (browserisms && browserisms == 'Firefox') {
            if (!Peer.usedPorts) {
              Peer.usedPorts = [];
            }
            Peer.usedPorts.push(message.local);
            Peer.usedPorts.push(message.remote);
            self._pc.connectDataConnection(message.local, message.remote);
            break;
          }
        case 'DEFAULT':
          util.log('SINK: unrecognized message ', message.type);
          break;
      }
    };

  } else {
    // Otherwise, this sink is the originator to another sink and should wait
    // for an alert to begin the PC process.
    this._socket.send(JSON.stringify({
      type: 'SOURCE',
      isms: browserisms
    }));

    this._socket.onmessage = function(event) {
      var message = JSON.parse(event.data);

      switch (message.type) {
        case 'SOURCE-ID':
          self._id = message.id;
          self.emit('ready', self._id);
          break;
        case 'SINK-CONNECTED':
          self._peer = message.sink;
          self.startPeerConnection();
          self.handleStream(true, function() {
            self.maybeBrowserisms(true);
          });
          break;
        case 'ANSWER':
          var sdp = message.sdp;
          try {
            sdp = new RTCSessionDescription(message.sdp);
          } catch(e) {
            util.log('Firefox');
          }
          self._pc.setRemoteDescription(sdp, function() {
            util.log('setRemoteDescription: answer');
            // Firefoxism
            if (browserisms == 'Firefox') {
              self._pc.connectDataConnection(self.localPort, self.remotePort);
              self._socket.send(JSON.stringify({
                type: 'PORT',
                dst: self._peer,
                remote: self.localPort,
                local: self.remotePort
              }));
            }
            util.log('ORIGINATOR: PeerConnection success');
          }, function(err) {
            util.log('failed to setRemoteDescription, ', err);
          });
          break;
        case 'CANDIDATE':
          util.log(message.candidate);
          var candidate = new RTCIceCandidate(message.candidate);
          self._pc.addIceCandidate(candidate);
          break;
        case 'LEAVE':
          util.log('counterpart disconnected');
          if (!!self._pc && self._pc.readyState != 'closed') {
            self._pc.close();
            self._pc = null;
            self._peer = null;
          }
          if (!!self._dc && self._dc.readyState != 'closed') {
            self._dc.close();
            self._dc = null;
          }
          break;
        case 'DEFAULT':
          util.log('ORIGINATOR: message not recognized ', message.type);
      }
    };
  }

  // Makes sure things clean up neatly when window is closed.
  window.onbeforeunload = function() {
    if (!!self._pc && self._pc.readyState != 'closed') {
      self._pc.close();
    }
    if (!!self._socket && !!self._peer) {
      self._socket.send(JSON.stringify({ type: 'LEAVE', dst: self._peer }));
      if (!!self._dc && self._dc.readyState != 'closed') {
        self._dc.close();
      }
    }
  }
};


/** Takes care of ice handlers. */
Peer.prototype.setupIce = function() {
  var self = this;
  this._pc.onicecandidate = function(event) {
    util.log('candidates received');
    if (event.candidate) {
      self._socket.send(JSON.stringify({
        type: 'CANDIDATE',
        candidate: event.candidate,
        dst: self._peer
      }));
    } else {
      util.log("End of candidates.");
    }
  };
};


/** Starts a PeerConnection and sets up handlers. */
Peer.prototype.startPeerConnection = function() {
  this._pc = new RTCPeerConnection(this._config, { optional:[ { RtpDataChannels: true } ]});
  this.setupIce();
  this.setupAudioVideo();
};


/** Decide whether to handle Firefoxisms. */
Peer.prototype.maybeBrowserisms = function(originator) {
  var self = this;
  if (browserisms == 'Firefox' && !this._video && !this._audio/* && !this._stream*/) {
    getUserMedia({ audio: true, fake: true }, function(s) {
      self._pc.addStream(s);

      if (originator) {
        self.makeOffer();
      } else {
        self.makeAnswer();
      }

    }, function(err) { util.log('crap'); });
  } else {
    if (originator) {
      this.makeOffer();
    } else {
      this.makeAnswer();
    }
  }
}


/** Create an answer for PC. */
Peer.prototype.makeAnswer = function() {
  var self = this;

  this._pc.createAnswer(function(answer) {
    util.log('createAnswer');
    self._pc.setLocalDescription(answer, function() {
      util.log('setLocalDescription: answer');
      self._socket.send(JSON.stringify({
        type: 'ANSWER',
        src: self._id,
        sdp: answer,
        dst: self._peer
      }));
    }, function(err) {
      util.log('failed to setLocalDescription, ', err)
    });
  }, function(err) {
    util.log('failed to create answer, ', err)
  });
};


/** Create an offer for PC. */
Peer.prototype.makeOffer = function() {
  var self = this;

  this._pc.createOffer(function(offer) {
    util.log('createOffer')
    self._pc.setLocalDescription(offer, function() {
      util.log('setLocalDescription: offer');
      self._socket.send(JSON.stringify({
        type: 'OFFER',
        sdp: offer,
        dst: self._peer,
        src: self._id
      }));
    }, function(err) {
      util.log('failed to setLocalDescription, ', err);
    });
  });
};


/** Sets up A/V stream handler. */
Peer.prototype.setupAudioVideo = function() {
  var self = this;
  util.log('onaddstream handler added');
  this._pc.onaddstream = function(obj) {
    util.log('Remote stream added');
    //    this._stream = true;
    self.emit('remotestream', obj.type, obj.stream);
  };
};


/** Handle the different types of streams requested by user. */
Peer.prototype.handleStream = function(originator, cb) {
  if (this._data) {
    this.setupDataChannel(originator);
  }
  this.getAudioVideo(originator, cb);
};


/** Get A/V streams. */
Peer.prototype.getAudioVideo = function(originator, cb) {
  var self = this;
  if (this._video && !this._localVideo) {
    getUserMedia({ video: true }, function(vstream) {
      self._pc.addStream(vstream);
      self._localVideo = vstream;
      util.log('Local video stream added');

      self.emit('localstream', 'video', vstream);
      
      if (self._audio && !self._localAudio) {
        getUserMedia({ audio: true }, function(astream) {
          self._pc.addStream(astream);
          self._localAudio = astream;
          util.log('Local audio stream added');

          self.emit('localstream', 'audio', astream);

          cb();
        }, function(err) { util.log('Audio cannot start'); cb(); });
      } else {
        if (self._audio) {
          self._pc.addStream(self._localAudio);
        }
        cb();
      }
    }, function(err) { util.log('Video cannot start', err); cb(); });
  } else if (this._audio && !this._localAudio) {
    getUserMedia({ audio: true }, function(astream) {
      self._pc.addStream(astream);
      self._localAudio = astream;
      util.log('Local audio stream added');

      self.emit('localstream', 'audio', astream);
      
      cb();
    }, function(err) { util.log('Audio cannot start'); cb(); });
  } else {
    if (this._audio) {
      this._pc.addStream(this._localAudio);
    }
    if (this._video) {
      this._pc.addStream(this._localVideo);
    }
    util.log('no audio/video streams initiated');
    cb();
  }

};


/** Sets up DataChannel handlers. */
Peer.prototype.setupDataChannel = function(originator, cb) {
  var self = this;
  if (originator) {
    /** ORIGINATOR SETUP */
    if (browserisms == 'Webkit') {

      this._pc.onstatechange = function() {
        util.log('State Change: ', self._pc.readyState);
        /*if (self._pc.readyState == 'active') {
          util.log('ORIGINATOR: active state detected');

          self._dc = self._pc.createDataChannel('StreamAPI', { reliable: false });
          self._dc.binaryType = 'blob';

          if (!!self._handlers['connection']) {
            self._handlers['connection'](self._peer);
          }

          self._dc.onmessage = function(e) {
            self.handleDataMessage(e);
          };
        }*/
      }

    } else {
      this._pc.onconnection = function() {
        util.log('ORIGINATOR: onconnection triggered');

        self.startDataChannel();
      };
    }
  } else {
    /** TARGET SETUP */
    this._pc.ondatachannel = function(dc) {
      util.log('SINK: ondatachannel triggered');
      self._dc = dc;
      self._dc.binaryType = 'blob';

      self.emit('connection', self._peer);
      
      self._dc.onmessage = function(e) {
        self.handleDataMessage(e);
      };
    };

    this._pc.onconnection = function() {
      util.log('SINK: onconnection triggered');
    };
  }


  this._pc.onclosedconnection = function() {
    // Remove socket handlers perhaps.
  };
};


Peer.prototype.startDataChannel = function() {
  var self = this;
  this._dc = this._pc.createDataChannel(this._peer, { reliable: false });
  this._dc.binaryType = 'blob';

  this.emit('connection', this._peer);
  
  this._dc.onmessage = function(e) {
    self.handleDataMessage(e);
  };
};


/** Allows user to send data. */
Peer.prototype.send = function(data) {
  var ab = BinaryPack.pack(data);
  this._dc.send(ab);
}


// Handles a DataChannel message.
// TODO: have these extend Peer, which will impl these generic handlers.
Peer.prototype.handleDataMessage = function(e) {
  var self = this;
  var fr = new FileReader();
  fr.onload = function(evt) {
    var ab = evt.target.result;
    var data = BinaryPack.unpack(ab);
    
    self.emit('data', data);
    
  };
  fr.readAsArrayBuffer(e.data);
}

exports.Peer = Peer;


})(this);
