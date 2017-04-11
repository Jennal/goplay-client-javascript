(function (exports, ByteArray) {
    /* defines */
    var goplay = {};
    var pkg = {
        "PKG_NOTIFY": 0x00,
        "PKG_REQUEST": 0x01,
        "PKG_RESPONSE": 0x02,
        "PKG_PUSH": 0x03,
        "PKG_HEARTBEAT": 0x04,
        "PKG_HEARTBEAT_RESPONSE": 0x05,

        "ENCODING_NONE": 0x00,
        "ENCODING_GOB": 0x01,
        "ENCODING_JSON": 0x02,
        "ENCODING_BSON": 0x03,
        "ENCODING_PROTOBUF": 0x04,

        "STAT_OK": 0x00
    };
    var ws = null; //websocket Object

    /* vvvvvv Utility Functions Start vvvvvv */
    /**
     * Inherit the emitter properties.
     *
     * @param {Object} obj
     * @param {Object} superCls
     * @return {Object}
     * @api private
     */
    function inherit(obj, superCls) {
        for (var key in superCls.prototype) {
            obj[key] = superCls.prototype[key];
        }
        return obj;
    }

    function strencode(str) {
        var byteArray = new ByteArray(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            if (charCode <= 0x7f) {
                codes = [charCode];
            } else if (charCode <= 0x7ff) {
                codes = [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
            } else {
                codes = [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
            }
            for (var j = 0; j < codes.length; j++) {
                byteArray[offset] = codes[j];
                ++offset;
            }
        }
        var _buffer = new ByteArray(offset);
        copyArray(_buffer, 0, byteArray, 0, offset);
        return _buffer;
    };

    function strdecode(buffer) {
        var bytes = new ByteArray(buffer);
        var array = [];
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;
        while (offset < end) {
            if (bytes[offset] < 128) {
                charCode = bytes[offset];
                offset += 1;
            } else if (bytes[offset] < 224) {
                charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            } else {
                charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }
            array.push(charCode);
        }
        return String.fromCharCode.apply(null, array);
    };

    function copyArray(dest, doffset, src, soffset, length) {
        if ('function' === typeof src.copy) {
            // Buffer
            src.copy(dest, doffset, soffset, soffset + length);
            return dest;
        } else {
            // Uint8Array
            var result = dest;
            if (dest.length < (doffset + length)) {
                var result = new ByteArray(doffset + length);
            }

            for (var i = 0; i < dest.length; i++) {
                result[i] = dest[i];
            }

            for (var index = 0; index < length; index++) {
                dest[doffset++] = src[soffset++];
            }
        }
    }

    ByteArray.prototype.writeUint8 = function (val) {
        this.woffset = this.woffset || 0;
        this[this.woffset++] = val & 0xff;
        return this;
    }

    ByteArray.prototype.writeUint16 = function (val) {
        this.woffset = this.woffset || 0;
        this[this.woffset++] = (val >> 8) & 0xff;
        this[this.woffset++] = val & 0xff;
        return this;
    }

    ByteArray.prototype.writeUint32 = function (val) {
        this.woffset = this.woffset || 0;
        this[this.woffset++] = (val >> 24) & 0xff;
        this[this.woffset++] = (val >> 16) & 0xff;
        this[this.woffset++] = (val >> 8) & 0xff;
        this[this.woffset++] = val & 0xff;
        return this;
    }

    ByteArray.prototype.writeString = function (val) {
        this.woffset = this.woffset || 0;
        var bytes = strdecode(val);
        copyArray(this, this.woffset, bytes, 0, bytes.length);
        this.woffset += bytes.length;
        return this;
    }

    ByteArray.prototype.readUint8 = function () {
        this.roffset = this.roffset || 0;
        if (this.roffset + 1 > this.length) return undefined;

        var val = this[this.roffset] & 0xff;
        this.roffset += 1;
        return val;
    }

    ByteArray.prototype.readUint16 = function () {
        var h = this.readUint8();
        var l = this.readUint8();
        if (h == undefined || l == undefined) return undefined;

        return h << 8 | l;
    }

    ByteArray.prototype.readUint32 = function () {
        var h = this.readUint16();
        var l = this.readUint16();
        if (h == undefined || l == undefined) return undefined;

        return h << 16 | l;
    }

    ByteArray.prototype.readString = function (len) {
        this.roffset = this.roffset || 0;
        if (this.roffset + len > this.length) return undefined;

        var bytes = this.slice(this.roffset, len);
        this.roffset += len;
        return strdecode(bytes);
    }
    /* ^^^^^^ Utility Functions End ^^^^^^ */

    /* vvvvvv Header Start vvvvvv */
    function Header(type, encoding, id, status, contentSize, route) {
        this.type = type;
        this.encoding = encoding;
        this.id = id;
        this.status = status;
        this.contentSize = contentSize;
        this.route = route;

        return this;
    }

    function header_encode(header) {
        var bytes = new ByteArray(7 + header.route.length);

        bytes = bytes.writeUint8(header.type)
            .writeUint8(header.encoding)
            .writeUint8(header.id)
            .writeUint8(header.status)
            .writeUint16(header.contentSize)
            .writeUint8(header.route.length)
            .writeString(header.route);

        return bytes;
    }

    function header_decode(bytes) {
        var header = new Header();

        header.type = bytes.readUint8();
        header.encoding = bytes.readUint8();
        header.id = bytes.readUint8();
        header.status = bytes.readUint8();
        header.contentSize = bytes.readUint16();

        var routeLen = bytes.readUint8();
        header.route = bytes.readString(routeLen);

        return header;
    }
    /* ^^^^^^ Header End ^^^^^^ */

    /* vvvvvv Event Emitter Start vvvvvv */
    function Emitter(obj) {
        if (obj) return inherit(obj, this);
    }

    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    Emitter.prototype.on =
        Emitter.prototype.addEventListener = function (event, fn) {
            this._callbacks = this._callbacks || {};
            (this._callbacks[event] = this._callbacks[event] || [])
            .push(fn);
            return this;
        };

    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    Emitter.prototype.once = function (event, fn) {
        var self = this;
        this._callbacks = this._callbacks || {};

        function on() {
            self.off(event, on);
            fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
    };

    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    Emitter.prototype.off =
        Emitter.prototype.removeListener =
        Emitter.prototype.removeAllListeners =
        Emitter.prototype.removeEventListener = function (event, fn) {
            this._callbacks = this._callbacks || {};

            // all
            if (0 == arguments.length) {
                this._callbacks = {};
                return this;
            }

            // specific event
            var callbacks = this._callbacks[event];
            if (!callbacks) return this;

            // remove all handlers
            if (1 == arguments.length) {
                delete this._callbacks[event];
                return this;
            }

            // remove specific handler
            var cb;
            for (var i = 0; i < callbacks.length; i++) {
                cb = callbacks[i];
                if (cb === fn || cb.fn === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
            return this;
        };

    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */
    Emitter.prototype.emit = function (event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1),
            callbacks = this._callbacks[event];

        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
            }
        }

        return this;
    };

    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */
    Emitter.prototype.listeners = function (event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks[event] || [];
    };

    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */
    Emitter.prototype.hasListeners = function (event) {
        return !!this.listeners(event).length;
    };
    /* ^^^^^^^ Event Emitter End ^^^^^^^ */

    goplay.connect = function (host, port) {
        var url = "ws://" + host + ":" + port + "/ws";
        ws = new WebSocket(url);
        ws.binaryType = 'arraybuffer';
        ws.onopen = goplay.onopen;
        ws.onmessage = goplay.onmessage;
        ws.onerror = goplay.onerror;
        ws.onclose = goplay.onclose;
    }

    goplay.disconnect = function () {
        if (!ws) return;
        if (ws.readyState > 1) return;

        ws.close();
        ws = null;
    }

    goplay.send = function (header, data) {
        var bytes = header_encode(header)
        bytes = copyArray(bytes, bytes.length, data, 0, data.length);
        ws.send(bytes.buffer);
    }

    goplay.recv = function (len) {

    }

    goplay.onopen = function (event) {
        console.log("onopen", event)
    }

    goplay.onmessage = function (event) {
        console.log("onmessage", event)
    }

    goplay.onerror = function (event) {
        console.log("onerror", event)
    }

    goplay.onclose = function (event) {
        console.log("onclose", event)
    }

    exports.goplay = goplay;
})(
    typeof (window) == "undefined" ? module.exports : window,
    typeof (window) == "undefined" ? Buffer : Uint8Array
)